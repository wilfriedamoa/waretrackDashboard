import React, { useEffect, useState } from "react";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { BeatLoader } from "react-spinners";
import { Subscription } from "../../types/SubscriptionProps";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { noNetWork } from "../../helpers/Notification";

const ListSubscripActif: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [datas, setData] = useState<Subscription[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    HttpClient.get(EndPoints.subscriptionActif)
      .then((res) => {
        setData(res.data);
      })
      .catch((_err) => {
        noNetWork();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Layout title={"Subscriptions Actives"}>
      <div className="row">
        <PageCard link={""} linkText={""} title={"Listing souscription actif"}>
          <div className="table-responsive">
            {loading ? (
              <BeatLoader />
            ) : (
              <table className="table table-hover table-borderless mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-capitalize">Pack libelle</th>
                    <th className="text-capitalize">Pack prix</th>
                    <th className="text-capitalize">Prospect name</th>
                    <th className="text-capitalize">Prospect lastName</th>
                    <th className="text-capitalize">Prospect compagnie</th>
                    <th className="text-capitalize">Date abonnement</th>
                    <th className="text-capitalize">Date expiration</th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.pack.label}</td>
                      <td>{data?.pack.price}</td>
                      <td>{data?.prospect.firstName}</td>
                      <td>{data?.prospect.lastName}</td>
                      <td>{data?.prospect.companyName}</td>
                      <td>
                        {new Date(data?.subscriptionDate).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(data?.expiredDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </PageCard>
      </div>
    </Layout>
  );
};

export default ListSubscripActif;
