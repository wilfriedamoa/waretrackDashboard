import React from "react";
import AdminRoute from "../routes/AdminRoute";

import { Link } from "react-router";

const Sidebar: React.FC = () => {
  return (
    <nav className="pc-sidebar pc-trigger">
      <div className="navbar-wrapper">
        <div className="m-header shadow-sm">
          <Link to="/dashboard" className="b-brand text-primary">
            {/* ========   Change your logo from here   ============ */}
            <img
              src="https://app.waretrack.online/assets/logo-waretrack-1b57eb0a.png"
              className="img-fluid logo-lg"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="navbar-content">
          <ul className="pc-navbar">
            <li className="pc-item active">
              <Link to="/dashboard" className="pc-link">
                <span className="pc-micon">
                  <i className="ti ti-building-bank" />
                </span>
                <span className="pc-mtext text-uppercase">{"Dashboard"}</span>
              </Link>
            </li>
            {<AdminRoute />}

            {/* <li className="pc-item">
              <a href="../other/sample-page.html" className="pc-link">
                <span className="pc-micon">
                  <i className="ti ti-brand-chrome" />
                </span>
                <span className="pc-mtext">Sample page</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
