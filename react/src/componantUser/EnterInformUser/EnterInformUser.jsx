import React, { useState,useContext } from 'react'
import styles from './EnterInform.module.css'
import AddShahedUser from '../AddSahedUser/AddShahedUser';
import AddMoataelUser from '../AddMoataelUser/AddMoataelUser';
import AddMafquodUser from '../AddMafquodUser/AddMafquodUser';
import AddMogramUser from '../AddMogramUser/AddMogramUser';
import AddKaaenUser from '../AddKaaenUser/AddKaaenUser';
import AddCreditTakremUser from '../AddCreditTakremUser/AddCreditTakremUser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContextUser} from '../../context/Context';
import AddLastNeswUser from '../AddLastNeswUser';
import AddDamWathaaqUser from '../AddDamWathaaqUser';
export default function EnterInformUser() {

  const {setOpenAuth}= useContext(ContextUser)

    const [choiceArchife, setChoiceArchife] = useState("last");
  return (
    <div className={styles.RegisterUser}>
      <div className={styles.forms}>
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
        <div className={styles.headhere}>
          <h6>ادخال بيانات</h6>
          <hr />
        </div>
        <div className={styles.filterAndDisplay}>
          <div className={styles.filter}>
            <span
              onClick={() => setChoiceArchife("last")}
              className={choiceArchife === "last" ? styles.active : ""}
            >
            اضافة خبر
            </span>
            <span
              onClick={() => setChoiceArchife("martyr")}
              className={choiceArchife === "martyr" ? styles.active : ""}
            >
              شهيد
            </span>
            <span
              onClick={() => setChoiceArchife("motaal")}
              className={choiceArchife === "motaal" ? styles.active : ""}
            >
              معتقل
            </span>
            <span
              onClick={() => setChoiceArchife("mafkod")}
              className={choiceArchife === "mafkod" ? styles.active : ""}
            >
              مفقود
            </span>
            <span
              onClick={() => setChoiceArchife("magrem")}
              className={choiceArchife === "magrem" ? styles.active : ""}
            >
              مجرم حرب
            </span>
            <span
              onClick={() => setChoiceArchife("kaaen")}
              className={choiceArchife === "kaaen" ? styles.active : ""}
            >
              عملاء
            </span>
            <span
              onClick={() => setChoiceArchife("takrem")}
              className={choiceArchife === "takrem" ? styles.active : ""}
            >
              بطاقات تكريم
            </span>
            <span
              onClick={() => setChoiceArchife("damwathaaq")}
              className={choiceArchife === "damwathaaq" ? styles.active : ""}
            >
              ادعمنا بوثائق
            </span>
          </div>
        </div>
        {choiceArchife === "last" && <AddLastNeswUser />}
        {choiceArchife === "martyr" && <AddShahedUser />}
        {choiceArchife === "motaal" && <AddMoataelUser />}
        {choiceArchife === "mafkod" && <AddMafquodUser />}
        {choiceArchife === "magrem" && <AddMogramUser />}
        {choiceArchife === "kaaen" && <AddKaaenUser />}
        {choiceArchife === "takrem" && <AddCreditTakremUser />}
        {choiceArchife === "damwathaaq" && <AddDamWathaaqUser />}
      </div>
    </div>
  );
}

