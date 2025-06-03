import { useState } from "react";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { TransfertResponse } from "../../types/TransfertResponse";
import Pagination from "../../components/Pagination";
import { BASE_API_URL, HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import { BeatLoader } from "react-spinners";

const ListTransfert = () => {
  const [transfert, setTransfert] = useState<TransfertResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const handleApprouved = (userId: string) => {
    HttpClient.get(EndPoints.acceptTransfert.replace("{userId}", userId))
      .then((res) => {
        setRefresh((prev) => prev + 1);
        noticeMe(
          "success",
          `Affectation approuvée de l'utilisateur ${res.data?.username} vers l'agence ${res?.data?.agence?.libelle}`,
        );
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status == HttpStatusCode.BadRequest) {
            alertInfo("error", err.response.data?.message);
          }
          if (err.response.status == HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  const rejectTransfert = (userId: string) => {
    HttpClient.get(EndPoints.rejectTransfert.replace("{userId}", userId))
      .then((res) => {
        setRefresh((prev) => prev + 1);
        noticeMe(
          "success",
          `Affectation rejectée de l'utilisateur ${res.data?.username} vers l'agence ${res?.data?.agence?.libelle}`,
        );
      })
      .catch((err) => {
        if (err.response == undefined) {
          noNetWork();
        } else {
          if (err.response.status == HttpStatusCode.BadRequest) {
            alertInfo("error", err.response.data?.message);
          }
          if (err.response.status == HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };

  return (
    <Layout title="GESTION DES AFFECTATIONS">
      <div className="col-md-12 col-lg-12">
        <PageCard
          link={"/gfa/transfert/init"}
          linkText={"Initier une affectation"}
          title={"Listing des affectations"}>
          {loading ? (
            <BeatLoader />
          ) : (
            <div className="table-reponsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénoms</th>
                    <th scope="col">Username</th>
                    <th scope="col">Agence Source</th>
                    <th scope="col">Agence de destination</th>
                    <th className="d-flex justify-content-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transfert?.map((item) => (
                    <tr>
                      <td>{item.user.nom}</td>
                      <td>{item.user.prenoms}</td>
                      <td>{item.user.username}</td>
                      <td>{item.agenceSource.libelle}</td>
                      <td>{item.agenceDestination.libelle}</td>
                      <td className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-success rounded btn-sm"
                          onClick={() => handleApprouved(item.user.id)}>
                          <i className="ti ti-check"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger rounded btn-sm"
                          onClick={() => rejectTransfert(item.user.id)}>
                          <i className="ti ti-circle-x"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            setData={setTransfert}
            setLoading={setLoading}
            pageUrl={`${BASE_API_URL}${EndPoints.pendingTransfert}`}
            refresh={refresh}
            color="btn-outline-danger"
          />
        </PageCard>
      </div>
    </Layout>
  );
};

export default ListTransfert;
