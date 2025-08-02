import React from "react";

interface Iprops {
  title: string;
  value: number | string;
  color?: string;
  comment?: string;
  icon: string;
}

const HomeCard: React.FC<Iprops> = ({
  title,
  value,
  color = "primary",
  comment,
  icon,
}) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="card shadow-lg">
        <div className="card-body">
          <h6 className="mb-2 f-w-400 text-muted">{title}</h6>
          <h4 className="mb-3">
            {value}
            <span
              className={`badge bg-light-${color} border-0 border-${color} m-2`}>
              <i className={icon} />
            </span>
          </h4>
          <p className="mb-0 text-muted text-sm">
            {comment ? comment : "No additional information available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
