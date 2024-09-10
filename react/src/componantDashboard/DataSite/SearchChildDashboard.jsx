import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import style from "./SearchedDash.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
export default function SearchChildDashboard() {
     const [name, setName] = useState("");
  const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
     function searchList() {
       return axios.get(
         `https://syrianrevolution1.com/childData/searchName?name=${name}`
       );
     }
     const { data, refetch } = useQuery("searchchildDashboard", searchList, {
       enabled: false,
       onSettled: () => {
         setIsLoading(false);
       },
     });

     function handlesearch() {
       if ( name !== "" ) {
             setIsLoading(true);
         refetch();
       }
     }
  return (
    <>
      <div>
        <div className={style.inputSearch}>
          <div>
            <label htmlFor="">الاسم</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="الاسم"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ transform: "translateY(10px)" }}
            onClick={handlesearch}
          >
            {isLoading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              " بحث"
            )}
          </button>
        </div>

        <span
          style={{
            backgroundColor: "#C1D6F2",
            padding: "5px 20px",
            borderRadius: "25px",
            transform: "translate(-10px,35px)",
            display: "inline-block",
            marginBottom: "30px",
          }}
        >
          <FontAwesomeIcon
            style={{ margin: "0 10px" }}
            icon={faMagnifyingGlass}
          />{" "}
          نتائج البحث
        </span>
      </div>
      <div className={`containerTable`}>
        <table>
          <thead>
            <tr>
              <th> عنوان الخبر</th>
              <th>اسم الناشر</th>
              <th> التصنيف</th>
              <th>البيانات المنشورة</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user?.user?.username}</td>
                <td>{user.category}</td>
                <td>
                  <button
                    className={`add `}
                    style={{
                      backgroundColor: "#3B9058",
                      color: "white",
                    }}
                    onClick={() => {
                      navigate(`/dashboard/dataChildDisplaySite/${user._id}`);
                    }}
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
