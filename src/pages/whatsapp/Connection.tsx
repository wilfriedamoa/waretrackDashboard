import React, { useEffect, useState } from "react";
import Layout from "../../templates/Layout";
import PageCard from "../../components/PageCard";
import { WhatsappRequest } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { noNetWork } from "../../helpers/Notification";
import Badge from "../../components/Badge";
import { BeatLoader } from "react-spinners";

const Connection: React.FC = () => {
  const [qrcode, setQrcode] = useState(undefined);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<number>(0);

  const getWhatsappQrcode = () => {
    setLoading(true);
    WhatsappRequest.get(EndPoints.whatsappConnection)
      .then((res) => {
        setQrcode(res.data?.qrcode);
      })
      .catch((err) => {
        noNetWork();
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setLoading(false);
      });

    setState((prev) => prev + 1);
  };

  const connectionState = () => {
    WhatsappRequest.get(EndPoints.whatsappConnectionState)
      .then((res) => {
        setIsConnected(res.data);
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };

  useEffect(() => {
    getWhatsappQrcode();
  }, []);

  useEffect(() => {
    connectionState();
  }, [state]);

  const status = () => {
    switch (isConnected) {
      case true:
        return <Badge color={"success"} text={"connected"} />;
        break;

      default:
        return <Badge color={"danger"} text={"disconnected"} />;
        break;
    }
  };

  return (
    <Layout title="WHATSAPP">
      <div className="col-md-6 col-lg-6">
        <PageCard title="Connexion whatsapp" link={""} linkText={""}>
          {loading ? (
            <BeatLoader />
          ) : (
            <>
              <h6 className="mb-2 f-w-400  text-2xl text-dark">Scan me 👇</h6>
              <img src={qrcode} alt="qrcode" />
              <div className="d-flex gap-2">
                <h6 className="mb-2 f-w-400  text-2xl">{status()}</h6>
                <button
                  onClick={() => getWhatsappQrcode()}
                  className="btn btn-outline-warning btn-sm">
                  <i className="ti ti-refresh"></i>
                </button>
              </div>
            </>
          )}
        </PageCard>
      </div>
    </Layout>
  );
};

export default Connection;
