import React from "react";
import { LinkProps } from "../types/LinkProps";

const MyLink: React.FC<LinkProps> = ({ label, link }) => {
  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    document.querySelectorAll(".pc-item").forEach((item) => {
      if (item !== e.currentTarget.closest(".pc-item")) {
        item.classList.remove("active");
      }
    });
    e.currentTarget.parentElement?.classList.add("active");
  };

  return (
    <li className={`pc-item`}>
      <a className="pc-link" href={link} onClick={(e) => handleItemClick(e)}>
        {label}
      </a>
    </li>
  );
};

export default MyLink;
