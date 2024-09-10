import React, { useContext } from "react";
import style from "./MessageOpenHomeUser.module.css";
import { ContextUser } from "../../context/Context";
export default function MessageOpenHomeUser() {
  const { messageAndPaypal, setOpenOne } = useContext(ContextUser);

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <div className={style.informSuccess}>
          <p>
            {
              messageAndPaypal.filter((e) => e.category === "message")[0]
                ?.content
            }{" "}
          </p>

          <div className={style.btnInpu}>
            <button onClick={() => setOpenOne(false)}> تمت القراءة</button>
          </div>
        </div>
      </form>
    </div>
  );
}
