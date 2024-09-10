import {React,useContext }from 'react';
import style from '../RegisterUser/RegisterUser.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ContextUser } from '../../context/Context';
export default function ErrorComfirmPassword() {
    
    const {setOpenAuth}= useContext(ContextUser)

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
      
        <div className={style.informSuccess}>
          <FontAwesomeIcon icon={faCircleCheck} style={{color:"red",fontSize:'40px',marginBottom:'20px'}}/>
          <p>تم ارسال كافة البيانات بنجاح شكرا لانضمامك الينا</p>

          <div className={style.btnInpu}>
            <button onClick={()=>setOpenAuth('')}> الرجوع للرئيسية</button>
          </div>
        </div>
      </form>
    </div>
  );
}