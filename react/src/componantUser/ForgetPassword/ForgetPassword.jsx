import { React, useContext, useState } from "react";
import style from "../RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContextUser } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function ForgetPassword() {
  const { setOpenAuth } = useContext(ContextUser);
 const [errorListUser, setErrorListUser] = useState(null);
  const [ forget, setForget ] = useState( {} )
  const [ loading, setLoading ] = useState( false );
  const [errorBack,setErrorBack] = useState(false)
  const navigate = useNavigate();

   function handlechange(e) {
     setForget((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
     }));
  }
  

  function validationAddUser() {
    let schema = Joi.object({
      email: Joi.string()
        .required()
        .messages({
          "string.empty": "الايميل  مطلوب",
          "any.required": " الايميل مطلوب",
        }),
      key: Joi.string().required().messages({
        "string.empty": "    رمز الدخول مطلوب",
        "any.required": "    رمز الدخول مطلوب",
      }),
    });
    return schema.validate(forget,{ abortEarly: false });
  }
  async function forgetPassword(e) {
    e.preventDefault();
    setErrorListUser( '' )
    setErrorBack( false );
    let validate = validationAddUser();
    if ( validate.error ) {
         setErrorListUser([validate.error.details]);
    } else {
      setLoading( true );
          await axios
            .post("https://syrianrevolution1.com/users/forgetPassword", 
              forget,
            )
            .then((data) => {
             
              if (data.data.success) {
                navigate( `/success/${data.data.userId}` );
                setOpenAuth('')
                setLoading(false)
              } else if (
                data?.data?.message === "email not found" ||
                data?.data?.message === "key is wrong"
              ) {
                setLoading(false);
                setErrorBack(true);
              }
            })
            .catch((data) => console.log(data));
    }

  }

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsForget}>
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
          style={{ width: "80%", marginTop: "-20px" }}
        >
          <h6> نسيت كلمة المرور</h6>

          <hr />
        </div>
        <div className={style.inform1}>
          {errorListUser &&
            errorListUser.map((error, index) => (
              <p
                key={index}
                className="alert alert-secondary alerthemself"
                style={{ width: "100%", marginBottom: "50px" }}
              >
                {error[index].message}
              </p>
            ))}
          {errorBack && (
            <p
         
              className="alert alert-secondary alerthemself"
              style={{ width: "100%", marginBottom: "50px" }}
            >
            البيانات غير صحيحة
            </p>
          )}
          <div className={style.inpi2}>
            <label htmlFor="">ادخل الايميل </label>
            <input
              type="text"
              name="email"
              onChange={handlechange}
              className="form-control"
              placeholder="   الايميل"
            />
          </div>
          <div className={style.inpi2}>
            <label htmlFor="">ادخل رمز الدخول </label>
            <input
              type="text"
              name="key"
              onChange={handlechange}
              className="form-control"
              placeholder="  رمز الدخول"
            />
          </div>
          <div className={style.btnInpu1}>
            <button onClick={(e) => forgetPassword(e)} type="submit" style={{padding:'10px 20px'}}>
              {" "}
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "تعيين كلمة المرور"
              )}
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3035A1",
                color: "#3035A1",
              }}
              onClick={() => setOpenAuth("")}
            >
              رجوع
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
