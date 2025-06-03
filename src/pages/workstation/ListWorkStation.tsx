import React, { useEffect, useState } from "react";
import Layout from "../../templates/Layout";
import { WorkStationModel } from "../../models/WorkStationModel";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import PageCard from "../../components/PageCard";
import { BeatLoader } from "react-spinners";
import EditWorkStation from "./EditWorkStation";

const ListWorkStation: React.FC = () => {
  const [postes, setPoste] = useState<WorkStationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [infoPoste, setInfoPoste] = useState<WorkStationModel>();

  useEffect(() => {
    fetchPoste();
  }, [refresh]);

  const fetchPoste = () => {
    setLoading(true);
    HttpClient.get(EndPoints.listePoste)
      .then((res) => {
        setPoste(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          } else {
            alertInfo("error", err.response.data?.message);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getPoste = (workId: string) => {
    HttpClient.get(EndPoints.infoPoste.replace("{workId}", workId))
      .then((res) => {
        setInfoPoste(res.data);
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
    <Layout title="POSTE DE TRAVAIL">
      <div className="col-md-12 col-lg-12">
        <PageCard
          link={"/gfa/chef_agence/poste/create"}
          linkText={"Ajouter un poste"}
          title={"Listing des postes"}>
          {loading ? (
            <BeatLoader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="colspan">#</th>
                    <th scope="colspan">Intitulé du poste</th>
                    <th
                      scope="colspan"
                      className="d-flex justify-content-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {postes?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.libelle}</td>
                      <td className="d-flex justify-content-center align-items-center">
                        <button
                          onClick={() => getPoste(item.id)}
                          className="btn btn-danger rounded btn-sm"
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
          <EditWorkStation poste={infoPoste!} setRefresh={setRefresh} />
        </PageCard>
      </div>
    </Layout>
  );
};

export default ListWorkStation;
