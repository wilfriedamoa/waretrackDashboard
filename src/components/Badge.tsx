import React from "react";

const Badge: React.FC<{ color: string; text: string }> = ({ color, text }) => {
  return (
    <span className="d-flex align-items-center gap-2">
      <i className={`fas fa-circle text-${color} f-10 m-r-5"`}></i>
      {text}
    </span>
  );
};

export default Badge;
