import React, { useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import Input from "../../components/Input";
import { ResetError, writeErrors } from "../../helpers/Forms";
import { HttpClientNoToken } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { alertInfo, noNetWork } from "../../helpers/Notification";
import { useNavigate } from "react-router";
import { HttpStatusCode } from "axios";

const ChangePassword: React.FC = () => {
  useEffect(() => {
    setData({
      ...data,
      username: localStorage.getItem("username")?.toLocaleUpperCase() ?? "",
    });
  }, []);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: undefined,
    newPassword: undefined,
    username: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ ...ResetError(errors) });
    HttpClientNoToken.post(EndPoints.changePassword, data)
      .then((res) => {
        localStorage.clear();
        alertInfo("success", `${res.data?.message}. veuillez vous reconnecter`);
        navigate("/");
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status == false) {
              alertInfo("error", `${err.response.data?.message}`);
            } else {
              setErrors(writeErrors({ ...errors }, err.response.data));
            }
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <React.Fragment>
      <div className="auth-main">
        <div className="auth-wrapper v3">
          <div className="auth-form">
            <div className="auth-header">
              <a href="#">
                <img
                  src="/images/UBA-logo.png"
                  alt="img"
                  width={200}
                  height={100}
                />
              </a>
            </div>
            <div className="card my-5">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-end mb-4">
                  <h3 className="mb-0">
                    <b>Modifier votre mot de passe</b>
                  </h3>
                  {/* <a href="#" className="link-primary">
                  Don't have an account?
                </a> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <Input
                    type="password"
                    name={"oldPassword"}
                    label={"ancien mot de passe"}
                    update={setData}
                    data={data}
                    placeholder="votre ancien mot de passe"
                    report={errors}
                  />
                  <Input
                    name={"newPassword"}
                    label={"nouveau mot de passe"}
                    type="password"
                    update={setData}
                    data={data}
                    placeholder="votre nouveau mot de passe"
                    report={errors}
                  />

                  <SubmitButton
                    type="submit"
                    className="d-flex justify-content-center mt-5"
                    isLoading={isLoading}
                    classButton={"btn-danger w-100"}
                  />
                </form>
              </div>
            </div>
            <div className="auth-footer row">
              {/* <div class=""> */}
              <div className="col my-1">
                <p className="m-0">
                  Copyright © {new Date().getFullYear()}{" "}
                  <a href="#">Leader World Perfect</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
