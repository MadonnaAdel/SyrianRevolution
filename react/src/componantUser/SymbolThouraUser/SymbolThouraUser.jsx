import React from 'react';
import Liberated from './Liberated/Liberated';
import style from './SymbolThouraUser.module.css';
import SliderSymbolThouraUser from './SliderSymbolThouraUser';
import LiberatedTwo from './Liberated/LiberatedTwo';
import SliderTakrem from './SliderTakrem';
import { Helmet } from 'react-helmet-async';
export default function SymbolThouraUser() {
  return (
    <>
      <Helmet>
        <title>  الثورة السورية</title>
        <meta name="description" content="رموز الثورة السورية" />
      </Helmet>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">رموز الثورة</h3>
        </div>
      </div>
      <Liberated />
      <SliderSymbolThouraUser />

      <div className="container">
        <div className={`header position-relative py-5 ${style.libCard}`}>
          <h3 className=" text-danger ">بطاقات التكريم </h3>
        </div>
      </div>
      <LiberatedTwo />
      <SliderTakrem />
    </>
  );
}
