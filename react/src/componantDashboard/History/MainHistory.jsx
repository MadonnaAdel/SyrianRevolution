import { useContext, useState } from "react";
import styles from "./History.module.css";
import AllHistory from "./AllHistory";
import AdminHistory from "./AdminHistory";
import UserHistory from "./UserHistory";
import HistorySupervisor from "./HistorySupervisor";
import { ContextUser } from "../../context/Context";
import axios from "axios";


////////////////////////////////////////////////
export function getAllHistory(page = 1) {
  return axios.get(`https://syrianrevolution1.com/sgel?page=${page}&limit=10`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}
////////////////////////////////
export default function MainHistory() {
  ///////////////////////////////////
  const { role, page, setPage } = useContext(ContextUser);
 

  /////////////////////////////////////
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  ////////////////////////////////

  const [choice, setChoice] = useState(
    role === "owner"
      ? "all"
      : role === "admin"
      ? "supervisor"
      : role === "supervisor"
      ? "user"
      : ""
  );

  return (
    <div className={styles.MainHistory}>
      <div className={styles.head}>
        <p> سجل الانشطة</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          {role === "owner" ? (
            <span
              className={`${choice === "all" ? styles.active : ""}`}
              onClick={() => setChoice("all")}
            >
              الكل
            </span>
          ) : (
            ""
          )}
          {role === "owner" ? (
            <span
              className={`${choice === "admin" ? styles.active : ""}`}
              onClick={() => setChoice("admin")}
            >
              ادمن
            </span>
          ) : (
            ""
          )}
          {role === "owner" || role === "admin" ? (
            <span
              className={`${choice === "supervisor" ? styles.active : ""}`}
              onClick={() => setChoice("supervisor")}
            >
              مشرفون
            </span>
          ) : (
            ""
          )}

          {role === "owner" || role === "admin" || role === "supervisor" ? (
            <span
              className={`${choice === "user" ? styles.active : ""}`}
              onClick={() => setChoice("user")}
            >
              مستخدمون
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      {choice === "all" && <AllHistory />}
      {choice === "admin" && <AdminHistory />}
      {choice === "supervisor" && <HistorySupervisor />}
      {choice === "user" && <UserHistory />}
      <div>
        <button onClick={handleNextPage} className="btn btn-primary">
          +
        </button>

        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="btn btn-primary"
        >
          -
        </button>
      </div>
    </div>
  );
}
