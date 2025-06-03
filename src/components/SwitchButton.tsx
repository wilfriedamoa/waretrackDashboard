import React, { useEffect, useState } from "react";
import { SwitchProps } from "../types/SwitchProps";
import { HttpClient } from "../routes/HttpClient";
import Switch from "react-switch";

const SwitchButton: React.FC<SwitchProps> = ({ checked, url, setRefresh }) => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    setCheck(checked);
  }, [checked]);

  const handleChange = () => {
    HttpClient.get(url)
      .then((res) => {
        setCheck(res.data?.status);
        setRefresh((prev: any) => prev + 1);
      })
      .catch((err) => {
        setCheck(err?.response.data?.status);
      });
  };

  return (
    <div>
      <Switch height={20} onChange={handleChange} checked={check} />
    </div>
  );
};

export default SwitchButton;
