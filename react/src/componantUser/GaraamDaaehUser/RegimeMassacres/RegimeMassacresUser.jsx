import React from "react";
import "./RegimeMassacresUser.css";
import { useNavigate } from "react-router-dom";
import SliderGaraemDaaehUser from "../SliderGaraamDaaehUser";
import { useQuery } from "react-query";
import axios from "axios";
export default function RegimeMassacresUser() {
  const navigate = useNavigate();
  function getMascersSystem1() {
    return axios.get(
      "http://localhost:4500/massacres/search?responsibleAuthority=daaeh&limit=8"
    );
  }
  const { data } = useQuery("oneMascersDaaeh1", getMascersSystem1);

  return (
    <>
      <section
        className="regime"
        style={{ marginBottom: "100px" }}
        id="sevenone"
      >
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {data?.data.map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`http://localhost:4500/postImages/${e.profileImage}`}
                    alt="home"
                    className=" w-100 rounded-3 fimg"
                    fetchPriority="high"
                  />
                </div>
                <p>
                  {e?.title ? e?.title : ""}
                  <br />
                  <button
                    className="btu d-inline-block mx-1 px-3 rounded-3"
                    onClick={() => navigate(`/NewsDetailsMascers/${e._id}`)}
                  >
                    المزيد
                  </button>
                  <small className="datedSingle">
                    {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SliderGaraemDaaehUser />
    </>
  );
}
