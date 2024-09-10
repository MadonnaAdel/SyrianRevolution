import { React, useState } from "react";
import style from "../RegisterUser/RegisterUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function UpdatedPassword() {
  let { id } = useParams();
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate();


  const updatePass = async (e) => {
    e.preventDefault();
    await axios
      .patch(`https://syrianrevolution1.com/users/success/${id}`, {
        password: password,
      })
      .then((data) => {
        console.log(data);
        if (data.data._id) {
          navigate( "/" );
          alert('تم تحديث كلمة المرور')
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={style.RegisterUser}>
      <form
        className={style.formsSuccessRegister}
        onSubmit={(e) => updatePass(e)}
      >
        <div className={style.informSuccess}>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: "green", fontSize: "40px", marginBottom: "20px" }}
          />
          <label
            htmlFor=""
            style={{ textAlign: "start", marginBottom: "10px" }}
          >
            كلمة المرور
          </label>
          <input
            type="text"
            name="password"
            className="form-control"
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="كلمة المرور"
            minLength={6}
            required
          />
          <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
            <button className="btn btn-success" style={{ marginTop: "30px" }}>
              {" "}
              تحديث
            </button>
            <button onClick={()=>navigate('/')} className="btn btn-primary" style={{ marginTop: "30px" }}>
              {" "}
              رجوع
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
