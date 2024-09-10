import React from 'react';
import './BlackListUser.css';
import FlagBlackList from './FlagBlackList';
import SliderBlackList from './SliderBlackList';
import FlagBlackListTwo from './FlagBlackListTwo';
import SliderBlackListTwo from './SliderBlackListTwo';
import { Helmet } from 'react-helmet-async';
import FlagBlackListThree from './FlagBlackListThree';
import SliderBlackListThree from './SliderBlackListThree';
export default function BlackListUser() {
  return (
    <>
      <Helmet>
        <title> الثورة السورية </title>
        <meta name="description" content="  القائمة السوداء" />
      </Helmet>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> القائمة السوداء </h3>
        </div>
      </div>
      <FlagBlackListThree />
      <SliderBlackListThree />
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> عملاء </h3>
        </div>
      </div>
      <FlagBlackList />
      <SliderBlackList />

      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> مجرمين الحرب </h3>
        </div>
      </div>
      <FlagBlackListTwo />
      <SliderBlackListTwo />
    </>
  );
}
