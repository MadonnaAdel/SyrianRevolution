import React from 'react';
import Liberated from './Liberated/Liberated';
import FlagsUser from './FlagsUser/FlagsUser';
import RegimeMassacres from './RegimeMassacres/RegimeMassacresUser';

export default function MainPage() {
  return (
    <>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> آخر الأخبار </h3>
        </div>
      </div>
      <RegimeMassacres />
      <Liberated />
      <div className="container">
          <FlagsUser />
      </div>
    </>
  );
}
