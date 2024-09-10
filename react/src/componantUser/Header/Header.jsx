import {React,useContext} from 'react';
import './Header.css';
import { ContextUser } from '../../context/Context';
import EnterInformUser from '../EnterInformUser/EnterInformUser';
import SuccessAddInform from '../SuccessAddInform/SuccessAddInform';
import FaildAddInform from '../FaildAddForm/FaildAddForm';
import TawsikEmail from '../TawsikEmail';

export default function Header() {
  const { openAuth, setOpenAuth, allBackground } = useContext(ContextUser);
  function handleOpen() {
      setOpenAuth( "enterinform");
  }

  return (
    <>
      <div className="header-container overflow-hidden perantHeader">
        <div className=" perantparhead">
          <p className=" perantpar">
            أهلا بك في موقعنا الرسمي ، حيث ستجد هنا كل ما تريد معرفته عن سوريا
            بداية من آخر الأخبار والتغطية المستمرة ، كما نحرص جاهدين أن يكون
            موقعنا بمثابة ملف توثيق لكل الأحداث والملفات التي حدثت ولا زالت تحدث
            ويتم حذفها من وسائل التواصل والمنصات المختلفة ..
            <br />
            نحن هنا لتوثيق الحدث ، كن شريكا معنا وسجل الآن لتحصل على ميزة
            التوثيق
          </p>
          <button
            className="head-btn"
            onClick={handleOpen}
            style={{ padding: "10px 0" }}
          >
            أدخل بيانات{" "}
          </button>
        </div>

        <img
          src={`https://syrianrevolution1.com/backgroundImages/${allBackground[0]?.image}`}
          alt="mainpicture"
          className="head-img"
          fetchpriority='high'
        />
      </div>

      {openAuth === "enterinform" && <EnterInformUser />}
      {openAuth === "successaddinform" && <SuccessAddInform />}
      {openAuth === "faild" && <FaildAddInform />}
      {openAuth === "tawsicEmail" && <TawsikEmail />}
    </>
  );
}



