import React, { useContext, useEffect, useState } from 'react'
import style from '../componantUser/RegisterUser/RegisterUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ContextUser } from '../context/Context'
import Joi from 'joi';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function RegisterUser() {
  const { setOpenAuth } = useContext(ContextUser);

  const [userUpdate, setUserUpdate] = useState({});
  const [errorListUpdate, setErrorListUpdate] = useState();
  const [success, setSuccess] = useState(false);
  const [data, setdata] = useState({});
 

  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  }

  const [imageProfile, setImageProfile] = useState("");

  const [loading, setLoading] = useState(false);
  function handleImg(e) {
    setImageProfile(e.target.files[0]);
  }

  const [docImageState, setDocImgState] = useState("");
  function handleImgDoc(e) {
    setDocImgState(e.target.files[0]);
  }

  function validationAddUser() {
    let schema = Joi.object({
      name: Joi.string().allow(""),
      username: Joi.string().allow(""),
      docImg: Joi.string().allow(""),
      email: Joi.string().allow(""),
      selfImg: Joi.string().allow(""),
      government: Joi.string().allow(""),
      phone: Joi.string().min(7).max(15).allow("").messages({
        "string.min": "    رقم  الهاتف يجب الا يقل عن سبعة ارقام",
        "string.max": "    رقم  الهاتف يجب الا يزيد عن  خمسة عشر رقم",
      }),
    });
    return schema.validate(userUpdate, { abortEarly: false });
  }
  /////////////////////get single user//////////////////
    async function getSingleUserUpdate() {
      await axios
        .get(
          `https://syrianrevolution1.com/users/single/${localStorage.getItem(
            "idUserLogin"
          )}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          setUserUpdate({
            name: result?.data?.name || "",
            government: result?.data?.government || "",
            phone: result?.data?.phone || "",
            selfImg: result?.data?.selfImg || "",
            username: result?.data?.username || "",
            email: result?.data?.email || "",
            docImg: result?.data?.docImg || "",
          });
          console.log(result);
          setdata(result?.data);
          
        })
        .catch((error) => console.log(error));
    }
  useEffect(() => {
  
    getSingleUserUpdate();
  }, []);

  async function handleSubmit(e) {
    setErrorListUpdate("");
    e.preventDefault();
    setSuccess(false);
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUpdate([responseValidateUser.error.details]);
    } else {
      setErrorListUpdate(null);
      const formData = new FormData();
      if (
        userUpdate.name !== "" &&
        userUpdate.name !== undefined &&
        userUpdate.name !== null
      ) {
        formData.append("name", userUpdate.name);
      }
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
        imageProfile !== null &&
        imageProfile !== undefined &&
        imageProfile !== ""
      ) {
        formData.append("selfImg", imageProfile);
      }
       if (
         docImageState !== null &&
         docImageState !== undefined &&
         docImageState !== ""
       ) {
         formData.append("docImg", docImageState);
       }
      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/users/${localStorage.getItem(
            "idUserLogin"
          )}`,
          {
            method: "PATCH",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const result = await response.json();
        setLoading(false);
       
        if (result?.user?.createdAt) {
          setSuccess( true );
          getSingleUserUpdate();
          localStorage.selfImg = result.user.selfImg;
        } else {
          if ( result.includes( 'email' ) ) {
            return alert('هذا الايميل موجود من قبل')
          } else if ( result.includes( 'username' ) ) {
            return alert('اسم المستخدم هذا موجود من قبل')
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={style.RegisterUser}>
        <form
          className={style.forms}
          style={{ height: "60%", transform: "translateY(50px)" }}
        >
          <div className={style.headForm}>
            <p> تحديث بيانات</p>
      
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{
                position: "absolute",
                top: "-20%",
                right: 0,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => setOpenAuth("")}
            />
            <hr />
          </div>
          {errorListUpdate &&
            errorListUpdate.map((error, index) => (
              <p
                key={index}
                className="alert alert-secondary alerthemself"
                style={{ width: "90%" }}
              >
                {error[index].message}
              </p>
            ))}
          {success && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ width: "90%" }}
            >
              تم التحديث بنجاح
            </p>
          )}
          <div className={style.inform}>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> الاسم بالكامل</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="الاسم"
                  value={userUpdate?.name || ""}
                  onChange={handlechange}
                />
              </div>

              <div className={style.inpi}>
                <label htmlFor="">رقم الهاتف </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={userUpdate?.phone || ""}
                  onChange={handlechange}
                />
              </div>
            </div>

            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> المحافظة </label>
                <input
                  type="text"
                  className="form-control"
                  name="government"
                  placeholder="المحافظة"
                  value={userUpdate?.government}
                  onChange={handlechange}
                />
              </div>
              <div
                className={style.inpi}
                style={{ marginTop: "7px", display: "flex", gap: "10px" }}
              >
                <div>
                  <img
                    src={`https://syrianrevolution1.com/images/${userUpdate?.selfImg}`}
                    alt="profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "11px", marginBottom: "10px" }}>
                    تحميل صورة الملف الشخصي{" "}
                  </p>

                  <label
                    htmlFor="file-upload1"
                    className={style.customfileupload}
                  >
                    ارفع الصورة
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file-upload1"
                    name="selfImg"
                    onChange={handleImg}
                  />
                </div>
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor="">  الايميل</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="الايميل"
                  value={userUpdate?.email || ""}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className={style.input}>
              <div className={style.inpi}>
                <label htmlFor=""> اسم المستخدم </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="اسم المستخدم"
                  value={userUpdate?.username}
                  onChange={handlechange}
                />
              </div>
              <div
                className={style.inpi}
                style={{ marginTop: "7px", display: "flex", gap: "10px" }}
              >
                <div>
                  <img
                    src={`https://syrianrevolution1.com/images/${userUpdate?.docImg}`}
                    alt="profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div>
                  
                  <p style={{ fontSize: "11px", marginBottom: "10px" }}>
                    تحميل صورة الوثيقة الشخصية{" "}
                  </p>

                  <label
                    htmlFor="file-upload3"
                    className={style.customfileupload}
                  >
                    ارفع الوثيقة
                  </label>
                  {
                    data.isConfident== true && <p style={{ fontSize: "11px", marginBottom: "10px",color:'blue' }}>وثيقتك تم تاكيدها من قبل ولا يمكنك التعديل عليها</p>
                  }
                  <input
                    type="file"
                    className="form-control"
                    id="file-upload3"
                    name="docImg"
                    onChange={handleImgDoc}
                    disabled={data.isConfident== true}
                  />
                  
                </div>
             
              </div>
     
            </div>
        
            {data.role === "user" &&
               <Link to="/privateNewsUser">
            المنشورات الخاصة بي
          </Link>
            }
           
          </div>
          
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%,50px)",
            }}
          >
            {loading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "    تحديث بيانات"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

