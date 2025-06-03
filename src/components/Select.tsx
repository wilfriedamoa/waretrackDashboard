import React, { useEffect, useState } from "react";
import { SelectProps } from "../types/SelectProps";

const Select: React.FC<SelectProps> = ({
  name,
  label,
  data,
  fieldNames,
  state,
  update,
  report,
  disable = false,
  id = undefined,
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const stateVal = { ...state };
    setInput(stateVal[name]);
  }, [state]);

  const onChange = (e: any) => {
    const val = e.currentTarget.value;
    const oldData = { ...state };
    oldData[name] = val;
    setInput(val);
    update(oldData);
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label" htmlFor={"sel" + name}>
        {label}
      </label>
      <select
        value={input}
        onChange={onChange}
        disabled={disable}
        className="form-control"
        id={"sel" + name}>
        <option hidden disabled key={0} value={""}>
          Veuillez choisir
        </option>
        {data.map((val) => {
          let libelle: string = "";
          const idValue = id == undefined ? val.id : val[id];

          //libelle +=  fieldNames.map(field => val[field]) + " ";
          fieldNames.forEach((lib) => {
            libelle += val[lib] + " ";
          });
          return (
            <option key={idValue} value={idValue}>
              {libelle.trim()}
            </option>
          );
        })}
      </select>
      {report != undefined && report[name] != undefined && (
        <small className="form-text text-danger">{report[name]}</small>
      )}
    </div>
  );
};

export default Select;
