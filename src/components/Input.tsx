import React, { useEffect, useState } from "react";
import { InputProps } from "../types/InputProps";

const Input: React.FC<InputProps> = ({
  data,
  update,
  name,
  label,
  report,
  placeholder = "",
  type = "text",
  disable = false,
  min,
  max,
}) => {
  const [field, setField] = useState("");
  useEffect(() => {
    const stateVal = { ...data };

    setField(stateVal[name]);
  }, [data, report]);

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    const value: string = e.currentTarget.value;
    const stateVal = { ...data };
    stateVal[name] = value;
    update(stateVal);
    setField(value);
  }

  return (
    <div className="form-group mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        disabled={disable}
        placeholder={placeholder}
        className="form-control"
        value={field}
        onChange={onChange}
        id={name + "input"}
        min={min}
        max={max}
        name={name}
      />
      {report != undefined && report[name] != undefined && (
        <small className="form-text text-danger font-bold">
          {report[name]}
        </small>
      )}
    </div>
  );
};

export default Input;
