import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BodyProps } from "../types/Body";
import Footer from "./Footer";
import { UserStore } from "../store/UserStore";

const Layout: React.FC<BodyProps> = ({ title, children }) => {
  const userStore = UserStore((set) => set.userDatas);
  return (
    <>
      <Sidebar />
      <Header userData={userStore} />
      <div className="pc-container">
        <div className="pc-content">
          {/* content-header */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">{title}</h5>
                  </div>
                  {/* <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="../dashboard/index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0)">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Home
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
          {/* content-header */}
          <div className="row">{children}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
