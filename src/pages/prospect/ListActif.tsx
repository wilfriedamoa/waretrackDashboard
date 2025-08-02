import React, { useEffect, useState } from "react";
import { Prospect } from "../../types/SubscriptionProps";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { noNetWork } from "../../helpers/Notification";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { BeatLoader } from "react-spinners";

const ListActif: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [datas, setData] = useState<Prospect[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    HttpClient.get(EndPoints.prospectActif)
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
    <Layout title={"Prospects Actifs"}>
      <div className="row">
        <PageCard link={""} linkText={""} title={"Listing prospects actifs"}>
          <div className="table-responsive">
            {loading ? (
              <BeatLoader />
            ) : (
              <table className="table table-hover table-borderless mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-capitalize">Noms</th>
                    <th className="text-capitalize">Prénoms</th>
                    <th className="text-capitalize">Email</th>
                    <th className="text-capitalize">Contact</th>
                    <th className="text-capitalize">Compagnie</th>
                    <th className="text-capitalize">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.firstName}</td>
                      <td>{data?.lastName}</td>
                      <td>{data?.email}</td>
                      <td>{data?.contact}</td>
                      <td>{data?.companyName}</td>
                      <td>
                        {data?.status === 1 ? (
                          <span className="badge bg-success">Actif</span>
                        ) : (
                          <span className="badge bg-danger">Inactif</span>
                        )}
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

export default ListActif;
