import React, { useState } from 'react'
import styles from '../styleDashboard/AddSuperVisor.module.css'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi';
export default function AddUse() {
  const navigate = useNavigate();
    const [user, setUser] = useState({role:'user'});
    const [errorListUser, setErrorListUser] = useState(null);

    function handlechange(e) {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  }

  const [ imageProfile, setImageProfile ] = useState( "" );
 
  
    const [loading, setLoading] = useState(false);
    const [errorBackUser, setErrorBackUser] = useState(null);
    function handleChangeImageProfile(e) {
      setImageProfile(e.target.files[0]);
  }

   const [imageDoc, setImageDoc] = useState("");
  function handleChangeImageDoc( e ) {
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
        role: Joi.string().required(),
      });
      return schema.validate(user, { abortEarly: false });
    }

    async function handleSubmit(e) {
      e.preventDefault();
      let responseValidateUser = validationAddUser();
      if (responseValidateUser.error) {
        setErrorListUser([responseValidateUser.error.details]);
      }else {
        setErrorListUser(null);
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append( "name", user.name );
        formData.append( "selfImg", imageProfile );
         formData.append("docImg", imageDoc);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append( "government", user.government );
        formData.append("phone", user.phone);
        formData.append("key", user.key);
        formData.append("role", user.role);
        
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
          setLoading( false );
         
          if ( result.createdAt ) {
            navigate("/dashboard/userdash");
          } else {
            setErrorBackUser( result );
          }
     
        } catch (error) {
          console.error(error);
        }
        }
      
    }
 
 
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / أضافة مستخدم</p>
      </div>
      {errorListUser &&
        errorListUser.map((error, index) => (
          <p key={index} className="alert alert-secondary alerthemself">
            {error[index].message}
          </p>
        ))}
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor="">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                placeholder="اسم المستخدم"
                className="form-control"
                onChange={handlechange}
              />
         
              {errorBackUser &&
                errorBackUser?.message?.includes(
                  "E11000 duplicate key error collection: test.users index: username_1 dup key"
                ) && <p className={`error`}>هذا الاسم موجود من قبل</p>}
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم بالكامل </label>
              <input
                type="text"
                name="name"
                placeholder="     الاسم بالكامل "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                name="government"
                placeholder=" المحافظة "
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {" "}
                الصورة الشخصية (اختياري)
              </p>
              <label htmlFor="file-upload2" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="selfImg"
                id="file-upload2"
                type="file"
                className="form-control"
                onChange={handleChangeImageProfile}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> البريد الالكتروني</label>
              <input
                type="email"
                name="email"
                placeholder=" البريد الالكتروني"
                className="form-control"
                onChange={handlechange}
              />
              {errorBackUser && errorBackUser === "email already exist" && (
                <p className={`error`}>هذا الايميل موجود من قبل</p>
              )}
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                placeholder=" رقم الهاتف"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> كلمة المرور</label>
              <input
                name="password"
                type="password"
                placeholder="  كلمة المرور"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رمز الدخول </label>
              <input
                type="text"
                name="key"
                placeholder="     رمز الدخول "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.inp1}>
              <label>الدور</label>
              <select name="role" onChange={handlechange}>
                <option value="user">مستخدم</option>
                <option value="admin">ادمن</option>
                <option value="supervisor">مشرف</option>
              </select>
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {" "}
                الوثيقة الشخصية (اختياري)
              </p>
              <label htmlFor="file-upload3" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="docImg"
                id="file-upload3"
                type="file"
                className="form-control"
                onChange={handleChangeImageDoc}
              />
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
            " اضافة"
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








 