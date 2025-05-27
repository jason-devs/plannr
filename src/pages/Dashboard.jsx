import { useState } from "react";
import { Outlet } from "react-router-dom";
import EndContext from "../features/frontend/endContext";

function Dashboard() {
  const [end, setEnd] = useState("#front-end");

  return (
    <EndContext.Provider value={{ end, setEnd }}>
      <Outlet />
    </EndContext.Provider>
  );
}

export default Dashboard;
