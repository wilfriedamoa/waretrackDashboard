import React from "react";

interface Iprops {
  title: string;
  value: number | string;
  color?: string;
}

const HomeCard: React.FC<Iprops> = ({ title, value, color = "primary" }) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="card shadow-lg">
        <div className="card-body">
          <h6 className="mb-2 f-w-400 text-muted">{title}</h6>
          <h4 className="mb-3">
            {value}
            <span
              className={`badge bg-light-${color} border-0 border-${color} m-2"`}>
              <i className="ti ti-users" />
            </span>
          </h4>
          <p className="mb-0 text-muted text-sm">
            You made an extra <span className={`text-${color}`}>35,000</span>{" "}
            this year
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
