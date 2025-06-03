import { AgenceModel } from "../models/AgenceModel";
import { UserModel } from "../models/UserModel";

export interface TransfertResponse {
  id: string;
  status: number;
  user: UserModel;
  agenceSource: AgenceModel;
  agenceDestination: AgenceModel;
  motifTransfert: string;
}
