import React from "react";
import { BeatLoader } from "react-spinners";

interface Iprops {
  isLoading: boolean;
  text?: string;
  classButton: string;
  className?: string;
  type: "submit" | "button" | "reset";
}

const SubmitButton: React.FC<Iprops> = ({
  isLoading,
  text,
  classButton,
  className = "d-grid mt-5",
  type = "submit",
}) => {
  return (
    <div className={`${className}`}>
      {isLoading == true ? (
        <BeatLoader />
      ) : (
        <button type={`${type}`} className={`btn ${classButton}`}>
          {text ?? "Valider"}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
