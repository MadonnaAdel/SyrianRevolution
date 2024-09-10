import React from "react";
import './Footer.css'
import { Link, NavLink } from "react-router-dom";

import { useUser } from "../../context/Context";

export default function Footer() {
  const { messageAndPaypal } = useUser()

  return (
    <>
      <div className="footer pt-5 pb-3 ">
        <div className="containe" style={{width:'90%',margin:'auto'}}>
          <h3 className="mb-4">الثورة السورية</h3>
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="row gy-3" style={{fontSize:'13px'}}>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/">
                    الرئيسية
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/symbolthourauser">
                    رموز الثورة
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graamsystem">
                    ملفات النظام
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/lastNews">
                    أخر الاخبار
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/blacklistuser">
                    القائمة السوداء
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graemqasad">
                    ملفات قسد
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/archiefthoura">
                    أرشيف الثورة
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/blacklistuser">
                    مجرمي الحرب
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graemdashuser">
                    ملفات داعش
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0">تواصل معنا</p>
                <div className="social-icons-footer d-flex align-items-center">
                     <a
                    href="https://api.whatsapp.com/send/?phone=4917676000731"
                    className="text-white"
                                        target="_blank"

                  >
                    {" "}
                    <i class="fa-regular fa-comment-dots ms-1"></i>
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029VadYk723LdQRWZRO4t3S"
                    className="text-white"
                                        target="_blank"

                  >
                    {" "}
                    <i className="fa-brands fa-whatsapp ms-2"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/syrian_revolut/"
                    className="text-white"
                                        target="_blank"

                  >
                    <i className="fa-brands fa-instagram ms-2"></i>
                  </a>
                  <a
                    href="https://t.me/Syrian_Revolution7"
                    className="text-white"
                                        target="_blank"

                  >
                    <i class="fa-brands fa-telegram ms-2"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@syrian.revolution7"
                    className="text-white"
                                        target="_blank"

                  >
                    <i className="fa-brands fa-tiktok ms-2"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/syrian.revolut1"
                    className="text-white"
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-facebook ms-2"></i>
                  </a>
                  <a
                    href="https://x.com/syrian_revolut"
                    className="text-white"
                                        target="_blank"

                  >
                    <i className="fa-brands fa-square-twitter ms-2"></i>
                  </a>

                  <a
                    href="https://youtube.com/@syrian.revolution7"
                    className="text-white"
                                        target="_blank"

                  >
                    <i class="fa-brands fa-square-youtube ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0"> تثبيت التطبيق</p>
                <div
                  className="social-icons-footer d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <a
                    href={
                      messageAndPaypal.filter(
                        (e) => e.category === "android"
                      )[0]?.content
                    }
                  >
                    <button
                      className="btn oda"
                      style={{ border: "2px solid white", color: "white" }}
                    >
                      اندرويد
                    </button>
                  </a>
                  <a
                    href={
                      messageAndPaypal.filter(
                        (e) => e.category === "desktop"
                      )[0]?.content
                    }
                  >
                    <button
                      className="btn"
                      style={{ border: "2px solid white", color: "white" }}
                    >
                      ايفون
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0">
                  {" "}
                  ادعم موقعنا لنستمر بالتطوير وتقديم رسالتنا (تبرع الان)
                </p>

                <div>
                  {messageAndPaypal
                    .filter((e) => e.category === "paypal")
                    .map((e, i) => (
                      <div
                        key={i}
                      
                        style={ {
                          display:'flex',
                          gap: "10px",
                          justifyContent:"space-between",
                          alignItems: "center",
                          marginBottom:'10px'
                        }}
                      >
                        <a
                          href={e?.content}
                          style={{
                            textDecoration: "none",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          {e?.content}
                        </a>
                        <img
                          src={`https://syrianrevolution1.com/messagePaypal/${e?.icon}`}
                          alt="paypal"
                       style={{width:'28px',height:'28px'}}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className=" para text-center p-0 m-0">
            جميع حقوق النشر محفوظة -
            <Link to="/privacypolicy" style={{ textDecoration: "none" }}>
              سياسة الخصوصية{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}











