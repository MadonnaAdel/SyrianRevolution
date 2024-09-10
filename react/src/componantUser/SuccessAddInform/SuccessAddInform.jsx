import {React,useContext} from 'react';
import style from '../RegisterUser/RegisterUser.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ContextUser } from '../../context/Context';
export default function SuccessAddInform() {
    const { setOpenAuth}= useContext(ContextUser)

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
      
        <div className={style.informSuccess}>
          <FontAwesomeIcon icon={faCircleCheck} style={{color:"green",fontSize:'40px',marginBottom:'20px'}}/>
          <p>    شكرا لمساعدتنا في رسالتنا سيتم مراحعة البيانات من خلال الادارة ومن ثم نشرها</p>

          <div className={style.btnInpu}>
            <button onClick={()=>setOpenAuth('')}> الرجوع للرئيسية</button>
          </div>
        </div>
      </form>
    </div>
  );
}
