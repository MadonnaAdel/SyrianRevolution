import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
export default function Liberated() {
  const currentUserId = localStorage.getItem("idUserLogin");
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const { data, refetch } = useQuery('lasts', getAllLastNews)

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
  function getAllLastNews() {
    return axios
      .get(
        "https://syrianrevolution1.com/lists/search?category=lastNews&page=3&limit=5"
      )
  }
  console.log(data);
  


  return (
    <div>
      
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row gy-3 mb-5">
            <div className="col-md-6 h-100">
              <div className="right h-100">
                <div className=" ">
                  <div>

                    {
                      currentUserId === data?.data[0].user._id ? (
                        <select
                          id="small-dropdown"
                          value={selectedOption[data?.data[0]._id] || data?.data[0].visibility}
                          onChange={(event) => handleChange(event, data?.data[0]._id)}
                          style={{ padding: "5px", fontSize: "14px" }}
                          className="m-2"
                        >
                          <option value="" disabled>{data?.data[0].visibility}</option>
                          <option value="العامة">العامة</option>
                          <option value="خاص بي">خاص بي</option>
                        </select>
                      ) : (
                        <p className="m-0 p-0 fs-6">{data?.data[0].visibility}</p>
                      )
                    }


                  </div>
                  {
                    data?.data[0]?.selfImg ?
                      (
<img
                      src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.selfImg}`}
                      alt="home"
                      className=" w-100 rounded-3 fimg h-75"
                      fetchpriority="high"
                    />
                      ): (
                          <img
                      src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.images[0].imgPath}`}
                      alt="home"
                      className=" w-100 rounded-3 fimg h-75"
                      fetchpriority="high"
                    />
                      )
                    
                  }
                  {
                    data?.data[0]?.video &&
                    <video
                      width="320"
                      height="240px"
                      style={{ width: "100%", marginBottom: "30px", height: "200px" }}
                      className="w-100 rounded-3 fimg"
                      controls
                    >
                      <source src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.video}`} type="video/mp4" />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  }

                </div>
                <div className="info">
                  <p>
                    {data?.data[0]?.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() =>
                        navigate(`/newsDetails/${data?.data[0]._id}`)
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {data?.data.length > 0 &&
                        data?.data[0]?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row gy-2">
                {data?.data.filter((e) => e.category === "lastNews" && e.visibility === "العامة").slice(1, 5).map((e, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="news">
                      <div className="item">
                        <div className=" ">
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
                            e.video &&
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
                        <div className="text">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
