import React, { useContext, useEffect, useState } from "react";
import style from "../styleDashboard/leftSideBar.module.css";
import imgAvatar from "../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRightFromBracket,
  faBell,
  faComment,
  faHouse,
  faImage,
  faOutdent,
  faReceipt,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { ContextUser, useUser } from "../context/Context";
import AlertLogout from "../componantDashboard/AlertImageDash/AlertLogout";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function LeftSideBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { numberMogrem } = useUser();
  const { role, setOpenLogout, openLogout } = useContext(ContextUser);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.LeftSideBar}>

      <div className={style.first}>
        {!isMobile ? (
          localStorage?.selfImg !== undefined &&
          localStorage?.selfImg !== "undefined" &&
          localStorage?.selfImg !== null &&
          localStorage?.selfImg !== "" ? (
            <img
              src={`https://syrianrevolution1.com/images/${localStorage?.selfImg}`}
              alt="himself"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src={imgAvatar}
              alt="himself"
              style={{
                width: "40px",
                borderRadius: "40%",
                cursor: "pointer",
              }}
            />
          )
        ) : (
          ""
        )}
        <p>{role}</p>
      </div>
      <div className={style.second}>
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/userdash">
              <FontAwesomeIcon icon={faUserGroup} />
              المستخدمين
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" || role === "supervisor" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/history">
              <FontAwesomeIcon icon={faBell} />
              سجل الانشطة
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/message">
              <FontAwesomeIcon icon={faComment} />
              رسالة التوجية
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/paypal">
              <FontAwesomeIcon icon={faPaypal} />
              حساب بيبال
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/background">
              <FontAwesomeIcon icon={faImage} />
              الغلاف
            </NavLink>
          </div>
        ) : (
          ""
        )}
         {role === "admin" || role === "owner" ? (
          <div className={style.secondFirst}>
            <NavLink to="/dashboard/privateNews">
            <FontAwesomeIcon icon={faEye} />

              الاخبار الخاصة بي
            </NavLink>
          </div>
        ) : (
          ""
        )}
        <div className={style.secondsecond}>
          <div className={style.headsecondsecond}>
            <Link>
              <FontAwesomeIcon icon={faArrowDown} />

              {!isMobile ? <p>البيانات المستلمة</p> : ""}
            </Link>
          </div>

          <div className={style.listSecondSecond}>
            <NavLink to="/dashboard/martyrs">شهداء</NavLink>
            <NavLink to="/dashboard/detaineesdash">معتقلين</NavLink>
            <NavLink to="/dashboard/missingdash">مفقودين</NavLink>
            <div>
              <NavLink to="/dashboard/warcriminals"> مجرمين حرب</NavLink>
              <span>{numberMogrem}</span>
            </div>
            <NavLink to="/dashboard/traitors">عملاء</NavLink>
            <NavLink to="/dashboard/honorcard"> بطاقات تكريم</NavLink>
            <NavLink to="/dashboard/lastnewsfromuser"> الأخبار </NavLink>
            {role === "owner" || role === "admin" ? (
              <NavLink to="/dashboard/wathaaqfromuser"> وثائق </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={style.secondsecond}>
          <div className={style.headsecondsecond}>
            <Link>
              <FontAwesomeIcon icon={faOutdent} />
              {!isMobile ? <p> ادخال البيانات</p> : ""}
            </Link>
          </div>

          <div className={style.listSecondSecond}>
            <NavLink to="/dashboard/lastnewsdash"> اخر الاخبار</NavLink>
            <NavLink to="/dashboard/revolutionarchivedash">
              ارشيف الثورة
            </NavLink>
            <NavLink to="/dashboard/symbolsoftherevolution">
              رموز الثورة
            </NavLink>
            <NavLink to="/dashboard/blacklist"> القائمة السوداء</NavLink>
            <NavLink to="/dashboard/crimessystem"> الملفات</NavLink>
            <NavLink to="/dashboard/allexcel"> مطلوبين للنظام</NavLink>
          </div>
        </div>
        <div className={style.secondFourth}></div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <NavLink to="/dashboard/dataDisplaySite">
              <FontAwesomeIcon icon={faReceipt} />
              البيانات المعروضة بالموقع
            </NavLink>
          </div>
        </div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} />
              الرئيسية
            </Link>
          </div>
        </div>
        <div className={style.secondFourth}>
          <div className={style.headsecondsecond}>
            <Link onClick={() => setOpenLogout(true)}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              تسجيل الخروج
            </Link>
          </div>
        </div>
      </div>
      {openLogout && <AlertLogout />}
    </div>
  );
}
