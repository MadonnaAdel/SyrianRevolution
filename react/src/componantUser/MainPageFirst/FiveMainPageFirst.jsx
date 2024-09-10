import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
export default function FiveMainPageFirst() {
    const navigate = useNavigate()


   function getAllLastNews() {
      return   axios
            .get(
              "https://syrianrevolution1.com/lists/search?category=maarek&limit=4"
            )
     
        }
        getAllLastNews();
  const { data } = useQuery( 'marek', getAllLastNews, {
    cacheTime:1100000
  })
  return (
    <div>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">معارك الثوار</h3>
        </div>
      </div>
      <div>
        <div className="demonstrations py-3">
          <div className="container">
            <div className="row gy-3 mb-5">
              <div className="col-md-12">
                <div className="row gy-2">
                  {data?.data.map((e, i) => (
                    <div className="col-md-3" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="mozaharat"
                              className="rounded-3 fimg"
                              width="100%"
                              height="100%"
                            />
                          </div>
                          <div className="text">
                            <p style={{ marginTop: "10px" }}>
                              {e?.name}
                              <br />
                              <button
                                className="btu d-inline-block mx-1 px-3 rounded-3"
                                onClick={() =>
                                  navigate(`/newsDetails/${e?._id}`)
                                }
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
    </div>
  );
}
