import React, { useState } from 'react'
import styles from '../styleDashboard/RevolutionArchiveDash.module.css'
import AddAMartyr from './AddAMartyr';
import Addadetainee from './Addadetainee';
import AddMissing from './AddMissing';
import AddAMassacre from './AddAMassacre';
export default function CrimesSystem() {
    const [choiceArchife, setChoiceArchife] = useState("martyr");
  return (
    <div>
      <div className={`headDashboard`}>
        <p>ادخال البيانات / ملفات</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
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
            onClick={() => setChoiceArchife("magzara")}
            className={choiceArchife === "magzara" ? styles.active : ""}
          >
            ملفات
          </span>
        </div>
      </div>
      {choiceArchife === "martyr" && <AddAMartyr />}
      {choiceArchife === "motaal" && <Addadetainee />}
      {choiceArchife === "mafkod" && <AddMissing />}
      {choiceArchife === "magzara" && <AddAMassacre />}
    </div>
  );
}
