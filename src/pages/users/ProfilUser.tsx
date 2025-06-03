import React, { useEffect, useState } from "react";

import { HttpClient } from "../../routes/HttpClient";
import { noNetWork, sessionNotice } from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import Layout from "../../templates/Layout";
import { EndPoints } from "../../routes/EndPoints";
import PageCard from "../../components/PageCard";
import { ICreateUser } from "../../types/IcreateUser";
import Input from "../../components/Input";

import { BeatLoader } from "react-spinners";

const ProfilUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICreateUser>({
    nom: "",
    prenoms: "",
    username: "",
    role: "",
    agence: "",
  });

  const [error, _setError] = useState({
    nom: undefined,
    prenoms: undefined,
    username: undefined,
    role: undefined,
    agence: undefined,
  });

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = () => {
    setLoading(true);
    HttpClient.get(EndPoints.profilUser)
      .then((res) => {
        setData({
          nom: res.data?.nom,
          prenoms: res.data?.prenoms,
          username: res.data?.username,
          role: res.data.role?.libelle,
          agence: res.data?.agence?.libelle,
        });
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
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
    <Layout title="PROFIL UTILISATEUR">
      <div className="col-md-6 col-lg-6">
        <PageCard link={""} linkText={""} title={"Mon profil"}>
          {loading ? (
            <BeatLoader />
          ) : (
            <form>
              <Input
                name={"nom"}
                label={"Nom"}
                update={setData}
                data={data}
                placeholder="le nom de l'utilisateur"
                report={error}
                disable={true}
              />
              <Input
                name={"prenoms"}
                label={"Prénoms"}
                update={setData}
                data={data}
                placeholder="le prénoms de l'utilisateur"
                report={error}
                disable={true}
              />
              <Input
                name={"username"}
                label={"username"}
                update={setData}
                data={data}
                placeholder="le nom utilisateur"
                report={error}
                disable={true}
              />
              <Input
                name={"role"}
                label={"Rôle"}
                update={setData}
                data={data}
                placeholder="le rôle de l'utilisateur"
                report={error}
                disable={true}
              />
              {data.agence != null && (
                <Input
                  name={"agence"}
                  label={"agence"}
                  update={setData}
                  data={data}
                  report={error}
                />
              )}
            </form>
          )}
        </PageCard>
      </div>
    </Layout>
  );
};

export default ProfilUser;
