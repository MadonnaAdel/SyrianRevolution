import React, { useState } from 'react'
import './RegimeMassacresUser.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery } from 'react-query';
export default function RegimeMassacresUser() {
  const [selectedOption, setSelectedOption] = useState('');
  const currentUserId = localStorage.getItem("idUserLogin");


  const navigate = useNavigate()

  function getAllLastNews() {
    return axios
      .get(
        "https://syrianrevolution1.com/lists/search?category=lastNews&limit=16"
      )
  }
  const { data,refetch } = useQuery('last', getAllLastNews)
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

    <>
      
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data
              .filter((e) => e.category === "lastNews" && e.visibility === "العامة")
              .map((last, i) => (
                <div className="col-md-3" key={i}>
                  <div>
                    {
                      currentUserId === last.user._id ? (
                        <select
                          id="small-dropdown"
                          value={selectedOption[last._id] || last.visibility}
                          onChange={(event) => handleChange(event, last._id)}
                          style={{ padding: "5px", fontSize: "14px" }}
                          className="m-2"
                        >
                          <option value="" disabled>{last.visibility}</option>


                          <>
                            <option value="العامة">العامة</option>
                            <option value="خاص بي">خاص بي</option>
                          </>

                        </select>
                      ) : (
                        <p className="m-0 p-0 fs-6">{last.visibility}</p>
                      )
                    }

                  </div>


                  {last.images.length > 0 ?(
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || "image"}
                      className="w-100 rounded-3 fimg"
                    />
                  ) : (
                      <img
                      src={`https://syrianrevolution1.com/postImages/${last.selfImg}`}
                      alt={last.images[0]?.description || "image"}
                      className="w-100 rounded-3 fimg"
                    />
                  )}


                  {last.video && (
                    <video
                      width="320"
                      height="240px"
                      style={{ width: "100%", marginBottom: "30px", height: "200px" }}
                      className="w-100 rounded-3 fimg"
                      controls
                    >
                      <source src={`https://syrianrevolution1.com/postImages/${last?.video}`} type="video/mp4" />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  )}

                  {/* عرض النصوص */}
                  <p>
                    {last.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => navigate(`/newsDetails/${last._id}`)}
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">{last?.createdAt && last?.createdAt.slice(0, 10)}</small>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
