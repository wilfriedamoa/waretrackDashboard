import React, { ComponentState, useEffect, useState } from "react";
import { AgenceModel } from "../../models/AgenceModel";
import { IcreateAgence } from "../../types/IcreateAgence";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import { ResetError, writeErrors } from "../../helpers/Forms";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import Input from "../../components/Input";

const EditAgence = ({
  agence,
  setRefresh,
}: {
  agence: AgenceModel;
  setRefresh: ComponentState;
}) => {
  const [data, setData] = useState<IcreateAgence>({
    libelle: "",
    adresse: "",
    ville: "",
  });
  const [error, setError] = useState({
    libelle: undefined,
    adresse: undefined,
    ville: undefined,
  });

  useEffect(() => {
    setData({
      libelle: agence?.libelle,
      adresse: agence?.adresse,
      ville: agence?.ville,
    });
  }, [agence?.libelle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError({ ...ResetError(error) });
    HttpClient.post(
      EndPoints.updateAgence.replace("{agenceId}", agence.id),
      data,
    )
      .then((res) => {
        document.getElementById("closeModal")?.click();
        setRefresh((prev: number) => prev + 1);
        noticeMe(
          "success",
          `L'agence 👉${res.data?.libelle?.toLocaleUpperCase()} modifiée avec succès`,
        );
      })
      .catch((err) => {
        if (err.response === undefined) {
          noNetWork();
        } else {
          if (err.response.status === HttpStatusCode.BadRequest) {
            if (err.response.data?.status === false) {
              alertInfo("error", err.response.data?.message);
            } else {
              setError(writeErrors(error, err.response.data));
            }
          }
          if (err.response.status === HttpStatusCode.Unauthorized) {
            sessionNotice();
          }
        }
      });
  };
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Infos Agence
              </h5>
              <button
                type="button"
                id="closeModal"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <Input
                  name={"libelle"}
                  label={"Libellé agence"}
                  update={setData}
                  data={data}
                  report={error}
                />
                <Input
                  name={"adresse"}
                  label={"Adresse de l' agence"}
                  update={setData}
                  data={data}
                  report={error}
                />
                <Input
                  name={"ville"}
                  label={"Ville agence"}
                  update={setData}
                  data={data}
                  report={error}
                />
              </div>
              <div className="modal-footer">
                {/* <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                  </button> */}
                <button type="submit" className="btn btn-danger">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditAgence;
