import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token == null || token === "undefined") {
      setIsAuthenticated(false);
      localStorage.clear();
    } else {
      let dataDecode = window.atob(token?.split(".")[1]);
      let tokenIntoJson = JSON.parse(dataDecode);

      if (tokenIntoJson?.exp < Date.now() / 1000) {
        setIsAuthenticated(false);
        localStorage.clear();
      }
    }
  }, []);

  if (isAuthenticated == false) {
    return <Navigate to={"/"} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
