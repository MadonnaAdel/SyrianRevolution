import React, { useContext } from "react";
import style from "./AlertImageDash.module.css";
import { ContextUser } from "../../context/Context";
export default function AlertLogout({ src }) {
    const { setOpenLogout } = useContext(ContextUser);
      function handleLogout() {
        localStorage.clear();
      }
  return (
    <div className={style.RegisterUser}>
      <form
        className={style.formsSuccessRegister1}
        style={{ transform: "translateY(130px)",minHeight:'40%',display:'flex'}}
      >
        <div className={style.informSuccess}>
          <p style={{fontSize:'20px'}}>هل انت متاكد من رغبتك بتسجيل الخروج</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'20px'}}>
            <button className="btn btn-success" onClick={handleLogout}>  تاكيد</button>
            <button className="btn btn-danger" onClick={() => setOpenLogout(false)}> اغلاق</button>
          </div>
        </div>
      </form>
    </div>
  );
}

