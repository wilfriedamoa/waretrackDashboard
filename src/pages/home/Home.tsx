import React, { useEffect } from "react";
import Layout from "../../templates/Layout";
import HomeCard from "../../components/HomeCard";
import { StatProps } from "../../types/StatProps";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import PageCard from "../../components/PageCard";
import { PaymentProps } from "../../types/PaymentProps";
import { BeatLoader } from "react-spinners";
import { noNetWork } from "../../helpers/Notification";

const Home: React.FC = () => {
  const [datas, setDatas] = React.useState<StatProps>({
    totalSubscriptions: 0,
    totalProspects: 0,
    inactiveProspects: 0,
    activeProspects: 0,
    totalPayments: 0,
    totalAbonnes: 0,
  });

  const [payments, setPayments] = React.useState<PaymentProps[]>([]);
  const [loading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetchData();
    fetchPayments();
  }, []);

  const fetchData = () => {
    HttpClient.get(EndPoints.stats)
      .then((res) => {
        setDatas({
          totalSubscriptions: res.data?.totalSubscriptions,
          totalProspects: res.data?.totalProspects,
          inactiveProspects: res.data?.inactiveProspects,
          activeProspects: res.data?.activeProspects,
          totalPayments: res.data?.totalPayments,
          totalAbonnes: res.data?.totalAbonnes,
        });
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  };

  const fetchPayments = () => {
    HttpClient.get(EndPoints.payment)
      .then((res) => {
        setPayments(res.data);
      })
      .catch((_err) => {
        noNetWork();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout title="Home">
      <div className="row">
        <HomeCard
          title={"Total Abonnés"}
          value={datas.totalAbonnes}
          color="warning"
          comment="Nombre total d'abonnés actifs."
          icon={"ti ti-users"}
        />
        <HomeCard
          title={"Total Prospects"}
          value={datas.totalProspects}
          color="primary"
          comment="Nombre total de prospects enregistrés."
          icon={"ti ti-user"}
        />
        <HomeCard
          title={"Total Prospects Inactifs"}
          value={datas.inactiveProspects}
          color="warning"
          comment="Nombre de prospects qui n'ont pas été actifs récemment."
          icon={"ti ti-user-off"}
        />
        <HomeCard
          title={"Total Prospects Actifs"}
          value={datas.activeProspects}
          color="success"
          comment="Nombre de prospects actuellement actifs."
          icon={"ti ti-user-check"}
        />
        <HomeCard
          title={"Total Payments"}
          value={datas.totalPayments}
          color="success"
          comment="Montant total des paiements effectués."
          icon={"ti ti-wallet"}
        />
        <HomeCard
          title={"Total Souscripteurs"}
          value={datas.totalSubscriptions}
          color="info"
          comment="Nombre total de souscripteurs"
          icon={"ti ti-user"}
        />
      </div>

      {/* payments listing*/}
      <div className="row mt-4">
        <PageCard link={""} linkText={""} title={"Listing des paiements"}>
          <div className="table-responsive">
            {loading ? (
              <BeatLoader />
            ) : (
              <table className="table table-hover table-borderless mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-capitalize">TransactionId</th>
                    <th className="text-capitalize">Montant</th>
                    <th className="text-capitalize">Device</th>
                    <th className="text-capitalize">Status</th>
                    <th className="text-capitalize">methode de paiement</th>
                    <th className="text-capitalize">Date de paiement</th>
                    <th className="text-capitalize">pack</th>
                    <th className="text-capitalize">prospect</th>
                    <th className="text-capitalize">Date abonnement</th>
                    <th className="text-capitalize">
                      Date expiration abonnement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.map((payment, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{payment.transaction_id}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.currency}</td>
                      <td>
                        {payment.message === "SUCCES" ? (
                          <span className="badge bg-success">
                            {payment.message}
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            {payment.message}
                          </span>
                        )}
                      </td>
                      <td>{payment.payment_method}</td>
                      <td>
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </td>
                      <td>{payment.subscription.pack.label}</td>
                      <td>{`${payment.subscription.prospect.firstName} ${payment.subscription.prospect.lastName}`}</td>
                      <td>
                        {new Date(
                          payment.subscription.subscriptionDate,
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(
                          payment.subscription.expiredDate,
                        ).toLocaleDateString()}
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

export default Home;
