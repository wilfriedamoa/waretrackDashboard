import React, { useState } from "react";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { AgenceModel } from "../../models/AgenceModel";
import Pagination from "../../components/Pagination";
import { BASE_API_URL, HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { BeatLoader } from "react-spinners";
import EditAgence from "./EditAgence";
import { noNetWork, sessionNotice } from "../../helpers/Notification";
import { HttpStatusCode } from "axios";

const ListAgence: React.FC = () => {
  const [agence, setAgence] = useState<AgenceModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [info, setInfo] = useState<AgenceModel>();

  const getAgences = (agenceId: string) => {
    HttpClient.get(EndPoints.infoAgence.replace("{agenceId}", agenceId))
      .then((res) => {
        setInfo(res.data);
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

  return (
    <Layout title="GESTION DES AGENCES">
      <div className="col-md-12 col-lg-12">
        <PageCard
          link={"/gfa/agence/create"}
          linkText={"Ajouter une agence"}
          title={"Liste des agences"}>
          {loading ? (
            <BeatLoader />
          ) : (
            <div className="table-responsive">
              <table className="table  table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Libelle</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Ville</th>
                    <th scope="col" className="d-flex justify-content-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agence?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-capitalize font-bold">
                        {item.libelle}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.adresse}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.ville}
                      </td>
                      <td className="d-flex justify-content-center align-items-center gap-2">
                        <button className="btn btn-outline-primary rounded btn-sm">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => getAgences(item.id)}
                          className="btn btn-warning rounded btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal">
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            setData={setAgence}
            setLoading={setLoading}
            pageUrl={`${BASE_API_URL}${EndPoints.listAgence}`}
            color="btn-outline-danger"
            refresh={refresh}
          />
        </PageCard>
        <EditAgence agence={info!} setRefresh={setRefresh} />
      </div>
    </Layout>
  );
};

export default ListAgence;
