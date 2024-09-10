import React, { useState } from 'react'
import styles from '../styleDashboard/RevolutionArchiveDash.module.css'
import Archief from './Archief';
import Mozaharat from '../Mozaharat';
import Maarek from './Maarek';
export default function RevolutionArchiveDash() {
    const [choiceArchife, setChoiceArchife] = useState("archife");
  return (
    <div>
      <div className={`headDashboard`}>
        <p>ادخال البيانات / ارشيف الثورة</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          <span
            onClick={() => setChoiceArchife("archife")}
            className={choiceArchife === "archife" ? styles.active : ""}
          >
            الارشيف
          </span>
          <span
            onClick={() => setChoiceArchife("mozaharat")}
            className={choiceArchife === "mozaharat" ? styles.active : ""}
          >
            المظاهرات
          </span>
          <span
            onClick={() => setChoiceArchife("maarek")}
            className={choiceArchife === "maarek" ? styles.active : ""}
          >
            معارك الثوار
          </span>
        </div>
      </div>
      {choiceArchife === "archife" && <Archief />}
      {choiceArchife === "mozaharat" && <Mozaharat />}
      {choiceArchife === "maarek" && <Maarek/>}
    </div>
  );
}
