import React, { useState } from 'react'
import styles from '../styleDashboard/Archief.module.css'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
export default function AddAMassacre() {
  const navigate = useNavigate();

  const [addData, setAddData] = useState({
    responsibleAuthority: "system",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);

  const [imageProfile, setImageProfile] = useState("");
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

  const [document, setDocument] = useState("");
  function handleChangeDocuments(e) {
    setDocument(e.target.files);
  }

  function handlechange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validationAddUser() {
    let schema = Joi.object({
   
      title: Joi.string().required().messages({
        "string.empty": "     اسم الجريمة مطلوب",
        "any.required": "     اسم الجريمة مطلوب",
      }),
      responsibleAuthority: Joi.string().required().messages({
        "string.empty": "  الجهة المسئولة مطلوبة",
        "any.required": "  الجهة المسئولة مطلوبة",
      }),
      governorate: Joi.string().allow(""),
      details: Joi.string().allow(""),
    });
    return schema.validate(addData, { abortEarly: false });
  }
  async function handleSubmit(e) {
    e.preventDefault();
setSuccessAdd(false);
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser("");
      setSuccessAdd(false);
      const formData = new FormData();
      formData.append("title", addData.title);
      formData.append("profileImage", imageProfile);

      if (Array.isArray(document)) {
        document.forEach((file) => {
          formData.append("documents", file);
        });
      } else if (document instanceof FileList) {
     
        for (let i = 0; i < document.length; i++) {
          formData.append("documents", document[i]);
        }
      }
  
      formData.append("responsibleAuthority", addData.responsibleAuthority);
      formData.append("governorate", addData.governorate);
      formData.append("details", addData.details);
      try {
        setLoading(true);
        const response = await fetch(
          `https://syrianrevolution1.com/massacres/${localStorage.getItem(
            "idUserLogin"
          )}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const result = await response.json();
        console.log(result);
        setLoading(false);
        if (result._id) {
          setSuccessAdd(true);
          setErrorBackUser(null);
          setErrorListUser(null);
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className={styles.informLastNews}>
      {errorListUser &&
        errorListUser.map((error, index) => (
          <p
            key={index}
            className="alert alert-secondary alerthemself"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            {error[index].message}
          </p>
        ))}
      {successAdd && (
        <p
          className="alert alert-success alerthemself"
          style={{ transform: "translateY(0)", width: "100%" }}
        >
          تمت الاضافة بنجاح
        </p>
      )}
      {errorBackUser &&
        errorBackUser?.error === "Cannot read property '0' of undefined" && (
          <p
            className="alert alert-secondary alerthemself"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            يرجي رفع صورة للجريمة او صورة تدل علي الحدث
          </p>
        )}
      {errorBackUser &&
        errorBackUser?.error === "Cannot read property 'map' of undefined" && (
          <p
            className="alert alert-secondary alerthemself"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            يرجي رفع وثيقة تثبت الحدث
          </p>
        )}
      <div className={styles.input}>
        <div className={styles.inp1}>
          <label htmlFor=""> عنوان الجريمة</label>
          <input
            onChange={handlechange}
            name="title"
            type="text"
            className="form-control"
            placeholder="  عنوان الجريمة"
          />
        </div>
        <div className={styles.inp1}>
          <p
            style={{ fontSize: "10px", marginBottom: "5px", color: "#5050b6" }}
          >
            وثيقة او ملف (ملف pdf او word او فيديو mp4 او ملف zip)
          </p>
          <label htmlFor="ui" className="customfileupload" style={{color:'gray'}}>
            {" "}
            ارفع الملف هنا
          </label>
          <input
            type="file"
            id="ui"
            multiple
            className="form-control"
            placeholder=" الوثائق والملفات"
            onChange={handleChangeDocuments}
          />
        </div>
      </div>
      <div className={styles.input}>
        <div className={styles.inp1}>
          <label htmlFor=""> الجهة المسؤولة</label>
          <select
            name="responsibleAuthority"
            onChange={handlechange}
            id=""
            className="form-control"
          >
            <option value="system">النظام</option>
            <option value="daaeh">داعش</option>
            <option value="qasad">قسد</option>
          </select>
        </div>
        <div className={styles.inp1}>
          <label htmlFor=""> المحافظة</label>
          <input
            onChange={handlechange}
            name="governorate"
            type="text"
            className="form-control"
            placeholder="   المحافظة"
          />
        </div>
      </div>
      <div className={styles.input}>
        <div className={styles.inp1}>
          <p style={{ fontSize: "10px", marginBottom: "5px" }}>
            صورة تدل علي الحدث
          </p>
          <label htmlFor="ui2" className="customfileupload">
            {" "}
            ارفع الملف هنا
          </label>
          <input
            onChange={handleChangeImageProfile}
            type="file"
            id="ui2"
            className="form-control"
            placeholder=" الوثائق والملفات"
          />
        </div>
      </div>
      <div className={styles.inp2}>
        <label htmlFor=""> تفاصيل الجريمة</label>
        <textarea
          onChange={handlechange}
          name="details"
          placeholder=" تفاصيل الجريمة"
          className="form-control"
        ></textarea>
      </div>

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
          onClick={() => navigate("/dashboard")}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
