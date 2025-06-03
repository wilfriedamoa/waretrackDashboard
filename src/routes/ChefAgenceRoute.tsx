import React from "react";
import MyLink from "../components/MyLink";

const ChefAgenceRoute: React.FC = () => {
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
    <React.Fragment>
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
      {/* end user management */}

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
      {/* workstation management */}
      <li className="pc-item pc-hasmenu">
        <div className="pc-link" onClick={(e) => handleMenuToggle(e)}>
          <span className="pc-micon text-danger">
            <i className="ti ti-settings-automation" />
          </span>
          <span className="pc-mtext">POSTE DE TRAVAIL</span>
          <span className="pc-arrow">
            <i className="fa fa-chevron-right" />
          </span>
        </div>
        <ul className="pc-submenu">
          <MyLink
            label={"Ajouter un poste"}
            link={"/gfa/chef_agence/poste/create"}
          />
          <MyLink
            label="Listing des Postes"
            link="/gfa/chef_agence/poste/liste"
          />
          <MyLink
            label={"Attribution de poste"}
            link={"/gfa/chef_agence/user/poste/assign"}
          />
        </ul>
      </li>
    </React.Fragment>
  );
};

export default ChefAgenceRoute;
