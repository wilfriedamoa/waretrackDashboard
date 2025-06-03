import React, { useState } from "react";
import { TransfertResponse } from "../../types/TransfertResponse";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/Pagination";
import { BASE_API_URL } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import Badge from "../../components/Badge";
import { UserStore } from "../../store/UserStore";
import { RoleEnum } from "../../enums/RoleEnum";

const Historic: React.FC = () => {
  const [transfert, setTransfert] = useState<TransfertResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = UserStore((set) => set.userDatas);
  const getStatus = (state: number) => {
    switch (state) {
      case 0:
        return <Badge color="danger" text="rejecter" />;
        break;
      case 1:
        return <Badge color="success" text="approuver" />;
        break;
      case -1:
        return <Badge color="warning" text="en cours" />;
      default:
        break;
    }
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
                    <th>Motifs</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfert?.map((item) => (
                    <tr>
                      <td className="text-capitalize font-bold">
                        {item.user.nom}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.user.prenoms}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.user.username}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.agenceSource.libelle}
                      </td>
                      <td className="text-capitalize font-bold">
                        {item.agenceDestination.libelle}
                      </td>
                      <td>{item.motifTransfert}</td>
                      <td>{getStatus(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            setData={setTransfert}
            setLoading={setLoading}
            pageUrl={
              userData.role === RoleEnum.AGENCY_MANAGER
                ? `${BASE_API_URL}${EndPoints.historyTransfertAgence}`
                : `${BASE_API_URL}${EndPoints.historyTransfert}`
            }
            refresh={0}
            color="btn-outline-danger"
          />
        </PageCard>
      </div>
    </Layout>
  );
};

export default Historic;
