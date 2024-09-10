import React, { useContext } from 'react'
import style from '../styleDashboard/HomeDashboard.module.css'
import LeftSideBar from './LeftSideBar'
import { Outlet } from 'react-router-dom';
import { ContextUser } from '../context/Context';
import AlertImageDash from './AlertImageDash/AlertImageDash';
export default function HomeDashboard() {
  const { openAlert, openAlertStore } = useContext(ContextUser);
  return (
    <>
      <div className={style.HomeDashboard}>
        <LeftSideBar />

        <div className={style.centerDash}>
          <Outlet />
        </div>
      </div>
      {openAlert && <AlertImageDash src={openAlertStore} />}
    </>
  );
}
