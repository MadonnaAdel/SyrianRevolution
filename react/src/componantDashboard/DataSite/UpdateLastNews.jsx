import React, { useEffect, useState } from 'react'
import styles from './StyleUpdateUser.module.css';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/Context';
import axios from 'axios';
export default function UpdateLastNews() {
  const [userUpdate, setUserUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const { getListUser } = useUser();
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
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    async function getSingleUser() {
      await axios
        .get(`https://syrianrevolution1.com/lists/${id}`)
        .then((result) => {
          setUserUpdate({
            name: result.data.name || "",
                               governorate: result.data.governorate || "",
                               externalLinks: result.data.externalLinks || "",
                               content: result.data.content || "",
          });
        })
        .catch((error) => console.log(error));
    }
    getSingleUser();
  }, [id]);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (
      userUpdate.name !== "" &&
      userUpdate.name !== undefined &&
      userUpdate.name !== null
    ) {
      formData.append("name", userUpdate.name);
    }
    if (
      userUpdate.externalLinks !== "" &&
      userUpdate.externalLinks !== undefined &&
      userUpdate.externalLinks !== null
    ) {
      formData.append("externalLinks", userUpdate.externalLinks);
    }
    if (
      userUpdate.governorate !== "" &&
      userUpdate.governorate !== undefined &&
      userUpdate.governorate !== null
    ) {
      formData.append("governorate", userUpdate.governorate);
    }
    if (
      userUpdate.content !== "" &&
      userUpdate.content !== undefined &&
      userUpdate.content !== null
    ) {
      formData.append("content", userUpdate.content);
    }
    if (
      imageProfile !== null &&
      imageProfile !== undefined &&
      imageProfile !== ""
    ) {
      formData.append("image", imageProfile);
    }

    try {
      setLoading(true);
      setSuccess(false);
      const response = await fetch(
        `https://syrianrevolution1.com/lists/${id}/${localStorage.getItem(
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
      if (result.data._id) {
        setSuccess(true);
        getListUser();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>البيانات المعروضة بالموقع / تحديث بيانات</p>
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
              <label htmlFor=""> الاسم </label>
              <input
                name="name"
                type="text"
                value={userUpdate.name || ""}
                placeholder="الاسم "
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                name="governorate"
                type="text"
                placeholder=" المحافظة "
                value={userUpdate.governorate || ""}
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي</label>
              <input
                name="externalLinks"
                type="text"
                placeholder=" رابط خارجي "
                className="form-control"
                value={userUpdate.externalLinks || ""}
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>الصورة او الفيديو</p>
              <label htmlFor="fsa3" className={`customfileupload`}>
                {" "}
                ارفع الملف{" "}
              </label>
              <input
                name="selfImg"
                id="fsa3"
                type="file"
                className="form-control"
                onChange={handleImg}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp2}>
              <label>المحتوي</label>
              <textarea
                name="content"
                id="fsa3"
                type="file"
                className="form-control"
                onChange={handlechange}
                value={userUpdate.content || ""}
              ></textarea>
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
      </div>
    </div>
  );
}
