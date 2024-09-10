import React, { useState } from 'react'
import styles from "../../styleDashboard/AddSuperVisor.module.css";
import axios from 'axios';
import { useUser } from '../../context/Context';
export default function BackgroundImage() {
    const [openAddImage,setOpenImage] = useState(false)
    const [ addImage, setAddImage ] = useState("")
    const [ loadingAdd, setLoadingAdd ] = useState( false )
    const { allBackground, getBackground } = useUser();
       function handleChangeImageProfile(e) {
         setAddImage(e.target.files[0]);
  }
    async function handleSubmit( e ) {
        e.preventDefault()
        if ( !addImage ) {
            return alert('يرجي رفع الصورة')
        }
      
        setLoadingAdd(true)
        const formData = new FormData()
         formData.append("image",addImage);
       await axios.post(
         `https://syrianrevolution1.com/background/add/${localStorage.getItem(
           "idUserLogin"
         )}`,
         formData,
         {
           headers: {
             Authorization: localStorage.getItem("token"),
           },
         }
       ).then( ( result ) => {
           
           if ( result?.data?.success ) {
               setLoadingAdd( false );
               setOpenImage(false)
               getBackground();
           } 
       } ).catch( ( error ) => console.log( error ) );
    }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p> صورة الغلاف</p>
      </div>
      <div className={styles.images}>
             
             <img
               src={`https://syrianrevolution1.com/backgroundImages/${allBackground[0]?.image}`}
               alt="background"
             />
    
       
        <button
          className={`add`}
          style={{ color: "white", backgroundColor: "green" }}
          onClick={() => setOpenImage(true)}
        >
          تغيير الصورة
        </button>
      </div>
      {openAddImage && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "#00011C80",
            top: 0,
            left: 0,
          }}
        >
          <div
            className="gh"
            style={{
              padding: "30px 10px",
              width: "40%",
              height: "fitcontent",
              transform: "translateY(150px)",
              backgroundColor: "#F7F7F7",
              borderRadius: "5px",
              margin: "auto",
            }}
          >
         
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              اضافة الصورة
            </p>

            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "10px", marginBottom: "9px" }}>الصورة</p>

              <label htmlFor="qw" className="customfileupload">
                {" "}
                ارفع الصورة هنا
              </label>
              <input
                type="file"
                className="form-control"
                id="qw"
                onChange={handleChangeImageProfile}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
                margin: "auto",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button className="btn btn-danger" onClick={handleSubmit}>
                {loadingAdd ? (
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "اضافة"
                )}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setOpenImage(false);
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
