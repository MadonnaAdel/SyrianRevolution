import React, { useContext } from "react";
import Navbar from "../componantUser/Navbar/Navbar";
import MainNav from "../componantUser/MainNav/MainNav";
import Header from "../componantUser/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { Helmet } from "react-helmet-async";
import { ContextUser } from "../context/Context";
import AlertImageDash from "../componantDashboard/AlertImageDash/AlertImageDash";
import MessageOpenHomeUser from "./MessageOpenHomeUser/MessageOpenHomeUser";

export default function HomeUser({ searchGlobal, setSearchGlobal }) {
  const { openAlert, openAlertStore, openOne } =
    useContext(ContextUser);
  return (
    <div>
      <Helmet>
        <title>الثورة السورية</title>
        <meta name="description" content="اخبار الثورة السورية" />
      </Helmet>
      <MainNav searchGlobal={searchGlobal} setSearchGlobal={setSearchGlobal} />
      <Navbar />
      <Header />
      <div className="centerUser">
        <Outlet />
      </div>
      <Footer />
      {openAlert && <AlertImageDash src={openAlertStore} />}
      {openOne && <MessageOpenHomeUser />}
    
    </div>
  );
}
