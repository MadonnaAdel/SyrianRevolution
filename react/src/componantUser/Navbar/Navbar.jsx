import React, {useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ContextUser } from '../../context/Context';
import { Link as Lik} from "react-scroll";

export default function Navbar() {

  const { role } = useContext(ContextUser);
    const [activeLink, setActiveLink] = useState('');
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const getLinkClass = (link) => {
    return activeLink === link ? 'ahmed' : '';
  };
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container no">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 w-100 p-0 d-flex justify-content-between align-items-center mb-lg-0 ">
            <li className="nav-item">
              <Link
                className={`nav-link  ${getLinkClass("/")} `}
                aria-current="page"
                to="/"
                onClick={() => handleLinkClick("/")}
              >
                الرئيسية
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${getLinkClass("/lastNews")} `}
                aria-current="page"
                to="/lastNews"
                onClick={() => handleLinkClick("/lastNews")}
              >
                اخر الاخبار
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive ${getLinkClass(
                  "/archiefthoura"
                )}`}
                aria-current="page"
                to="/archiefthoura"
                onClick={() => handleLinkClick("/archiefthoura")}
              >
                أرشيف الثورة{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="oneoneone"
                    duration={500}
                    offset={-70}
                  >
                    ارشيف الثورة
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="oneone"
                    duration={500}
                    offset={-70}
                  >
                    المظاهرات
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="onethreefour"
                    duration={500}
                    offset={-70}
                  >
                    معارك الثوار
                  </Lik>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/symbolthourauser"
                className={`nav-link position-relative evolution-archive ${getLinkClass(
                  "/symbolthourauser"
                )}`}
                aria-current="page"
                onClick={() => handleLinkClick("/symbolthourauser")}
              >
                رموز الثورة{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="twoone"
                    duration={500}
                    offset={-70}
                  >
                    رموز الثورة
                  </Lik>
                  <Lik
                    to="twotwo"
                    duration={500}
                    offset={-70}
                    className="nav-link text-white"
                  >
                    بطاقة التكريم
                  </Lik>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive  ${getLinkClass(
                  "/blacklistuser"
                )}`}
                aria-current="page"
                to="/blacklistuser"
                onClick={() => handleLinkClick("/blacklistuser")}
              >
                القائمة السوداء{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="threeone"
                    duration={500}
                    offset={-70}
                  >
                    {" "}
                    القائمة السوداء
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="threetwo"
                    duration={500}
                    offset={-70}
                  >
                    العملاء
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="threethree"
                    duration={500}
                    offset={-70}
                  >
                    مجرمين الحرب
                  </Lik>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive ${getLinkClass(
                  "/graamsystem"
                )}`}
                aria-current="page"
                to="/graamsystem"
                onClick={() => handleLinkClick("/graamsystem")}
              >
                ملفات النظام{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="fourone"
                    duration={500}
                    offset={-70}
                  >
                    ملفات النظام{" "}
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fourtwo"
                    duration={500}
                    offset={-70}
                  >
                    الشهداء
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fourthree"
                    duration={500}
                    offset={-70}
                  >
                    المفقودين
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fourfour"
                    duration={500}
                    offset={-70}
                  >
                    المعتقلين
                  </Lik>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive ${getLinkClass(
                  "/graemqasad"
                )}`}
                aria-current="page"
                to="/graemqasad"
                onClick={() => handleLinkClick("/graemqasad")}
              >
                ملفات قسد{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="fiveone"
                    duration={500}
                    offset={-70}
                  >
                    ملفات قسد{" "}
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fivetwo"
                    duration={500}
                    offset={-70}
                  >
                    الشهداء
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fivethree"
                    duration={500}
                    offset={-70}
                  >
                    المفقودين
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="fivefour"
                    duration={500}
                    offset={-70}
                  >
                    المعتقلين
                  </Lik>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive  ${getLinkClass(
                  "/graemdashuser"
                )}`}
                aria-current="page"
                to="/graemdashuser"
                onClick={() => handleLinkClick("/graemdashuser")}
              >
                ملفات داعش{" "}
                <i className="fa-solid fa-greater-than text-muted"></i>
                <div className="evolution-archive-hover">
                  <Lik
                    className="nav-link text-white"
                    to="sevenone"
                    duration={500}
                    offset={-70}
                  >
                    ملفات داعش{" "}
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="seventwo"
                    duration={500}
                    offset={-70}
                  >
                    الشهداء
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="seventhree"
                    duration={500}
                    offset={-70}
                  >
                    المفقودين
                  </Lik>
                  <Lik
                    className="nav-link text-white"
                    to="sevenfour"
                    duration={500}
                    offset={-70}
                  >
                    المعتقلين
                  </Lik>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link position-relative evolution-archive ${getLinkClass(
                  "/WantedToSystem"
                )}`}
                aria-current="page"
                to="/WantedToSystem"
                onClick={() => handleLinkClick("/WantedToSystem")}
              >
                المطلوبين للنظام
              </Link>
            </li>

            {role === "admin" || role === "supervisor" || role === "owner" ? (
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  onClick={() =>
                    role === "admin" || role === "owner"
                      ? navigate("/dashboard/userdash")
                      : navigate("/dashboard/history")
                  }
                  to="/dashboard/userdash"
                >
                  صفحة الادمن
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}



