import React, { useState } from 'react'
import styles from "../styleDashboard/AddEcecl.module.css";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function ExeclSheet() {
  const navigate = useNavigate();
  const [ success, setSuccess ] = useState( false );
  const [ loading, setLoading ] = useState();
  const [ user, setUser ] = useState( {} );
    function handlechange(e) {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  }

  async function handleSubmit( e ) {
    e.preventDefault()
    setSuccess( false );
    setLoading( true );
    await axios
      .post("https://syrianrevolution1.com/sheet/addOne", user, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.success === "Row added successfully") {
          setSuccess(true);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.AddSuperVisor} onSubmit={handleSubmit}>
      <div className={styles.head}>
        <p> اضافة بيانات / مطلوبين للنظام </p>
      </div>
      <form action="" className={styles.form}>
        {success && (
          <p className="alert alert-secondary alerthemself">تم الاضافة بنجاح</p>
        )}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الاسم</label>
              <input
                type="text"
                name="name"
                placeholder="اسم المستخدم"
                className="form-control"
                onChange={handlechange}
                required
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الكنية</label>
              <input
                type="text"
                name="nickname"
                placeholder=" الكنية "
                className="form-control"
                onChange={handlechange}
                required
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الاب</label>
              <input
                type="text"
                name="fatherName"
                placeholder="  اسم الاب"
                className="form-control"
                onChange={handlechange}
                required
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> اسم الام </label>
              <input
                type="text"
                name="motherName"
                placeholder="      اسم الام "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المواليد</label>
              <input
                type="date"
                name="year"
                placeholder="   المواليد"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> مكان المواليد </label>
              <input
                type="text"
                name="place"
                placeholder="       مكان المواليد "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                name="governorate"
                placeholder="   المحافظة"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> المدينة </label>
              <input
                type="text"
                name="city"
                placeholder="        المدينة "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الحي</label>
              <input
                type="text"
                name="elhy"
                placeholder="   الحي"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الجرم </label>
              <input
                type="text"
                name="grom"
                placeholder="        الجرم "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> الملاحظات</label>
              <input
                type="text"
                name="notes"
                placeholder="   الملاحظات"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> الجهة المسؤولة </label>
              <input
                type="text"
                name="responsibleAuthority"
                placeholder="        الجهة المسؤولة "
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> معلومات اضافية</label>
              <input
                type="text"
                name="extraInfo"
                placeholder="   معلومات اضافية"
                className="form-control"
                onChange={handlechange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnbottom}>
          <button
            className={`add`}
            style={{ color: "white", backgroundColor: "green" }}
          >
            {loading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              " اضافة"
            )}
          </button>
          <button
            className={`add`}
            style={{ border: "1px solid red", color: "red" }}
            onClick={() => navigate(-1)}
          >
            الغاء
          </button>
        </div>
      </form>
    </div>
  );
}
