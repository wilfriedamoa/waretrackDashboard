import React from "react";
import { Link } from "react-router";

const Header: React.FC<{ userData: any }> = ({
  userData,
}: {
  userData: any;
}) => {
  const handleSidebarToggle = () => {
    let menu = document.getElementById("sidebar-hide") as HTMLElement;
    if (menu) {
      let sidebar = document.querySelector(".pc-sidebar") as HTMLElement;
      if (sidebar.classList.contains("pc-sidebar-hide")) {
        sidebar.classList.remove("pc-sidebar-hide");
      } else {
        sidebar.classList.add("pc-sidebar-hide");
      }
    }
  };

  return (
    <header className="pc-header">
      <div className="header-wrapper">
        {" "}
        {/* [Mobile Media Block] start */}
        <div className="me-auto pc-mob-drp">
          <ul className="list-unstyled">
            {/* ======= Menu collapse Icon ===== */}
            <li className="pc-h-item pc-sidebar-collapse">
              <button
                type="button"
                onClick={handleSidebarToggle}
                className="pc-head-link ms-0 border-0"
                id="sidebar-hide">
                <i className="ti ti-menu-2" />
              </button>
            </li>
            <li className="pc-h-item pc-sidebar-popup">
              <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
                <i className="ti ti-menu-2" />
              </a>
            </li>
          </ul>
        </div>
        {/* [Mobile Media Block end] */}
        <div className="ms-auto">
          <ul className="list-unstyled">
            <li className="dropdown pc-h-item"></li>
            <li className="dropdown pc-h-item header-user-profile">
              <a
                className="pc-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                data-bs-auto-close="outside"
                aria-expanded="false">
                {/* <img
                  src="/images/user/avatar-2.jpg"
                  alt="user-image"
                  className="user-avtar"
                /> */}
                <span className="user-avtar rounded-circle bg-primary font-extrabold text-white d-flex justify-content-center align-items-center">
                  {userData?.username?.charAt(0).toUpperCase()}
                </span>
                {/* <span>{`${userData?.nom} ${userData?.prenom}`}</span> */}
              </a>
              <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                <div className="dropdown-header">
                  <div className="d-flex mb-1">
                    <div className="user-avtar d-flex justify-content-center font-extrabold border text-white bg-danger rounded-circle text-white align-items-center">
                      {userData?.username?.charAt(0).toUpperCase()}
                    </div>
                    {/* <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">{`${userData?.nom} ${userData?.prenom}`}</h6>
                      <span>{userData?.role}</span>
                    </div> */}
                    <Link
                      to={"/dashboard/logout"}
                      className="pc-head-link bg-transparent">
                      <i className="ti ti-power text-danger" />
                    </Link>
                  </div>
                </div>
                <ul
                  className="nav drp-tabs nav-fill nav-tabs"
                  id="mydrpTab"
                  role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="drp-t1"
                      data-bs-toggle="tab"
                      data-bs-target="#drp-tab-1"
                      type="button"
                      role="tab"
                      aria-controls="drp-tab-1"
                      aria-selected="true">
                      <i className="ti ti-user" /> Profile
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="drp-t2"
                      data-bs-toggle="tab"
                      data-bs-target="#drp-tab-2"
                      type="button"
                      role="tab"
                      aria-controls="drp-tab-2"
                      aria-selected="false">
                      <i className="ti ti-settings" /> Setting
                    </button>
                  </li> */}
                </ul>
                <div className="tab-content" id="mysrpTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="drp-tab-1"
                    role="tabpanel"
                    aria-labelledby="drp-t1"
                    tabIndex={0}>
                    <Link
                      to={"/dashboard/user/profil"}
                      className="dropdown-item">
                      <i className="ti ti-user" />
                      <span> Profile</span>
                    </Link>
                    <Link to={"/dashboard/logout"} className="dropdown-item">
                      <i className="ti ti-power" />
                      <span>Deconnexion</span>
                    </Link>
                  </div>
                  {/* <div
                    className="tab-pane fade"
                    id="drp-tab-2"
                    role="tabpanel"
                    aria-labelledby="drp-t2"
                    tabIndex={0}>
                    <a href="#!" className="dropdown-item">
                      <i className="ti ti-help" />
                      <span>Support</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ti ti-user" />
                      <span>Account Settings</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ti ti-lock" />
                      <span>Privacy Center</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ti ti-messages" />
                      <span>Feedback</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ti ti-list" />
                      <span>History</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
