import React,{ useState }  from 'react'
import styles from '../styleDashboard/Excel.module.css'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export default function SearchExcel() {
  ///////////////////
  const [ searched, SetSearched ] = useState( {} );
  const [data, setData] = useState([]);
  const [ message, setMessage ] = useState(false);
  const [ errorListUser, setErrorListUser ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  const [loadingDelete, setLoadingDeleted] = useState(false);

  const navigate = useNavigate()
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
  ////////////////////////////////////
 
  async function handleSearch() {
    setMessage( false );
    let SearchExcel = validationSearch();
    if ( SearchExcel.error ) {
      setErrorListUser( [ SearchExcel.error.details ] );
    } else {
      setErrorListUser( '' )
      setLoading( true );
    const url = `https://syrianrevolution1.com/sheet/search?name=${searched.name}&nickname=${searched.nickname}&fatherName=${searched.fatherName}`;
      await axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then( ( result ) => {
        
             if (result.data.length) {
               setData( result.data );
               setLoading(false)
             } else {
               setMessage( true );
               setLoading( false );
               setData([])
             }
        }
       
        )
        .catch((error) => console.log(error));
   }
  }
  async function handleDelete( id ) {
    setLoadingDeleted(true);
    await axios
      .delete(`https://syrianrevolution1.com/sheet/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result.data.message === "Deleted Successful") {
          setLoadingDeleted(false);
          handleSearch();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
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
        <div className={styles.inputSearch}>
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
            transform: "translate(-10px,50px)",
            display: "inline-block",
          }}
        >
          <FontAwesomeIcon
            style={{ margin: "0 10px" }}
            icon={faMagnifyingGlass}
          />{" "}
            نتائج البحث
        </span>

        <div className={styles.SuperVisor} style={{ marginTop: "10px" }}>
          <div className={styles.allUser}>
            <div className={styles.containerTable1}>
              <table className={styles.table}>
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
                    {/* <th> المدينة</th>
                    <th>الحي</th> */}
                    <th> الجرم</th>

                    <th> الجهة المسؤلة</th>
                    {/* <th> ملاحظات</th> */}
                    <th> الملاحظات</th>
                    <th> حذف</th>
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
                      {/* <td>{e?.city}</td>
                      <td>{e?.elhy}</td> */}
                      <td>{e?.grom}</td>

                      <td>{e?.responsibleAuthority}</td>
                      {/* <td>{e?.extraInfo}</td> */}
                      <td>{e?.notes}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(e?._id)}
                        >
                          {" "}
                          {loadingDelete ? (
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                          ) : (
                            " حذف"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {message && (
                <p
                  style={{ textAlign: "center", transform: "translatey(50px)" }}
                >
                  لا توجد بيانات متطابقة
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${styles.add} btn btn-success`}
        onClick={() => navigate(`/dashboard/excel`)}
      >
        اضافة
      </button>
    </>
  );
}
