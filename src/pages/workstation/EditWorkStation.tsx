import React, { ComponentState, useEffect, useState } from "react";
import { WorkStationModel } from "../../models/WorkStationModel";
import { ResetError, writeErrors } from "../../helpers/Forms";
import { HttpClient } from "../../routes/HttpClient";
import { EndPoints } from "../../routes/EndPoints";
import {
  alertInfo,
  noNetWork,
  noticeMe,
  sessionNotice,
} from "../../helpers/Notification";
import { HttpStatusCode } from "axios";
import Input from "../../components/Input";

const EditWorkStation = ({
  poste,
  setRefresh,
}: {
  poste: WorkStationModel;
  setRefresh: ComponentState;
}) => {
  const [data, setData] = useState({
    libelle: "",
    id: "",
  });
  const [errors, setErrors] = useState({
    libelle: undefined,
  });
  useEffect(() => {
    setData({
      libelle: poste?.libelle,
      id: poste?.id,
    });
  }, [poste?.id]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ ...ResetError(errors) });
    HttpClient.post(EndPoints.updatePoste, data)
      .then((res) => {
        document.getElementById("closeModal")?.click();
        setRefresh((prev: number) => prev + 1);
        noticeMe(
          "success",
          `Le poste 👉${res.data?.libelle?.toLocaleUpperCase()} modifiée avec succès`,
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
              setErrors(writeErrors(errors, err.response.data));
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
                Infos Poste
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
                  label={"Libellé du poste"}
                  update={setData}
                  data={data}
                  report={errors}
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

export default EditWorkStation;
