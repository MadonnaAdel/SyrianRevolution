import React, { useState } from "react";
import style from "../../styleDashboard/MartyrsDash.module.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";

export default function LastNewsDashFromUser() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  function getList(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/lists/searchFalse?category=lastNews&page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  }

  ///////////////////////
  const { data, isLoading } = useQuery(
    ["lastNewsDashboardUser", page],
    () => getList(page),
    {
      keepPreviousData: true,
    }
  );
  ////////////////////////////
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
  /////////////////
  return (
    <div className={style.MartyrsDash}>
      <div className={`headDashboard`}>
        <p>البيانات المستلمة / الاخبار</p>
      </div>
      <div className={`containerTable`}>
        <table>
          <thead>
            <tr>
              <th>اسم الخبر</th>
              <th>اسم الناشر</th>

              <th> البيانات المرفوعة</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user, index) => (
              <tr key={index}>
                <td>{user.name} </td>
                <td>{user?.user?.username} </td>

                <td>
                  <button
                    className={`add `}
                    style={{ backgroundColor: "#3B9058", color: "white" }}
                    onClick={() => {
                      navigate(
                        `/dashboard/displaylastnewsfromuser/${user._id}`
                      );
                    }}
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
