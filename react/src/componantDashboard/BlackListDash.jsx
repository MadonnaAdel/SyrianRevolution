import React, { useState } from 'react'
import styles from '../styleDashboard/RevolutionArchiveDash.module.css'
import Black from './Black';
import Kanaas from './Kanaas';
import BlackListMain from './BlackListMain';
export default function BlackListDash() {
    const [choiceArchife, setChoiceArchife] = useState("blackMain");
  return (
    <div>
      <div className={`headDashboard`}>
        <p>ادخال البيانات / القائمة السوداء</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          <span
            onClick={() => setChoiceArchife("blackMain")}
            className={choiceArchife === "blackMain" ? styles.active : ""}
          >
            القائمة السوداء
          </span>
          <span
            onClick={() => setChoiceArchife("black")}
            className={choiceArchife === "black" ? styles.active : ""}
          >
            مجرمين حرب
          </span>
          <span
            onClick={() => setChoiceArchife("khaan")}
            className={choiceArchife === "khaan" ? styles.active : ""}
          >
            عملاء
          </span>
        </div>
      </div>
      {choiceArchife === "blackMain" && <BlackListMain/>}
      {choiceArchife === "black" && <Black />}
      {choiceArchife === "khaan" && <Kanaas />}
    </div>
  );
}
