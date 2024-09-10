import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
export default function ProtectedRoutedOnUser({children}) {
  const navigate = useNavigate();
  const role = localStorage.getItem( "roleUserLogin" );
  useEffect(() => {
    if (role !== "admin" &&  role !=="owner") {
      navigate("/");
    } 
  },[role,navigate]);

  return role === "admin" || role === "owner"
    ? children
    : null;
}

