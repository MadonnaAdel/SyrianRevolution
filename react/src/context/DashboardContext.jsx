import { createContext, useContext} from "react";

const ContextDashboard = createContext();

function ContextDashboardProvider({ children }) {
  function getIdConfideint(id) {
    localStorage.setItem("IdConfidentUser", id);
  }

  return (
    <ContextDashboard.Provider value={{ getIdConfideint }}>
      {children}
    </ContextDashboard.Provider>
  );
}

function useDashboard() {
  const context = useContext(ContextDashboard);
  if (context === undefined) {
    throw new Error("proplem in context");
  }
  return context;
}
export {  ContextDashboardProvider ,ContextDashboard,useDashboard };
