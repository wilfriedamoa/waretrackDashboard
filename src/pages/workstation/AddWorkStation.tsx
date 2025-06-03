import React, { useState } from "react";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { ResetError, ResetForm, writeErrors } from "../../helpers/Forms";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";

const AddWorkStation: React.FC = () => {
  const [data, setData] = useState({
    libelle: "",
  });
  const [errors, setErrors] = useState({
    libelle: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...ResetError(errors) });
    HttpClient.post(EndPoints.addPoste, data)
      .then((res) => {
        setData({ ...ResetForm(data) });
        noticeMe("success", `Le poste ${res.data?.libelle} ajouté avec succès`);
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status == false) {
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
  return (
    <Layout title="POSTE DE TRAVAIL">
      <div className="col-md-6 col-lg-6">
        <PageCard
          link={"/gfa/chef_agence/poste/liste"}
          linkText={"Liste des postes"}
          title={"Ajouter un poste"}>
          <form onSubmit={handleSubmit}>
            <Input
              name={"libelle"}
              label={"Le libellé du poste"}
              update={setData}
              data={data}
              report={errors}
            />
            <SubmitButton
              isLoading={loading}
              classButton={"btn-danger"}
              type={"submit"}
              className="d-flex justify-content-center align-items-center w-30"
            />
          </form>
        </PageCard>
      </div>
    </Layout>
  );
};

export default AddWorkStation;
