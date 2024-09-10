import React, {useContext, useState } from 'react'
import style from './RegisterUser.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ContextUser } from '../../context/Context';
import Joi from 'joi';

export default function RegisterUser() {
  const { setOpenAuth } = useContext(ContextUser);
  ///////////////////////////
  const [user, setUser] = useState({});
  const [errorListUser, setErrorListUser] = useState(null);
  const [show, setShow] = useState(false);

  function handlechange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const [imageProfile, setImageProfile] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

   const [imageDoc, setImageDoc] = useState("");
   function handleChangeImageDoc(e) {
     setImageDoc(e.target.files[0]);
   }

  function validationAddUser() {
    let schema = Joi.object({
      username: Joi.string().required().messages({
        "string.empty": "الاسم  مطلوب",
        "any.required": "الاسم  مطلوب",
      }),
      name: Joi.string().required().messages({
        "string.empty": "الاسم بالكامل مطلوب",
        "any.required": "الاسم بالكامل مطلوب",
      }),
      docImg: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),

      email: Joi.string()
        .email({ tlds: ["com", "not", "org"] })
        .required()
        .messages({
          "string.empty": "الايميل  مطلوب",
          "string.email": "الايميل غير صالح",
          "any.required": " الايميل مطلوب",
        }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "  كلمة المرور مطلوبة",
        "string.min": "  كلمة المرور يجب الا تقل عن 6 احرف",

        "any.required": "  كلمة المرور مطلوبة",
      }),
      government: Joi.string().required().messages({
        "string.empty": "   المحافظة مطلوبة",
        "any.required": "   المحافظة مطلوبة",
      }),
      phone: Joi.string().min(7).required().messages({
        "string.empty": "    رقم الهاتف مطلوب",
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة احرف",

        "any.required": "    رقم الهاتف مطلوب",
      }),
      key: Joi.string().required().messages({
        "string.empty": "    رمز الدخول  مطلوب",
        "any.required": "     ركز الدخول مطلوب",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser(null);
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("name", user.name);
      formData.append( "selfImg", imageProfile );
       formData.append("docImg", imageDoc);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("government", user.government);
      formData.append("phone", user.phone);
      formData.append("key", user.key);
      try {
        setLoading(true);
        const response = await fetch(
          "https://syrianrevolution1.com/users/register",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        setLoading(false);
        console.log(result);
        if (result.createdAt) {
          setOpenAuth("successRegister");
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

 
  return (
    <>
      <div className={style.RegisterUser}>
        <form className={style.forms} onSubmit={handleSubmit}>
          <div className={style.headForm}>
            <p>انشاء حساب</p>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{
                position: "absolute",
                top: "-20%",
                right: "5px",
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => setOpenAuth("")}
            />
            <hr />
          </div>
          <div className={style.inform}>
            {errorListUser &&
              errorListUser.map((error, index) => (
                <p
                  style={{ width: "100%", transform: "translateY(5px)" }}
                  key={index}
                  className="alert alert-secondary alerthemself"
                >
                  {error[index].message}
                </p>
              ))}
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">اسم المستخدم</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="username"
                  placeholder="اسم المستخدم"
                />
                {errorBackUser &&
                  errorBackUser?.message?.includes(
                    "E11000 duplicate key error collection: test.users index: username_1 dup key"
                  ) && <p className={`error`}>هذا الاسم موجود من قبل</p>}
                {/* {errorBackUser && errorBackUser?.message && (
                  <p className={`error`}>هذا الاسم موجود من قبل</p>
                )} */}
              </div>
              <div className={style.inpi}>
                <label htmlFor="">رقم الهاتف </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="phone"
                  placeholder=" رقم الهاتف"
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> الاسم بالكامل (ثلاثي)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="name"
                  placeholder=" الاسم بالكامل"
                />
              </div>
              <div className={style.inpi}>
                <label htmlFor=""> المحافظة </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlechange}
                  name="government"
                  placeholder=" المحافظة"
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">البريد الالكتروني </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handlechange}
                  name="email"
                  placeholder=" الايميل"
                />
                {errorBackUser && errorBackUser === "email already exist" && (
                  <p className={`error`}>هذا الايميل موجود من قبل</p>
                )}
              </div>
              <div className={style.inpi}>
                <label htmlFor="">كلمة المرور </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handlechange}
                  placeholder="  كلمة المرور"
                />
              </div>
            </div>

            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">
                  {" "}
                  رمز الدخول (احتفظ به في حالة نسيت كلمة المرور){" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  onChange={handlechange}
                  name="key"
                  placeholder=" رمز الدخول"
                />
              </div>
            </div>

            <div className={style.picture}>
              <div className={style.pictureText}>
                <p>تحميل صورة الملف الشخصي (اختياري)</p>
              </div>
              <div className={style.pictureInput}>
                <label
                  htmlFor="file-upload1"
                  className={style.customfileupload}
                >
                  ارفع الملف
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file-upload1"
                  name="selfImg"
                  onChange={handleChangeImageProfile}
                />
              </div>
            </div>
            <div className={style.picture}>
              <div className={style.pictureText}>
                <p>
                  {" "}
                  تحميل صورة الوثيقة اختياري للحسابات الموثقة..للاطلاع علي
                  التفاصيل{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setShow((e) => !e)}
                  >
                    اضغط هنا
                  </span>{" "}
                </p>
                {show && (
                  <small className={style.small}>
                    <span style={{ color: "red" }}>ملحوظة</span> : هذة الوثيقة
                    مطلوبة لانك نعد من المشاركين في الموقع وليست لاغراض سياسية
                  </small>
                )}
              </div>
              <div className={style.pictureInput}>
                <label
                  htmlFor="file-upload5"
                  className={style.customfileupload}
                >
                  ارفع الوثيقة
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file-upload5"
                  name="docImg"
                  onChange={handleChangeImageDoc}
                />
              </div>
            </div>
            <div
              className={style.btnInpu}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn btn-primary"
                style={{ width: "30%", margin: "auto", padding: "10px 0" }}
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "انشاء حساب"
                )}
              </button>
              <button
                className="btn"
                style={{ border: "none", outline: "none" }}
                onClick={() => setOpenAuth("login")}
              >
                لدي حساب بالفعل
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
