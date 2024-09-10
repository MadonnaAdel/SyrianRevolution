import {React,useContext} from 'react'
import style from '../RegisterUser/RegisterUser.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ContextUser} from '../../context/Context';
export default function LoginUser() {

  const { setOpenAuth}= useContext(ContextUser)

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsLogin}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{
            marginRight: "15px",
            marginTop: "10px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={()=>setOpenAuth('')}
        />
        <div
          className={style.headForm}
          style={{ width: "60%", marginTop: "-20px" }}
        >
          <h6>  تعيين كلمة المرور الجديدة </h6>

          <hr />
        </div>
        <div className={style.inform}>
          <div className={style.inpi2}>
            <label htmlFor="">  كلمة المرور الجديدة </label>
            <input
              type="text"
              className="form-control"
              placeholder=" كلمة المرور "
            />
          </div>
          <div className={style.inpi2}>
            <label htmlFor="">  تأكيد كلمة المرور الجديدة </label>
            <input
              type="text"
              className="form-control"
              placeholder="كلمة المرور"
            />
            
          </div>
         

          <div className={style.btnInpu1}>
            <button onClick={()=>setOpenAuth('save')}>   حفظ </button>

            <button
              style={{
                backgroundColor: "transparent",
                              border: "1px solid #3035A1",
                color:'#3035A1'
                          } }
                          onClick={ ()=>setOpenAuth('') }
            >
              رجوع
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
