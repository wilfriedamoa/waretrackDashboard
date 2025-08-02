import React, { useState } from "react";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { formatErrors, ResetError } from "../../helpers/Forms";
import { HttpClientNoToken } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { RequestError } from "../../types/RequestError";
import { noNetWork, noticeMe } from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router";
import { UserStore } from "../../store/UserStore";

const Login: React.FC = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: undefined,
    password: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<RequestError>({
    status: false,
    message: undefined,
  });

  const navigate = useNavigate();
  const initUserDatas = UserStore((set) => set.setUserDatas);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ ...ResetError(errors) });
    setRequestError({ ...ResetError(requestError) });
    HttpClientNoToken.post(EndPoints.login, data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data?.accessToken);
        initUserDatas({
          email: res.data?.email,
          username: res.data?.username,
        });
        noticeMe("success", `Bonjour ${res.data?.username}`);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            formatErrors(err.response.data?.errors, setErrors);
          } else {
            setRequestError({
              status: false,
              message: "username ou mot de passe incorrect",
            });
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth-main">
      <div className="auth-wrapper v3">
        <div className="auth-form">
          <div className="auth-header">
            <a href="#">
              <img
                src="https://app.waretrack.online/assets/logo-waretrack-1b57eb0a.png"
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
                  <b>Connexion</b>
                </h3>
                {/* <a href="#" className="link-primary">
                  Don't have an account?
                </a> */}
              </div>
              {requestError.message != undefined && (
                <div className="alert alert-danger" role="alert">
                  {requestError.message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name={"username"}
                  label={"Username"}
                  update={setData}
                  data={data}
                  placeholder="votre nom utilisateur"
                  report={errors}
                />
                <Input
                  name={"password"}
                  label={"Mot de passe"}
                  type="password"
                  update={setData}
                  data={data}
                  placeholder="votre mot de passe"
                  report={errors}
                />

                <SubmitButton
                  type="submit"
                  className="d-flex justify-content-center mt-5"
                  isLoading={isLoading}
                  classButton={"btn-primary w-100"}
                />
              </form>
            </div>
          </div>
          <div className="auth-footer row">
            {/* <div class=""> */}
            <div className="col my-1">
              <p className="m-0">
                Copyright © {new Date().getFullYear()} <a href="#">ESODEV</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
