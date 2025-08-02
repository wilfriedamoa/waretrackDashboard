import React from "react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="pc-footer">
      <div className="footer-wrapper container-fluid">
        <div className="row">
          <div className="col-sm my-1">
            <p className="m-0">
              Copyright © {new Date().getFullYear()}
              <a href="#" target="_blank" className="m-2">
                ESODEV
              </a>{" "}
              {/* Distributed by <a href="https://themewagon.com/">ThemeWagon</a>. */}
            </p>
          </div>
          <div className="col-auto my-1">
            <ul className="list-inline footer-link mb-0">
              <li className="list-inline-item">
                <Link to="/dashboard">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
