import React, { useEffect, useState } from "react";
import { ICreateUser } from "../../types/IcreateUser";
import PageCard from "../../components/PageCard";
import Input from "../../components/Input";
import Layout from "../../templates/Layout";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import { ResetError, ResetForm, writeErrors } from "../../helpers/Forms";
import { RoleModel } from "../../models/RoleModel";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  sessionNotice,
} from "../../helpers/Notification";
import { AgenceModel } from "../../models/AgenceModel";
import { HttpStatusCode } from "axios";
import { RoleEnum } from "../../enums/RoleEnum";
import { UserStore } from "../../store/UserStore";

const CreateUser: React.FC = () => {
  const [data, setData] = useState<ICreateUser>({
    nom: "",
    prenoms: "",
    username: "",
    role: "",
    agence: "",
  });
  useEffect(() => {
    getRoles();
    getAgences();
    findRole(data.role);
  }, [data.role]);
  const [error, setError] = useState({
    nom: undefined,
    prenoms: undefined,
    username: undefined,
    role: undefined,
    agence: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [agences, setAgences] = useState<AgenceModel[]>([]);
  const [showAgences, setShowAgences] = useState<boolean>(false);
  const userData = UserStore((set) => set.userDatas);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({ ...ResetError(error) });
    HttpClient.post(EndPoints.createUser, data)
      .then((res) => {
        setData({ ...ResetForm(data) });
        alertInfo(
          "success",
          `Utilisateur ${res.data?.user?.username} créé avec succès. Son mot de passe est:👉 ${res.data?.defaultPassword}`,
        );
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
      })
      .finally(() => {
        setLoading(false);
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
  const getAgences = () => {
    HttpClient.get(EndPoints.agences)
      .then((res) => {
        setAgences(res.data);
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
  const findRole = (id: string) => {
    const role = roles.find((role) => role.id === id);
    if (role?.libelle === RoleEnum.AGENCY_MANAGER) {
      setShowAgences(true);
      if (userData.role === RoleEnum.AGENCY_MANAGER) {
        setData({ ...data, agence: userData.agence });
      }
    } else if (role?.libelle === RoleEnum.AGENCY_EMPLOYEE) {
      setShowAgences(true);
      if (userData.role === RoleEnum.AGENCY_MANAGER) {
        setData({ ...data, agence: userData.agence });
      }
    } else {
      setShowAgences(false);
    }
  };
  return (
    <Layout title="GESTION DES UTILISATEURS">
      <div className="col-md-6">
        <PageCard
          title="Créer un utilisateur"
          link={"/gfa/user/list"}
          linkText={"List utilisateurs"}>
          <form onSubmit={handleSubmit}>
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
            />
            <Select
              data={roles}
              name={"role"}
              label={"Selectionner son rôle"}
              update={setData}
              state={data}
              fieldNames={["libelle"]}
              report={error}
            />
            {showAgences && (
              <Select
                data={agences}
                name="agence"
                label="Selectionner son agence"
                update={setData}
                state={data}
                fieldNames={["libelle"]}
                report={error}
                disable={userData.role === RoleEnum.AGENCY_MANAGER}
              />
            )}
            <SubmitButton
              isLoading={loading}
              classButton={"btn-danger"}
              className={"d-flex justify-content-center w-30 mt-5"}
              type={"submit"}
            />
          </form>
        </PageCard>
      </div>
    </Layout>
  );
};

export default CreateUser;
