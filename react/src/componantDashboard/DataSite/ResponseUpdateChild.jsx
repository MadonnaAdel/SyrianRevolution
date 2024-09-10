import React, { useEffect, useState }  from "react";
import styles from "./UpdateChild.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/Context";
import axios from "axios";
export default function ResponseUpdateChild() {
  const [userUpdate, setUserUpdate] = useState({
    fatherName: "",
    motherName: "",
    nickname: "",
    dateOfBirth: "",
    governorate: "",
    name: "",
    place: "",
    externalLinks: "",
    responsibleAuthority: "",
    profileImage:""
  });

  const [ loading, setLoading ] = useState( false );
  const navigate = useNavigate()
   const { getChildUser } = useUser();
  const [ success, setSuccess ] = useState( false );
  const { id } = useParams();
  function handlechange(e) {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const [imageProfile, setImageProfile] = useState("");
  function handleImg(e) {
    setImageProfile(e.target.files[0]);
  }
    useEffect(() => {
      async function getSingleUser() {
        await axios
          .get(`https://syrianrevolution1.com/childData/${id}`)
          .then( ( result ) => {
            setUserUpdate({
              fatherName: result.data.childData.fatherName || "",
              motherName: result.data.childData.motherName || "",
              nickname: result.data.childData.nickname || "",
              dateOfBirth: result.data.childData.dateOfBirth || "",
              governorate: result.data.childData.governorate || "",
              name: result.data.childData.name || "",
              place: result.data.childData.place || "",
              externalLinks: result.data.childData.externalLinks || "",
              responsibleAuthority: result.data.childData.responsibleAuthority || "",
              details: result.data.childData.details || "",
              profileImage:result.data.childData.profileImage|| ""
            });
          })
          .catch((error) => console.log(error));
      }
      getSingleUser();
    }, [ id ] );
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (
      userUpdate.fatherName !== "" &&
      userUpdate.fatherName !== undefined &&
      userUpdate.fatherName !== null
    ) {
      formData.append("fatherName", userUpdate.fatherName);
    }
    if (
      userUpdate.motherName !== "" &&
      userUpdate.motherName !== undefined &&
      userUpdate.motherName !== null
    ) {
      formData.append("motherName", userUpdate.motherName);
    }
    if (
      userUpdate.governorate !== "" &&
      userUpdate.governorate !== undefined &&
      userUpdate.governorate !== null
    ) {
      formData.append("governorate", userUpdate.governorate);
    }
    if (
      userUpdate.dateOfBirth !== "" &&
      userUpdate.dateOfBirth !== undefined &&
      userUpdate.dateOfBirth !== null
    ) {
      formData.append("dateOfBirth", userUpdate.dateOfBirth);
    }
    if (
      userUpdate.nickname !== "" &&
      userUpdate.nickname !== undefined &&
      userUpdate.nickname !== null
    ) {
      formData.append("nickname", userUpdate.nickname);
    }
    if (
      imageProfile !== null &&
      imageProfile !== undefined &&
      imageProfile !== ""
    ) {
      formData.append("profileImage", imageProfile);
    }
  if (
    userUpdate.name !== "" &&
    userUpdate.name !== undefined &&
    userUpdate.name !== null
  ) {
    formData.append("name", userUpdate.name);
  }
  if (
    userUpdate.place !== "" &&
    userUpdate.place !== undefined &&
    userUpdate.place !== null
  ) {
    formData.append("place", userUpdate.place);
    }
    if (
      userUpdate.externalLinks !== "" &&
      userUpdate.externalLinks !== undefined &&
      userUpdate.externalLinks !== null
    ) {
      formData.append("externalLinks", userUpdate.externalLinks);
    }
      if (
      userUpdate.details !== "" &&
      userUpdate.details !== undefined &&
      userUpdate.details !== null
    ) {
      formData.append("details", userUpdate.details);
    }
       if (
         userUpdate.responsibleAuthority !== "" &&
         userUpdate.responsibleAuthority !== undefined &&
         userUpdate.responsibleAuthority !== null
       ) {
         formData.append(
           "responsibleAuthority",
           userUpdate.responsibleAuthority
         );
       }
    try {
      setLoading( true );
      setSuccess( false );
      const response = await fetch(
        `https://syrianrevolution1.com/childData/update/${id}/${localStorage.getItem(
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
      console.log(result);
      if (result?.data?._id) {
        setSuccess( true )
        getChildUser();
      }else if ( result === 'Date of birth cannot be in the future' ) {
        alert( 'التاريخ غير صالح' )
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className={`headDashboard`}>
        <p> تعديل بيانات </p>
      </div>
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          {success && (
            <p
              className="alert alert-success alerthemself"
              style={{ width: "100%", transform: "translatey(10px)" }}
            >
              تم التحديث بنجاح
            </p>
          )}
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم</label>
              <input
                type="text"
                placeholder="  الاسم "
                className="form-control"
                name="name"
                value={userUpdate.name}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> مكان الحدث</label>
              <input
                name="place"
                type="text"
                placeholder="  مكان الحدث "
                value={userUpdate.place}
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الاب</label>
              <input
                type="text"
                placeholder="  اسم الاب"
                className="form-control"
                name="fatherName"
                value={userUpdate.fatherName}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الام</label>
              <input
                name="motherName"
                type="text"
                placeholder=" اسم الام "
                value={userUpdate.motherName}
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الكنية </label>
              <input
                name="nickname"
                type="text"
                placeholder=" الكنية"
                className="form-control"
                onChange={handlechange}
                value={userUpdate.nickname}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> المواليد</label>
              <input
                name="dateOfBirth"
                type="date"
                placeholder="  المواليد"
                className="form-control"
                onChange={handlechange}
                value={
                  userUpdate.dateOfBirth && userUpdate?.dateOfBirth.slice(0, 10)
                }
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي</label>
              <input
                type="text"
                placeholder="  رابط خارجي "
                className="form-control"
                name="externalLinks"
                value={userUpdate.externalLinks}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الجهة المسؤولة</label>
              <select
                name="responsibleAuthority"
                onChange={handlechange}
                className="form-control"
                value={userUpdate.responsibleAuthority}
              >
                <option value="system">النظام</option>
                <option value="daaeh">داعش</option>
                <option value="qasad">قسد</option>
              </select>
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <div>
                <p style={{ fontSize: "13px", marginBottom: "15px" }}>صورة</p>
                <label htmlFor="q2" className="customfileupload">
                  {" "}
                  ارفع الملف هنا
                </label>
                <input
                  type="file"
                  id="q2"
                  name="profileImage"
                  onChange={handleImg}
                />
              </div>
            </div>
            <div className={styles.inp1}>
              <label htmlFor="">المحافظة</label>
              <input
                type="text"
                name="governorate"
                className="form-control"
                placeholder="المحافظة"
                onChange={handlechange}
                value={userUpdate.governorate}
              />
            </div>
          </div>
          <div className={styles.input1}>
            <label htmlFor="">
              شرح مفصل
            </label>
            <textarea
              name="details"
              style={{ height: "200px" }}
              id=""
              onChange={handlechange}
              className="form-control"
              value={userUpdate.details}
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






