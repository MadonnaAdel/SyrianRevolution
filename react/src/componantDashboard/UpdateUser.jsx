import React, { useContext, useState } from "react";
import styles from "../styleDashboard/UpdateSuperVisor.module.css";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { useEffect } from "react";
import axios from "axios";
import { ContextUser } from "../context/Context";
export default function UpdateUser() {
  const navigate = useNavigate();

  const [userUpdate, setUserUpdate] = useState({});
  const [errorListUpdate, setErrorListUpdate] = useState();
  const { setOpenAlert, setOpenAlertStore, getAllUserDashboard } =
    useContext(ContextUser);

  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    async function getSingleUser() {
      await axios
        .get(
          `https://syrianrevolution1.com/users/single/${localStorage.getItem(
            "IdUpdateUser"
          )}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setUserUpdate({
            username: result.data.username || "",
            email: result.data.email || "",
            name: result.data.name || "",
            phone: result.data.phone || "",
            government: result.data.government || "",
            role: result.data.role || "",
            selfImg: result.data.selfImg || "",
            docImg: result.data.docImg || "",
          });
        })
        .catch((error) => console.log(error));
    }
    getSingleUser();
  }, []);

  const [imageProfile, setImageProfile] = useState("");

  const [loading, setLoading] = useState(false);
  function handleImg(e) {
    setImageProfile(e.target.files[0]);
  }

  const [doc, setDoc] = useState("");
  function handleDoc(e) {
    setDoc(e.target.files[0]);
  }

  function validationAddUser() {
    let schema = Joi.object({
      name: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),
      docImg: Joi.string().allow(""),
      username: Joi.string().allow(""),
      email: Joi.string().allow(""),
      role: Joi.string().allow(""),
      government: Joi.string().allow(""),
      phone: Joi.string().min(7).allow("").messages({
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة ارقام",
      }),
    });
    return schema.validate(userUpdate, { abortEarly: false });
  }

  async function handleSubmit(e) {
    setErrorListUpdate("");
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUpdate([responseValidateUser.error.details]);
    } else {
      setErrorListUpdate(null);
      const formData = new FormData();
        if (
          userUpdate.username !== "" &&
          userUpdate.username !== undefined &&
          userUpdate.username !== null
        ) {
          formData.append("username", userUpdate.username);
      }
         if (
           userUpdate.email !== "" &&
           userUpdate.email !== undefined &&
           userUpdate.email !== null
         ) {
           formData.append("email", userUpdate.email);
         }
      if (
        userUpdate.name !== "" &&
        userUpdate.name !== undefined &&
        userUpdate.name !== null
      ) {
        formData.append("name", userUpdate.name);
      }
      if (
        userUpdate.phone !== "" &&
        userUpdate.phone !== undefined &&
        userUpdate.phone !== null
      ) {
        formData.append("phone", userUpdate.phone);
      }
      if (
        userUpdate.government !== "" &&
        userUpdate.government !== undefined &&
        userUpdate.government !== null
      ) {
        formData.append("government", userUpdate.government);
      }
      if (
        userUpdate.role !== "" &&
        userUpdate.role !== undefined &&
        userUpdate.role !== null
      ) {
        formData.append("role", userUpdate.role);
      }
      if (
        imageProfile !== null &&
        imageProfile !== undefined &&
        imageProfile !== ""
      ) {
        formData.append("selfImg", imageProfile);
      }
      if (doc !== null && doc !== undefined && doc !== "") {
        formData.append("docImg", doc);
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/users/${localStorage.getItem(
            "IdUpdateUser"
          )}/${localStorage.getItem("idUserLogin")}`,
          {
            method: "PATCH",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const result =  await response.json();
        console.log(result)
        if ( result?.user?._id ) {
             setLoading(false);
          navigate( "/dashboard/userdash" );
          getAllUserDashboard()
        } else {
          alert("الاسم او الايميل مستخدمين من قبل")
         
          setLoading(false)
        }
     
      } catch (error) {
        console.error(error);
      }
    }
  }

  function openImage(src) {
    setOpenAlert(true);
    setOpenAlertStore(src);
  }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / تحديث بيانات</p>
      </div>
      <form action="" className={styles.form}>
        {errorListUpdate &&
          errorListUpdate.map((error, index) => (
            <p key={index} className="alert alert-secondary alerthemself">
              {error[index].message}
            </p>
          ))}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم </label>
              <input
                name="username"
                type="text"
                value={userUpdate.username || ""}
                placeholder="الاسم "
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الايميل </label>
              <input
                name="email"
                type="email"
                value={userUpdate.email || ""}
                placeholder="الايميل "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          {/* /////////////////// */}
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم بالكامل</label>
              <input
                name="name"
                type="text"
                value={userUpdate.name || ""}
                placeholder="الاسم بالكامل"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رقم الهاتف</label>
              <input
                name="phone"
                type="text"
                value={userUpdate.phone || ""}
                placeholder=" رقم الهاتف"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                name="government"
                type="text"
                placeholder=" المحافظة "
                className="form-control"
                onChange={handlechange}
                value={userUpdate.government || ""}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الدور</label>
              <select
                name="role"
                onChange={handlechange}
                value={userUpdate.role || ""}
              >
                <option value="">اختر الدور</option>
                <option value="admin">ادمن</option>
                <option value="supervisor">مشرف</option>
                <option value="user">مستخدم</option>
              </select>
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                الصورة الشخصية
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.oneDiv}>
                  {userUpdate?.selfImg !== undefined &&
                  userUpdate?.selfImg !== "undefined" &&
                  userUpdate?.selfImg !== null &&
                  userUpdate?.selfImg !== "" ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${userUpdate?.selfImg}`}
                      alt="profile"
                      onClick={() => {
                        openImage(
                          `https://syrianrevolution1.com/images/${userUpdate?.selfImg}`
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fsa"
                    style={{ width: "120px" }}
                    className={`customfileupload`}
                  >
                    {" "}
                    ارفع الملف{" "}
                  </label>
                  <input
                    name="selfImg"
                    id="fsa"
                    type="file"
                    className="form-control"
                    onChange={handleImg}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                الوثيقة الشخصية
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.oneDiv}>
                  {userUpdate?.docImg !== undefined &&
                  userUpdate?.docImg !== "undefined" &&
                  userUpdate?.docImg !== null &&
                  userUpdate?.docImg !== "" ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                      alt="profile"
                      onClick={() => {
                        openImage(
                          `https://syrianrevolution1.com/images/${userUpdate?.docImg}`
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fsa1"
                    style={{ width: "120px" }}
                    className={`customfileupload`}
                  >
                    {" "}
                    ارفع الملف{" "}
                  </label>
                  <input
                    name="photo"
                    id="fsa1"
                    type="file"
                    className="form-control"
                    onChange={handleDoc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.btnbottom}>
        <button
          className={`add`}
          style={{ color: "white", backgroundColor: "green" }}
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "    تحديث"
          )}
        </button>
        <button
          className={`add`}
          style={{ border: "1px solid red", color: "red" }}
          onClick={() => navigate(-1)}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
