import React, { useContext, useState } from "react";
import style from "../RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContextUser } from "../../context/Context";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Joi from "joi";
import { getAllNotificationDate } from "../MainNav/MainNav";
import { useQuery } from "react-query";

export default function LoginUser() {
  const { setOpenAuth, setRole, getNotification,pageNot } =
    useContext(ContextUser);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorListUser, setErrorListUser] = useState(null);
  const [back, setBack] = useState(false);
  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  ///////////////////////////////
    const {refetch: refetchData } = useQuery(
      ["dates", pageNot],
      () => getAllNotificationDate(pageNot),
      {
        cacheTime: 1800000,
        enabled: false,
        keepPreviousData: true,
      }
    );
  ////////////valid Joi///////////////
  function validationAddUser() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: ["com", "not", "org"] })
        .required()
        .messages({
          "string.empty": "الايميل  مطلوب",
          "string.email": "الايميل غير صالح",
          "any.required": " الايميل مطلوب",
        }),
      password: Joi.string().required().messages({
        "string.empty": "  كلمة المرور مطلوبة",
        "any.required": "  كلمة المرور مطلوبة",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    let validate = validationAddUser();
    if (validate.error) {
      setErrorListUser([validate.error.details]);
    } else {
      setLoading(true);
      setErrorListUser("");
      await axios
        .post("https://syrianrevolution1.com/users/login", user)
        .then((result) => {
          if (result.data.message === "success") {
            const decodedToken = jwtDecode(result.data.token);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("idUserLogin", decodedToken.data.id);
            localStorage.setItem("roleUserLogin", decodedToken.data.role);
            localStorage.setItem("selfImg", result?.data?.user?.selfImg);
            setRole( localStorage.getItem( "roleUserLogin" ) );
            getNotification();
            refetchData();
            setOpenAuth("");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          if (
            error?.response?.data?.msg === "Invalid Password" ||
            error?.response?.data?.msg === "invalid email"
          ) {
            setBack(true);
          }
        });
    }
  }
  return (
    <div className={style.RegisterUser}>
      <form className={style.formsLogin} onSubmit={handlesubmit}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{
            marginRight: "15px",
            marginTop: "10px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => setOpenAuth("")}
        />
        <div
          className={style.headForm}
          style={{ width: "60%", marginTop: "-20px" }}
        >
          <h6> تسجيل الدخول</h6>

          <hr />
        </div>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ width: "60%", marginBottom: "20px" }}
            >
              {error[index].message}
            </p>
          ))}
        {back && (
          <p
            className="alert alert-secondary alerthemself"
            style={{ width: "60%", marginBottom: "20px" }}
          >
            البيانات غير صحيحة
          </p>
        )}
        <div className={style.inform3}>
          <div className={style.inpi2}>
            <label htmlFor=""> البريد الالكتروني </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handlechange}
              placeholder="البريد الالكتروني"
            />
          </div>

          <div className={style.inpi2}>
            <label htmlFor=""> كلمة المرور </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handlechange}
              placeholder="كلمة المرور"
            />

            <p
              onClick={() => setOpenAuth("forget")}
              style={{ cursor: "pointer" }}
            >
              هل نسيت كلمة المرور
            </p>
          </div>
          <div className={style.btnInpu}>
            <button type="submit" style={{ padding: "10px 0" }}>
              {" "}
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
            <button onClick={(e) => e.preventDefault()}>
              {" "}
              ليس لدي حساب .{" "}
              <span onClick={() => setOpenAuth("register")}>انشاء حساب</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
