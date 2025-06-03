import { AgenceModel } from "./AgenceModel";

export interface WorkStationModel {
  readonly id: string;
  readonly libelle: string;
  readonly agence: AgenceModel;
}
