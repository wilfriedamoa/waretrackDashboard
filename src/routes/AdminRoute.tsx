import React from "react";
import MyLink from "../components/MyLink";

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
          <span className="pc-micon text-waretrack-icon-color">
            <i className="ti ti-users" />
          </span>
          <span className="pc-mtext">GESTION SOUCRIP.</span>
          <span className="pc-arrow">
            <i className="fa fa-chevron-right" />
          </span>
        </div>
        <ul className="pc-submenu">
          <MyLink
            label={"Souscripteurs Actifs"}
            link={"/dashboard/subscription/actif"}
          />
          <MyLink
            label={"Prospects Actifs"}
            link={"/dashboard/prospect/actif"}
          />
        </ul>
      </li>
    </>
  );
};

export default AdminRoute;
