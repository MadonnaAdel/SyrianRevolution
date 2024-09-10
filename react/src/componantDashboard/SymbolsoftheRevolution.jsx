import React, { useState } from 'react'
import styles from "../styleDashboard/RevolutionArchiveDash.module.css";
import Symbols from './Symbols';
import Takrem from './Takrem';
export default function SymbolsoftheRevolution() {
    const [choiceArchife, setChoiceArchife] = useState("symbol");
    
  return (
    <div>
 
      <div className={`headDashboard`}>
        <p>ادخال البيانات / رموز الثورة</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          <span
            onClick={() => setChoiceArchife("symbol")}
            className={choiceArchife === "symbol" ? styles.active : ""}
          >
            رموز الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("takrem")}
            className={choiceArchife === "takrem" ? styles.active : ""}
          >
            بطاقة التكريم
          </span>
        </div>
      </div>
      {choiceArchife === "symbol" && <Symbols />}
      {choiceArchife === "takrem" && <Takrem />}
    </div>
  );
}
