import React from "react";
import { Link } from "react-router";
import { PageCardProps } from "../types/PageCardProps";

const PageCard: React.FC<PageCardProps> = ({
  title,
  children,
  link,
  linkText,
}) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="font-extrabold">{title}</h5>
          {link && (
            <div className="card-header-actions">
              <Link to={link} className="card-header-action text-white">
                <button className="btn btn-dark btn-sm rounded">
                  {linkText}
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="card-body">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default PageCard;
