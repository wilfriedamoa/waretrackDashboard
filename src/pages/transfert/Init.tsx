import React, { useEffect, useState } from "react";
import { ITransfert } from "../../types/ITransfert";
import { UserModel } from "../../models/UserModel";
import { AgenceModel } from "../../models/AgenceModel";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import { ResetError, ResetForm, writeErrors } from "../../helpers/Forms";
import { UserStore } from "../../store/UserStore";
import { RoleEnum } from "../../enums/RoleEnum";

const Init: React.FC = () => {
  const [data, setData] = useState<ITransfert>({
    user: "",
    agenceDestination: "",
    motifTransfert: "",
  });
  const [error, setError] = useState({
    user: undefined,
    agenceDestination: undefined,
    motifTransfert: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [agences, setAgences] = useState<AgenceModel[]>([]);
  const userStore = UserStore((set) => set.userDatas);

  useEffect(() => {
    fetchUser();
    getAgences();
  }, []);

  const fetchUser = () => {
    HttpClient.get(EndPoints.agencyUsers)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            alertInfo("error", err.response.data?.message);
          }
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({ ...ResetError(error) });
    HttpClient.post(EndPoints.initTransfert, data)
      .then((res) => {
        setData({ ...ResetForm(data) });
        noticeMe(
          "success",
          `${
            userStore.role === RoleEnum.ADMIN || RoleEnum.SUPER_ADMIN
              ? `Transfert de l'utilisateur ${res.data?.user?.username} vers l'agence ${res.data?.agenceDestination?.libelle} effectué avec succès`
              : `Transfert de l'utilisateur ${res.data?.user?.username} vers l'agence ${res.data?.agenceDestination?.libelle} effectué avec succès envoie pour validation`
          }`,
        );
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status == false) {
              alertInfo("error", err.response.data?.message);
            } else {
              setError(writeErrors(error, err.response.data));
            }
          } else {
            if (err.response.status === HttpStatusCode.Unauthorized) {
              sessionNotice();
            }
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout title="GESTION DES AFFECTATIONS">
      <div className="col-md-6 col-lg-6">
        <PageCard
          title="Initier une affectation"
          link={"/gfa/transfert/pending"}
          linkText={"Affections en cours"}>
          <form onSubmit={handleSubmit}>
            <Select
              data={users}
              name={"user"}
              label={"Seletionner l'utilisateur"}
              update={setData}
              state={data}
              fieldNames={["nom", "prenoms"]}
              report={error}
            />
            <Select
              data={agences}
              name={"agenceDestination"}
              label={"Seletionner l'agence de destination"}
              update={setData}
              state={data}
              fieldNames={["libelle"]}
              report={error}
            />
            <Input
              name={"motifTransfert"}
              label={"Motif"}
              update={setData}
              data={data}
              placeholder="motif du transfert"
              report={error}
            />
            <SubmitButton
              isLoading={loading}
              classButton={"btn btn-danger"}
              className="d-flex justify-content-center mt-5"
              type={"submit"}
            />
          </form>
        </PageCard>
      </div>
    </Layout>
  );
};

export default Init;
