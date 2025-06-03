import React, { useState } from "react";
import { IcreateAgence } from "../../types/IcreateAgence";
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
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";

const CreateAgence: React.FC = () => {
  const [data, setData] = useState<IcreateAgence>({
    libelle: "",
    adresse: "",
    ville: "",
  });
  const [error, setError] = useState({
    libelle: undefined,
    adresse: undefined,
    ville: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({ ...ResetError(error) });
    HttpClient.post(EndPoints.createAgence, data)
      .then((res) => {
        setData({ ...ResetForm(data) });
        alertInfo("success", `Agence ${res.data?.libelle} créée avec succès`);
      })
      .catch((err) => {
        if (err.response === undefined) {
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
  return (
    <Layout title="GESTION DES AGENCES">
      <div className="col-md-6 col-lg-6">
        <PageCard
          title="CREATION D'UNE AGENCE"
          link="/gfa/agence/list"
          linkText="Liste des agences">
          <form onSubmit={handleSubmit}>
            <Input
              name={"libelle"}
              label={"Libellé agence"}
              update={setData}
              data={data}
              report={error}
            />
            <Input
              name={"adresse"}
              label={"Adresse de l' agence"}
              update={setData}
              data={data}
              report={error}
            />
            <Input
              name={"ville"}
              label={"Ville agence"}
              update={setData}
              data={data}
              report={error}
            />
            <SubmitButton
              isLoading={loading}
              classButton={"btn-danger"}
              className="d-flex justify-content-center w-30 mt-5"
              type={"submit"}
            />
          </form>
        </PageCard>
      </div>
    </Layout>
  );
};

export default CreateAgence;
