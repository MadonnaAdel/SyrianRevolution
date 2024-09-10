import React, { useContext } from "react";
import style from "./AlertImageDash.module.css";
 import { saveAs } from "file-saver";
import { ContextUser } from "../../context/Context";
export default function AlertImageDash({ src }) {
  const { setOpenAlert } = useContext( ContextUser );

  function saveImage( e ) {
    e.preventDefault()
  saveAs(src,'image')
}
  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <div className={style.informSuccess}>
          <img src={src} alt="martyr or adetainee" />
          <div className={style.btnInpu}>
            <button onClick={() => setOpenAlert(false)}> اغلاق</button>
          </div>
          <div className={style.btnInpu}>
            <button onClick={saveImage}> تنزيل</button>
          </div>
        </div>
      </form>
    </div>
  );
}
