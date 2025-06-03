import React, { useState } from "react";
import { UserModel } from "../../models/UserModel";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { BASE_API_URL, HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import SwitchButton from "../../components/SwitchButton";
import {
  alertInfo,
  confirmOperation,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import moment from "moment";
import { HttpStatusCode } from "axios";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { RoleModel } from "../../models/RoleModel";
import { ResetError, writeErrors } from "../../helpers/Forms";
import { UserStore } from "../../store/UserStore";
import { RoleEnum } from "../../enums/RoleEnum";

const ListUser: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [data, setData] = useState<any>({
    nom: "",
    prenoms: "",
    username: "",
    role: "",
  });
  const [error, setError] = useState<any>({
    nom: undefined,
    prenoms: undefined,
    username: undefined,
    role: undefined,
  });

  const userData = UserStore((set) => set.userDatas);

  const [roles, setRoles] = useState<RoleModel[]>([]);
  const getSatatus = (status: number) => {
    switch (status) {
      case 0:
        return <Badge color="danger" text="Inactif" />;
      case 1:
        return <Badge color="success" text="Actif" />;
      case -1:
        return <Badge color="warning" text="En cours de transfert" />;
      default:
        return "Inconnu";
    }
  };

  const generatePassword = (userId: string) => {
    confirmOperation(
      "Êtes-vous sûr de vouloir générer un mot de passe pour cet utilisateur ?",
    )
      .fire()
      .then((res) => {
        if (res.isConfirmed) {
          HttpClient.get(EndPoints.generatePwd.replace("{userId}", userId))
            .then((res) => {
              alertInfo(
                "success",
                `Mot de passe généré est 👉 ${
                  res.data?.defaultPassword
                } date d'expiration: ${moment(res.data?.user?.expiredPasswordAt)
                  .locale("fr")
                  .format("DD/MM/yyyy HH:mm:ss")}`,
              );
            })
            .catch((err) => {
              if (err.response == undefined) {
                noNetWork();
              } else {
                if (err.response.status === HttpStatusCode.BadRequest) {
                  noticeMe(
                    "error",
                    "Erreur lors de la génération du mot de passe, veuillez réessayer plus tard.",
                  );
                }
                if (err.response.status === HttpStatusCode.Unauthorized) {
                  sessionNotice();
                }
              }
            });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la confirmation de l'opération :", error);
      });
  };

  const fetchUser = (userId: string) => {
    HttpClient.get(EndPoints.userInfo.replace("{userId}", userId))
      .then((res) => {
        setData({
          nom: res.data.nom,
          prenoms: res.data.prenoms,
          username: res.data.username,
          role: res.data.role.id,
        });
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  const getRoles = () => {
    HttpClient.get(
      userData.role === RoleEnum.AGENCY_MANAGER
        ? EndPoints.roleExceptGroupAdmin
        : EndPoints.roleExceptSuperAdminAndAgencyemployee,
    )
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        if (err.response == undefined) {
          console.log("no network");
          noNetWork();
        } else {
          sessionNotice();
        }
      });
  };

  const handleFetchUsers = (userId: string) => {
    fetchUser(userId);
    getRoles();
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError({ ...ResetError(error) });
    HttpClient.post(EndPoints.updateUser, data)
      .then((_res) => {
        setRefresh((prev) => prev + 1);
        document.getElementById("closeModal")?.click();
        noticeMe("success", "Utilisateur modifié avec succès.");
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status === false) {
              alertInfo("error", err.response.data?.message);
            } else {
              setError(writeErrors(error, err.response.data));
            }
          }
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  return (
    <React.Fragment>
      <Layout title="GESTION DES UTILISATEURS">
        <div className="col-md-12 col-lg-12">
          <PageCard
            title="Liste des utilisateurs"
            link="/gfa/user/create"
            linkText="Ajouter un utilisateur">
            {loading ? (
              <BeatLoader />
            ) : (
              <div className="table-responsive">
                <table className="table  table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Username</th>
                      <th>Rôle</th>
                      <th>Agence</th>
                      <th>Status</th>
                      <th className="d-flex justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="text-capitalize font-bold">
                          {user.nom}
                        </td>
                        <td className="text-capitalize font-bold">
                          {user.prenoms}
                        </td>
                        <td className="text-capitalize font-bold">
                          {user.username}
                        </td>
                        <td className="text-capitalize font-bold">
                          {user.role.libelle}
                        </td>
                        <td className="text-capitalize font-bold">
                          {user.agence?.libelle ?? "--------"}
                        </td>
                        <td>{getSatatus(user?.status)}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button
                              onClick={() => handleFetchUsers(user.id)}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              className="btn btn-outline-primary btn-sm">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => generatePassword(user.id)}
                              className="btn btn-outline-warning btn-sm">
                              <i className="fas fa-lock"></i>
                            </button>
                            <SwitchButton
                              checked={user.status == 0 ? false : true}
                              url={EndPoints.enableOrDisableUser.replace(
                                "{userId}",
                                user.id,
                              )}
                              setRefresh={setRefresh}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination
              setData={setUsers}
              setLoading={setLoading}
              pageUrl={
                userData.role === RoleEnum.AGENCY_MANAGER
                  ? `${BASE_API_URL}${EndPoints.getUserByChefagence}`
                  : `${BASE_API_URL}${EndPoints.listUser}`
              }
              color="btn-outline-danger"
              refresh={refresh}
            />
          </PageCard>
        </div>
        {/* edit user model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Infos utilisateur
                </h5>
                <button
                  type="button"
                  id="closeModal"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <form onSubmit={handleUpdateUser}>
                <div className="modal-body">
                  <Input
                    name={"nom"}
                    label={"Nom"}
                    update={setData}
                    data={data}
                    placeholder="le nom de l'utilisateur"
                    report={error}
                  />
                  <Input
                    name={"prenoms"}
                    label={"Prénoms"}
                    update={setData}
                    data={data}
                    placeholder="le prénoms de l'utilisateur"
                    report={error}
                  />
                  <Input
                    name={"username"}
                    label={"username"}
                    update={setData}
                    data={data}
                    placeholder="le nom utilisateur"
                    report={error}
                    disable={true}
                  />
                  <Select
                    data={roles}
                    name={"role"}
                    label={"Rôle"}
                    update={setData}
                    state={data}
                    fieldNames={["libelle"]}
                    report={error}
                  />
                </div>
                <div className="modal-footer">
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                  </button> */}
                  <button type="submit" className="btn btn-danger">
                    Modifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default ListUser;
