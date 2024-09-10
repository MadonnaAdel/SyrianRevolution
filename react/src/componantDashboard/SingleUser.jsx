import React, { useContext, useState } from "react";
import styles from "../styleDashboard/UpdateSuperVisor.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ContextUser } from "../context/Context";
export default function SingleUser() {
  const { id } = useParams();
  const [single, setSingle] = useState();
  const { setOpenAlert, setOpenAlertStore } = useContext( ContextUser );
  const navigate = useNavigate()

  useEffect(() => {
    async function getSingleUser() {
      await axios
        .get(`https://syrianrevolution1.com/users/single/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          setSingle(result.data);
        })
        .catch((error) => console.log(error));
    }
    getSingleUser();
  }, [id]);

  function openImage(src) {
    setOpenAlert(true);
    setOpenAlertStore(src);
  }


  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المستخدمون / عرض</p>
      </div>
      <div className={styles.singleUser}>
        <div className={styles.headInform}>
          <div>
            <h6>اسم المستخدم : </h6>
            <p> {single?.username} </p>
          </div>
          <div>
            <h6>الاسم بالكامل : </h6>
            <p> {single?.name} </p>
          </div>
          <div>
            <h6>البريد الالكتروني : </h6>
            <p> {single?.email} </p>
          </div>
          <div>
            <h6> المحافظة : </h6>
            <p> {single?.government} </p>
          </div>
          <div>
            <h6> رمز الدخول : </h6>
            <p> {single?.key} </p>
          </div>
          <div>
            <h6> الدور : </h6>
            <p> {single?.role} </p>
          </div>
        </div>
        <div className={styles.bottomInform}>
          <div className={styles.oneDiv}>
            <h6>صورة الملف الشخصي </h6>
            {single?.selfImg !== undefined &&
            single?.selfImg !== "undefined" &&
            single?.selfImg !== null &&
            single?.selfImg !== "" ? (
              <img
                src={`https://syrianrevolution1.com/images/${single?.selfImg}`}
                alt="profile"
                onClick={() => {
                  openImage(
                    `https://syrianrevolution1.com/images/${single?.selfImg}`
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              ""
            )}
          </div>
          <div className={styles.oneDiv}>
            <h6>صورة الوثيقة </h6>
            {single?.docImg !== undefined &&
            single?.docImg !== "undefined" &&
            single?.docImg !== null &&
            single?.docImg !== "" ? (
              <img
                src={`https://syrianrevolution1.com/images/${single?.docImg}`}
                alt="profile"
                onClick={() => {
                  openImage(
                    `https://syrianrevolution1.com/images/${single?.docImg}`
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.btnbottom}>
          <button
            className={`add`}
            style={{ border: "1px solid red", color: "red" }}
            onClick={() => navigate(-1)}
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
