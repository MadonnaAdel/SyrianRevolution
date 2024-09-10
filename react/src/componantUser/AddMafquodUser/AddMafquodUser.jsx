import { React, useContext, useEffect, useState } from "react";
import styles from "../AddSahedUser/AddShahed.module.css";
import { ContextUser } from "../../context/Context";
import Joi from "joi";
export default function AddShahedUser() {
  const { setOpenAuth, getSingleUser, checkConfition } =
    useContext(ContextUser);

  const [addData, setAddData] = useState({
    category: "missing",
    responsibleAuthority: "system",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [ successAdd, setSuccessAdd ] = useState( false );
  const [imageProfile, setImageProfile] = useState("");
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }
  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);
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
      category: Joi.string().required().messages({
        "string.empty": "التصنيف  مطلوب",
        "any.required": "التصنيف  مطلوب",
      }),
      name: Joi.string().required().messages({
        "string.empty": "     اسم المفقود مطلوب",
        "any.required": "     اسم المفقود مطلوب",
      }),
      documents: Joi.string().allow(""),
      nickname: Joi.string().allow(""),
      dateOfBirth: Joi.string().allow(""),
      responsibleAuthority: Joi.string().required().messages({
        "string.empty": "  الجهة المسئولة مطلوبة",
        "any.required": "  الجهة المسئولة مطلوبة",
      }),
      governorate: Joi.string().allow(""),
      fatherName: Joi.string().allow(""),
      motherName: Joi.string().allow(""),
      place: Joi.string().allow(""),

      externalLinks: Joi.string().allow(""),
      details: Joi.string().allow(""),
    });
    return schema.validate(addData, { abortEarly: false });
  }
  /////
  async function handleSubmit(e) {
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else if (!localStorage.getItem("token")) {
      setOpenAuth("login");
    } else {
   
      if (checkConfition === true) {
        setErrorListUser("");
        setSuccessAdd(false);
        const formData = new FormData();
        formData.append("category", addData.category);
        formData.append("name", addData.name);
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

        formData.append("nickname", addData.nickname);
        if (
          addData.dateOfBirth !== "" &&
          addData.dateOfBirth !== undefined &&
          addData.dateOfBirth !== null
        ) {
          formData.append("dateOfBirth", addData.dateOfBirth);
        }

        formData.append("responsibleAuthority", addData.responsibleAuthority);
        formData.append("governorate", addData.governorate);
        formData.append("fatherName", addData.fatherName);
        formData.append("motherName", addData.motherName);
        formData.append("place", addData.place);
        formData.append("externalLinks", addData.externalLinks);
        formData.append("details", addData.details);
        try {
          setLoading(true);
          const response = await fetch(
            `https://syrianrevolution1.com/childData/${localStorage.getItem(
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
      } else {
        setOpenAuth("faild");
      }
    }
  }
  return (
    <div>
      <form action="" className={styles.form}>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ width: "90%" }}
            >
              {error[index].message}
            </p>
          ))}
        {errorBackUser &&
          errorBackUser?.error === "Cannot read property '0' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ width: "90%" }}
            >
              يرجي رفع صورة للمفقود او صورة تدل علي الحدث
            </p>
          )}
        {errorBackUser &&
          errorBackUser?.error.includes("ChildData validation failed") && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ width: "90%" }}
            >
              التاريخ غير صالح
            </p>
          )}
        {errorBackUser &&
          errorBackUser?.error ===
            "Cannot read property 'map' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ width: "90%" }}
            >
              يرجي رفع وثيقة تثبت الخدث طبقا للموضح بالاسفل
            </p>
          )}
        {successAdd && setOpenAuth("successaddinform")}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor="">اسم المفقود</label>
              <input
                type="text"
                placeholder="اسم المفقود"
                className="form-control"
                name="name"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الاب</label>
              <input
                name="fatherName"
                type="text"
                placeholder="  اسم الاب"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> كنية المفقود</label>
              <input
                type="text"
                placeholder=" كنية المفقود"
                className="form-control"
                name="nickname"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الام</label>
              <input
                type="text"
                placeholder=" اسم الام "
                className="form-control"
                name="motherName"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المواليد</label>
              <input
                type="date"
                placeholder="  المواليد"
                className="form-control"
                name="dateOfBirth"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> مكان الحدث </label>
              <input
                type="text"
                placeholder="  مكان الحدث"
                className="form-control"
                name="place"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الجهة المسؤولة</label>
              <select
                name="responsibleAuthority"
                id=""
                className="form-control"
                onChange={handlechange}
              >
                <option value="system">النظام</option>
                <option value="daaeh">داعش</option>
                <option value="qasad">قسد</option>
              </select>
            </div>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                وثيقة او ملف (ملف pdf او word او فيديو mp4 او ملف zip)
              </p>
              <label htmlFor="file-upload" className={styles.customfileupload}>
                اختيار الملف
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleChangeDocuments}
                multiple
                name="documents"
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                placeholder="  المحافظة"
                className="form-control"
                name="governorate"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي </label>
              <input
                type="text"
                placeholder="   روابط خارجية"
                className="form-control"
                name="externalLinks"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                صورة (اجباري)
              </p>
              <label htmlFor="file-upload1" className={styles.customfileupload}>
                اختيار الصورة
              </label>
              <input
                type="file"
                id="file-upload1"
                onChange={handleChangeImageProfile}
                name="profileImage"
              />
            </div>
          </div>
          <div className={styles.input1}>
            <label htmlFor="">شرح مفصل</label>
            <textarea
              name="details"
              id=""
              onChange={handlechange}
              className="form-control"
            ></textarea>
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
            "    اضافة بيانات"
          )}
        </button>
      </div>
    </div>
  );
}
