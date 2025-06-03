import React from "react";
import MyLink from "../components/MyLink";
import { Link } from "react-router";

const AdminRoute: React.FC = () => {
  const handleMenuToggle = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    document.querySelectorAll(".pc-hasmenu").forEach((el) => {
      if (el !== event.currentTarget.closest(".pc-hasmenu")) {
        el.classList.remove("pc-trigger");
        el.querySelector(".pc-submenu")?.classList.remove("show_submenu");
      }
    });

    let item = event.currentTarget.closest(".pc-hasmenu");
    if (item) {
      let submenu = item.querySelector(".pc-submenu");
      item.classList.toggle("pc-trigger");
      submenu?.classList.toggle("show_submenu");
    }
  };

  return (
    <>
      {/* user management */}
      <li className="pc-item pc-hasmenu">
        <div className="pc-link" onClick={(e) => handleMenuToggle(e)}>
          <span className="pc-micon text-danger">
            <i className="ti ti-users" />
          </span>
          <span className="pc-mtext">GESTION UTILISATEURS</span>
          <span className="pc-arrow">
            <i className="fa fa-chevron-right" />
          </span>
        </div>
        <ul className="pc-submenu">
          <MyLink label={"Creation utilisateur"} link={"/gfa/user/create"} />
          <MyLink label={"Liste utilisateur"} link={"/gfa/user/list"} />
        </ul>
      </li>
      {/* agency management */}
      <li className="pc-item pc-hasmenu">
        <div className="pc-link" onClick={(e) => handleMenuToggle(e)}>
          <span className="pc-micon text-danger">
            <i className="ti ti-building-bank" />
          </span>
          <span className="pc-mtext">GESTION AGENCE</span>
          <span className="pc-arrow">
            <i className="fa fa-chevron-right" />
          </span>
        </div>
        <ul className="pc-submenu">
          <MyLink label={"Creation Agence"} link={"/gfa/agence/create"} />
          <MyLink label={"Liste Agence"} link={"/gfa/agence/list"} />
        </ul>
      </li>

      {/* transfert management */}
      <li className="pc-item pc-hasmenu">
        <div className="pc-link" onClick={(e) => handleMenuToggle(e)}>
          <span className="pc-micon text-danger">
            <i className="ti ti-arrows-right-left" />
          </span>
          <span className="pc-mtext">GESTION AFFECTATIONS</span>
          <span className="pc-arrow">
            <i className="fa fa-chevron-right" />
          </span>
        </div>
        <ul className="pc-submenu">
          <MyLink
            label={"Initier une affectation"}
            link={"/gfa/transfert/init"}
          />
          <MyLink
            label={"Affectations en cours"}
            link={"/gfa/transfert/pending"}
          />
          <MyLink
            label={"Historiques affectations"}
            link={"/gfa/transfert/historic"}
          />
        </ul>
      </li>
      <li className="pc-item">
        <Link to="/gfa/whatsapp" className="pc-link">
          <span className="pc-micon text-success">
            <i className="ti ti-brand-whatsapp" />
          </span>
          <span className="pc-mtext">Whatsapp</span>
        </Link>
      </li>
    </>
  );
};

export default AdminRoute;
