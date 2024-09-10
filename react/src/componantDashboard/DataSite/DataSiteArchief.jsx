import React from "react";
import styles from "../../styleDashboard/DataDisplaySite.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
export default function DataSiteLastNews() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  /////////////////////
  function getList(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=archiefthoura&page=${page}`
    );
  }

  ///////////////////////
  const { data:data1, isLoading } = useQuery(
    ["archiefdisplayUser", page],
    () => getList(page),
    {
      keepPreviousData: true,
    }
  );
  //////////////////////
   function getList1(page = 1) {
     return axios.get(
       `https://syrianrevolution1.com/lists/search?category=mozaharat&page=${page}`
     );
   }

   ///////////////////////
   const { data: data2 } = useQuery(
     ["mozaharatdisplayUser", page],
     () => getList1(page),
     {
       keepPreviousData: true,
     }
   );
  ////////////////////////////
   function getList2(page = 1) {
     return axios.get(
       `https://syrianrevolution1.com/lists/search?category=maarek&page=${page}`
     );
   }

   ///////////////////////
   const { data: data3 } = useQuery(
     ["maarekdisplayUser", page],
     () => getList2(page),
     {
       keepPreviousData: true,
     }
   );




  //////////////////////////
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  ////////////////////////////////
  if (isLoading)
    return (
      <div
        className="spinner-border"
        role="status"
        style={{ position: "absolute", left: "50%", top: "50%" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className={styles.DataSiteLastNews}>
      <div className={styles.allUser}>
        <div className={`containerTable`}>
          <table>
            <thead>
              <tr>
                <th> عنوان الخبر</th>
                <th>اسم الناشر</th>
                <th>التصنيف</th>
                <th>البيانات المنشورة</th>
              </tr>
            </thead>
            <tbody>
              {data1?.data.map((user, index) => (
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
                        navigate(`/dashboard/dataDisplaySite/${user._id}`);
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
              {data2?.data.map((user, index) => (
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
                        navigate(`/dashboard/dataDisplaySite/${user._id}`);
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
              {data3?.data.map((user, index) => (
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
                        navigate(`/dashboard/dataDisplaySite/${user._id}`);
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
    </div>
  );
}
