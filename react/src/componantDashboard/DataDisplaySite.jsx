import React, { useState } from "react";
import styles from "../styleDashboard/DataDisplaySite.module.css";
import DataSiteLastNews from "./DataSite/DataSiteLastNews";
import DataSiteArchief from "./DataSite/DataSiteArchief";
import DataSiteSymbol from "./DataSite/DataSiteSymbol";
import DataSiteBlackList from "./DataSite/DataSiteBlackList";
import DataSiteSystem from "./DataSite/DataSiteSystem";
import DataSiteDaaeh from "./DataSite/DataSiteDaaeh";
import DataSiteQasaad from "./DataSite/DataSiteQasaad";
import SearchListDashboard from "./DataSite/SearchListDashboard";
import SearchChildDashboard from "./DataSite/SearchChildDashboard";
import SearchMascersDashboard from "./DataSite/SearchMascersDashboard";
export default function DataDisplaySite() {
  const [choiceArchife, setChoiceArchife] = useState("lastNews");
  function changeSearch(event) {
    const value = event.target.value;
    switch (value) {
      case "option1":
        setChoiceArchife("searchlist");
        break;
      case "option2":
        setChoiceArchife("searchchild");

        break;
      case "option3":
        setChoiceArchife("searchmascers");

        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div className={`headDashboard`}>
        <p> البيانات المعروضة بالموقع</p>
      </div>

      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          <span
            onClick={() => setChoiceArchife("lastNews")}
            className={choiceArchife === "lastNews" ? styles.active : ""}
          >
            اخر الاخبار
          </span>
          <span
            onClick={() => setChoiceArchife("archiefThowra")}
            className={choiceArchife === "archiefThowra" ? styles.active : ""}
          >
            ارشيف الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("symbol")}
            className={choiceArchife === "symbol" ? styles.active : ""}
          >
            رموز الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("blacklist")}
            className={choiceArchife === "blacklist" ? styles.active : ""}
          >
            القائمة السوداء
          </span>
          <span
            onClick={() => setChoiceArchife("system")}
            className={choiceArchife === "system" ? styles.active : ""}
          >
            ملفات النظام
          </span>
          <span
            onClick={() => setChoiceArchife("daaeh")}
            className={choiceArchife === "daaeh" ? styles.active : ""}
          >
            ملفات داعش
          </span>
          <span
            onClick={() => setChoiceArchife("qasad")}
            className={choiceArchife === "qasad" ? styles.active : ""}
          >
            ملفات قسد
          </span>
        </div>
        <div>
          <select
            onChange={changeSearch}
            className={`form-control ${styles.inputSearchDashboard}`}
          >
            <option>ابحث عن</option>
            <option value="option1">
              {" "}
              اخر الاخبار والارشيف والرموز والعملاء
            </option>
            <option value="option2"> الشهداء والمعتقلين والمفقودين</option>
            <option value="option3"> الملفات</option>
          </select>
        </div>
      </div>
      {choiceArchife === "lastNews" && <DataSiteLastNews />}
      {choiceArchife === "archiefThowra" && <DataSiteArchief />}
      {choiceArchife === "symbol" && <DataSiteSymbol />}
      {choiceArchife === "blacklist" && <DataSiteBlackList />}
      {choiceArchife === "system" && <DataSiteSystem />}
      {choiceArchife === "daaeh" && <DataSiteDaaeh />}
      {choiceArchife === "qasad" && <DataSiteQasaad />}
      {choiceArchife === "searchlist" && <SearchListDashboard />}
      {choiceArchife === "searchchild" && <SearchChildDashboard />}
      {choiceArchife === "searchmascers" && <SearchMascersDashboard />}

   
    </div>
  );
}
