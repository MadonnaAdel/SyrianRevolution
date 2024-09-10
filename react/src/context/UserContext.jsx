import { createContext, useState} from "react";

const ContextUserInuse = createContext();

function ContextUserProvider({ children }) {
    
  const [ isLoggedIn , setIsLoggedIn]= useState(!! localStorage.token)

  return (
    <ContextUserInuse.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </ContextUserInuse.Provider>
  );
}


export {  ContextUserProvider ,ContextUserInuse, };