import React, { useState } from "react";
import { UserWorkstationModel } from "../../models/UserWorkstationModel";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/Pagination";
import { BASE_API_URL, HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  confirmOperation,
  noNetWork,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import Badge from "../../components/Badge";
import moment from "moment";

const AssignListing: React.FC = () => {
  const [userWorkstations, setUserWorkstations] = useState<
    UserWorkstationModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const disableAssigment = (assignId: string) => {
    confirmOperation("êtes-vous sûr de désactiver cette assignation?")
      .fire()
      .then((resp) => {
        if (resp.isConfirmed) {
          HttpClient.get(
            EndPoints.disableAssgin.replace("{userWorkStationId}", assignId),
          )
            .then((res) => {
              alertInfo(
                "info",
                `l'utilisateur ${res.data?.user?.username} peut se voir attribuer un poste`,
              );
              setRefresh((prev) => prev + 1);
            })
            .catch((err) => {
              if (err.response === undefined) {
                noNetWork();
              } else {
                if (err.response.status === HttpStatusCode.BadRequest) {
                  alertInfo("error", err.response.data?.message);
                } else {
                  sessionNotice();
                }
              }
            });
        }
      });
  };

  const getStatus = (status: number) => {
    switch (status) {
      case 1:
        return <Badge color={"success"} text={"Actif"} />;
        break;

      default:
        return <Badge color={"danger"} text={"Inactif"} />;
        break;
    }
  };

  return (
    <Layout title="POSTE DE TRAVAIL">
      <div className="col-md-12 col-lg-12">
        <PageCard
          link={"/gfa/chef_agence/user/poste/assign"}
          linkText={"Attribuer un poste"}
          title={"Listing des postes"}>
          {loading ? (
            <BeatLoader />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="colspan">Nom</th>
                    <th scope="colspan">Prenoms</th>
                    <th scope="colspan">Agence</th>
                    <th scope="colspan">Intitulé du poste</th>
                    <th scope="colspal">Status</th>
                    <th scope="colspal">Date</th>
                    <th
                      scope="colspan"
                      className="d-flex justify-content-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userWorkstations?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-capitalize font-bold">
                        {item.user.nom}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.user.prenoms}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.agence.libelle}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.workStation.libelle}
                      </td>
                      <td>{getStatus(item.status)}</td>
                      <td>
                        {moment(item.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td className="d-flex justify-content-center align-items-center">
                        <button
                          onClick={() => disableAssigment(item.id)}
                          disabled={item.status === 1 ? false : true}
                          className="btn btn-outline-danger btn-sm">
                          <i className="ti ti-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            setData={setUserWorkstations}
            setLoading={setLoading}
            pageUrl={`${BASE_API_URL}${EndPoints.assignList}`}
            refresh={refresh}
            color="btn-outline-danger"
          />
        </PageCard>
      </div>
    </Layout>
  );
};

export default AssignListing;
