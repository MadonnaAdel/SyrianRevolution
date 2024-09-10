import React, { useContext, useEffect, useState } from 'react'
import MainNav from '../MainNav/MainNav';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import { ContextUser } from '../../context/Context';
import one from '../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
import AlertImageDash from '../../componantDashboard/AlertImageDash/AlertImageDash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSubscript } from '@fortawesome/free-solid-svg-icons';
import Subscribes from '../subscribe/Subscribes';
export default function NewsDetailsMartyr() {
  const [ single, setSingle ] = useState( [] );
     const { openAlert, openAlertStore, setOpenSubscrips, openSubscrips } =
       useContext(ContextUser);
  const { id } = useParams();
  useEffect(() => {
    async function getSingle() {
      await axios
        .get(`https://syrianrevolution1.com/childData/${id}`)
        .then( ( result ) => {
          setSingle( result.data.childData );
     
        } )
        .catch((error) => console.log(error));
    }
    getSingle();
  }, [id]);

  ///////////////////////////////
  const [archief, setArchirf] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://syrianrevolution1.com/childData/userView")
      .then((result) => {
        setArchirf(result.data.data);
      });
  }, []);

  return (
    <>
      {openAlert && <AlertImageDash src={openAlertStore} />}
      <MainNav />
      <Navbar />
      <div className="demonstrations py-3" style={{ marginBottom: "30px" }}>
        <div className="container" style={{ marginTop: "30px" }}>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-md-7">
              <h4 style={{ marginBottom: "30px" }}> الاسم : {single?.name}</h4>
              <img
                src={`https://syrianrevolution1.com/imgData/${single?.profileImage}`}
                alt="from single new"
                style={{ width: "100%", marginBottom: "30px" }}
                className="gimg"
              />
              <h6> اسم الاب : </h6>
              <p>
                {" "}
                {single?.fatherName !== "undefined" ? single?.fatherName : ""}
              </p>
              <h6> اسم الام : </h6>
              <p>
                {" "}
                {single?.motherName !== "undefined" ? single?.motherName : ""}
              </p>
              <h6> الكنية : </h6>
              <p> {single?.nikeName !== "undefined" ? single?.nikeName : ""}</p>
              <h6> التفاصيل : </h6>
              <p> {single?.details !== "undefined" ? single?.details : ""}</p>
              <h6>المحافظة : </h6>
              <p>
                {single?.governorate !== "undefined" ? single?.governorate : ""}
              </p>
              <h6>تاريخ الميلاد : </h6>
              <p>
                {single?.dateOfBirth ? single?.dateOfBirth.slice(0, 10) : ""}
              </p>
              <h6>تاريخ النشر</h6>
              <p className="datedetails">
                {single?.createdAt && single?.createdAt.slice(0, 10)}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {single?.user?.selfImg !== undefined &&
                    single?.user?.selfImg !== "undefined" &&
                    single?.user?.selfImg !== "" ? (
                      <img
                        src={`https://syrianrevolution1.com/images/${single?.user?.selfImg}`}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <img
                        src={one}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    )}

                    <p>{single?.user?.username}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    height: "40px",
                    backgroundColor: "#2FB9EE",
                    padding: "0 20px",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSubscrips(true)}
                >
                  <p style={{ fontSize: "14px", marginTop: "12px" }}>مشاركة</p>
                  <FontAwesomeIcon icon={faSubscript} />
                </div>
              </div>
            </div>
            {/* /////////////////////// */}
            <div className="lastSlider1 col-md-4">
              <div className=" muted p-2 overflow-hidden">
                {archief.slice(0, 50).map((e, i) => (
                  <div
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={{ backgroundColor: "#fdfafa" }}
                    key={i}
                  >
                    <div className="col-md-4">
                      <img
                        src={`https://syrianrevolution1.com/imgData/${e?.profileImage}`}
                        alt="lastNews"
                        className="w-100"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>
                        {e?.name}
                        <br />
                        <button
                          className=" btu d-inline-block mx-1 px-3 rounded-3"
                          onClick={() =>
                            navigate(`/NewsDetailsMartyr/${e._id}`)
                          }
                        >
                          المزيد
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {openSubscrips && <Subscribes />}
      </div>
      <Footer />
    </>
  );
}
