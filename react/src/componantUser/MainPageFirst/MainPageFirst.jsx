import React from 'react'


import OneMainPageFirst from './OneMainPageFirst';
import TwoMainPageFirst from './TwoMainPageFirst';
import ThreeMainPageFirst from './ThreeMainPageFirst';
import FourMainPageFirst from './FourMainPageFirst';
import FiveMainPageFirst from './FiveMainPageFirst';
import SixMainPageFirst from './SixMainPageFirst';
export default function MainPageFirst() {
  return (
    <div>
 
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> آخر الأخبار </h3>
        </div>
      </div>
      <OneMainPageFirst />
 <TwoMainPageFirst/>
<ThreeMainPageFirst/>
  <FourMainPageFirst/>

  <FiveMainPageFirst/>
<SixMainPageFirst/>
  
    </div>
  );
}

