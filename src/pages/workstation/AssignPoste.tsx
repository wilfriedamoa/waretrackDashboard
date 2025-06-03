import React, { useEffect, useState } from "react";
import Layout from "../../templates/Layout";
import { UserModel } from "../../models/UserModel";
import { WorkStationModel } from "../../models/WorkStationModel";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import PageCard from "../../components/PageCard";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import { ResetError, ResetForm, writeErrors } from "../../helpers/Forms";

const AssignPoste: React.FC = () => {
  const [data, setData] = useState({
    user: "",
    workStation: "",
  });
  const [errors, setErrors] = useState({
    user: undefined,
    workStation: undefined,
  });
  const [users, setUsers] = useState<UserModel[]>([]);
  const [workStations, setWorkStations] = useState<WorkStationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const getUser = () => {
    HttpClient.get(EndPoints.userNotAssign)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  const fetchPoste = () => {
    HttpClient.get(EndPoints.posteNotBusy)
      .then((res) => {
        setWorkStations(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...ResetError(errors) });
    HttpClient.post(EndPoints.assignWorkStation, data)
      .then((res) => {
        setData({ ...ResetForm(data) });
        setRefresh((prev) => prev + 1);
        noticeMe(
          "success",
          `utilisateur ${res.data?.user?.username} occupe le poste 👉  ${res.data?.workStation?.libelle}`,
        );
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status === false) {
              alertInfo("error", err.response.data?.message);
            } else {
              setErrors(writeErrors(errors, err.response.data));
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

  useEffect(() => {
    fetchPoste();
    getUser();
  }, [refresh]);

  return (
    <Layout title="POSTE DE TRAVAIL">
      <div className="col-md-6 col-lg-6">
        <PageCard
          link={"/gfa/chef_agence/user/poste/assign/list"}
          linkText={"Les attributions de poste"}
          title={"Attribution de poste"}>
          <form onSubmit={handleSubmit}>
            <Select
              data={users}
              name={"user"}
              label={"Selectionnez un utilisateur"}
              update={setData}
              state={data}
              fieldNames={["nom", "prenoms"]}
              report={errors}
            />
            <Select
              data={workStations}
              name={"workStation"}
              label={"Selectionnez un poste"}
              update={setData}
              state={data}
              fieldNames={["libelle"]}
              report={errors}
            />
            <SubmitButton
              isLoading={loading}
              className="d-flex justify-content-center align-items-center"
              classButton={"btn-danger"}
              type={"submit"}
            />
          </form>
        </PageCard>
      </div>
    </Layout>
  );
};

export default AssignPoste;
