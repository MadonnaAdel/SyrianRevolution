import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import style from './FlagsUser.module.css'
export default function FlagsUser() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const currentUserId = localStorage.getItem("idUserLogin");

  function getAllLastNews() {


    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=lastNews&page=4&limit=9"
    );
  }
  const { data: data1,refetch } = useQuery("one", getAllLastNews);
  ///////////////////////////////////

  function getAllLastNews1(page = 1) {
    return axios.get(
      `https://syrianrevolution1.com/lists/search?category=lastNews&page=${page}`
    );
  }
  getAllLastNews();

  const { data: data2 } = useQuery(
    ["twolastsnew", page],
    () => getAllLastNews1(page),
    {
      keepPreviousData: true,
      cacheTime: 1800000,
    }
  );
  ////////////////////////
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 4);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
    const handleChange = async (event, newsId) => {
    const newValue = event.target.value;

    try {
      await updateVisibility(newsId, newValue);

      setSelectedOption((prevOptions) => ({
        ...prevOptions,
        [newsId]: newValue
      }));


    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };

  const updateVisibility = async (newsId, newValue) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `https://syrianrevolution1.com/lists/updateVisibility/${newsId}`,
        { visibility: newValue },
        {
          headers: {
            Authorization: `${token}`,
          },
        }

      );
      refetch()
      console.log("تم تحديث الرؤية بنجاح", res);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الرؤية:", error);
    }
  };
  return (
    <div>

      <div className="demonstrations py-3">
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6">
              <div className="row gy-2">
                {data1?.data.filter((e) => e.category === "lastNews" && e.visibility === "العامة")
                  .map((e, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="news">
                        <div className="">
                          <div>
                            {
                      currentUserId === e.user._id ? (
                        <select
                          id="small-dropdown"
                          value={selectedOption[e._id] || e.visibility}
                          onChange={(event) => handleChange(event, e._id)}
                          style={{ padding: "5px", fontSize: "14px" }}
                          className="m-2"
                        >
                          <option value="" disabled>{e.visibility}</option>


                          <>
                            <option value="العامة">العامة</option>
                            <option value="خاص بي">خاص بي</option>
                          </>

                        </select>
                      ) : (
                        <p className="m-0 p-0 fs-6">{e.visibility}</p>
                      )
                    }

                          </div>
                         {
                            e.images[0] ? (
                               <img
                              src={`https://syrianrevolution1.com/postImages/${e.images[0]?.imgPath}`}
                              alt={e.images[0]?.description || "image"}
                              className="w-100 rounded-3 fimg"
                              fetchpriority="high"
                            />
                            ) : (
                                 <img
                              src={`https://syrianrevolution1.com/postImages/${e.selfImg}`}
                              alt={e.images[0]?.description || "image"}
                              className="w-100 rounded-3 fimg"
                              fetchpriority="high"
                            />
                          )
                           
                          }
                          {
                            e?.video &&

                            <video
                              width="320"
                              height="240px"
                              style={{ width: "100%", marginBottom: "30px", height: "200px" }}
                              className="w-100 rounded-3 fimg"
                              controls
                            >
                              <source src={`https://syrianrevolution1.com/postImages/${e?.video}`} type="video/mp4" />
                              المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                            </video>
                          }

                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={`${style.lastSlider} col-md-5`}>
              <div className=" muted p-2">
                {data2?.data.map((e, i) => (
                  <div
                    key={i}
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={{ backgroundColor: "#ECECEC" }}
                  >
                    <div className="col-md-4">
                      {
                        e.images.length > 0 &&
                        <img
                          src={`https://syrianrevolution1.com/postImages/${e.images[0]?.imgPath}`}
                          alt={e.images[0]?.description || "image"}
                          className="w-100 rounded-3 fimg h-50"
                          fetchpriority="high"
                        />
                      }
                      {
                        e?.video &&

                        <video
                          width="320"
                          height="240px"
                          style={{ width: "100%", marginBottom: "30px", height: "200px" }}
                          className="w-100 rounded-3 fimg h-50"
                          controls
                        >
                          <source src={`https://syrianrevolution1.com/postImages/${e?.video}`} type="video/mp4" />
                          المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                        </video>
                      }
                    </div>
                    <div className="col-md-8">
                      <p>
                        {e?.name}
                        <br />
                        <button
                          className="btu d-inline-block mx-1 px-3 rounded-3"
                          onClick={() => navigate(`/newsDetails/${e._id}`)}
                        >
                          المزيد
                        </button>
                        <small className="datedSingle">
                          {e?.createdAt && e?.createdAt.slice(0, 10)}
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={handleNextPage} className="btn btn-secondary">
                  +
                </button>
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
