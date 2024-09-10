
import React, { useState } from "react";
import style from "./WantedToSystem.module.css";
import MainNav from "../MainNav/MainNav";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Joi from "joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function WantedToSystem() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [searched, SetSearched] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorListUser, setErrorListUser] = useState(null);
  function handlechange(e) {
    SetSearched((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validationSearch() {
    let schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "الاسم  مطلوب",
        "any.required": "الاسم  مطلوب",
      }),
      fatherName: Joi.string().required().messages({
        "string.empty": "  اسم الاب مطلوب",
        "any.required": "  اسم الاب مطلوب",
      }),
      nickname: Joi.string().required().messages({
        "string.empty": "    الكنية مطلوبة",
        "any.required": "    الكنية مطلوبة",
      }),
    });
    return schema.validate(searched, { abortEarly: false });
  }


  async function handleSearch() {
    setMessage(false);
    let SearchExcel = validationSearch();
    if (SearchExcel.error) {
      setErrorListUser([SearchExcel.error.details]);
    } else {
      setErrorListUser("");
      setLoading(true);
      const url = `https://syrianrevolution1.com/sheet/search?name=${searched.name}&nickname=${searched.nickname}&fatherName=${searched.fatherName}`;
      await axios
        .get(url)
        .then((result) => {
         
          if (result.data.length) {
            setData(result.data);
            setLoading(false);
          } else {
            setMessage(true);
            setLoading(false);
            setData([]);
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <>
      <MainNav />
      <Navbar />
      <div className={style.MartyrsDash}>
        <div style={{ width: "100%", marginTop: "10px" }}>
          {errorListUser &&
            errorListUser.map((error, index) => (
              <p key={index} className="alert alert-secondary alerthemself">
                {error[index].message}
              </p>
            ))}
          <span
            style={{
              backgroundColor: "#C1D6F2",
              padding: "5px 20px",
              borderRadius: "25px",
              transform: "translate(-10px,30px)",
              display: "inline-block",
            }}
          >
            <FontAwesomeIcon
              style={{ margin: "0 10px" }}
              icon={faMagnifyingGlass}
            />{" "}
            ادخل البيانات هنا
          </span>
          <div className={style.inputSearch}>
            <div>
              <label htmlFor="">الاسم</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="الاسم"
                onChange={handlechange}
              />
            </div>
            <div>
              <label htmlFor="">الكنية</label>
              <input
                type="text"
                name="nickname"
                className="form-control"
                placeholder="الكنية"
                onChange={handlechange}
              />
            </div>
            <div>
              <label htmlFor="">اسم الاب</label>
              <input
                type="text"
                name="fatherName"
                className="form-control"
                placeholder="اسم الاب"
                onChange={handlechange}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ transform: "translateY(10px)" }}
              onClick={handleSearch}
            >
              {loading ? (
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
              transform: "translate(-10px,55px)",
              display: "inline-block",
            }}
          >
            <FontAwesomeIcon
              style={{ margin: "0 10px" }}
              icon={faMagnifyingGlass}
            />{" "}
            نتائج البحث
          </span>
          <div className={style.SuperVisor} style={{ marginTop: "45px" }}>
            <div className={style.allUser}>
              <div className={style.containerTable}>
                <table className={style.table}>
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th> الكنية</th>
                      <th>اسم الاب</th>
                      <th> اسم الام</th>
                      <th>المواليد</th>
                      <th> المكان</th>
                      <th> المحافظة</th>
                      <th> الجنسية</th>
                  
                      <th> الجرم</th>

                      <th> الجهة المسؤلة</th>
              
                      <th> الملاحظات</th>
                 
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => (
                      <tr key={i}>
                        <td>{e?.name}</td>
                        <td>{e?.nickname}</td>
                        <td>{e?.fatherName}</td>
                        <td>{e?.motherName}</td>
                        <td>{e?.year}</td>
                        <td>{e?.place}</td>
                        <td>{e?.governorate}</td>
                        <td></td>
                  
                        <td>{e?.grom}</td>

                        <td>{e?.responsibleAuthority}</td>
                    
                        <td>{e?.notes}</td>
                  
                      </tr>
                    ))}
                  </tbody>
                </table>
                {message && (
                  <p
                    style={{
                      textAlign: "center",
                      transform: "translatey(50px)",
                    }}
                  >
                    لا توجد بيانات متطابقة
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


