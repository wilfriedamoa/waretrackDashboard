import React from "react";
import AdminRoute from "../routes/AdminRoute";
import { RoleEnum } from "../enums/RoleEnum";
import { Link } from "react-router";
import ChefAgenceRoute from "../routes/ChefAgenceRoute";

const Sidebar: React.FC<{ libelle: string; agence: string }> = ({
  libelle,
  agence,
}: {
  libelle: string;
  agence: string;
}) => {
  return (
    <nav className="pc-sidebar pc-trigger">
      <div className="navbar-wrapper">
        <div className="m-header shadow-sm">
          <Link to="/gfa" className="b-brand text-primary">
            {/* ========   Change your logo from here   ============ */}
            <img
              src="/images/UBA-logo.png"
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
              <Link to="/gfa" className="pc-link">
                <span className="pc-micon">
                  <i className="ti ti-building-bank" />
                </span>
                <span className="pc-mtext text-uppercase">
                  {agence ?? "Dashboard"}
                </span>
              </Link>
            </li>
            {(libelle === RoleEnum.ADMIN ||
              libelle === RoleEnum.SUPER_ADMIN) && <AdminRoute />}

            {libelle === RoleEnum.AGENCY_MANAGER && <ChefAgenceRoute />}

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
