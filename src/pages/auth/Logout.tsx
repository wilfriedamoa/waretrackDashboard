import React, { useEffect } from "react";
import { Navigate } from "react-router";

const Logout: React.FC = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <React.Fragment>
      <Navigate to={"/"} />
    </React.Fragment>
  );
};

export default Logout;
