import { AgenceModel } from "./AgenceModel";
import { UserModel } from "./UserModel";
import { WorkStationModel } from "./WorkStationModel";

export interface UserWorkstationModel {
  readonly id: string;
  readonly user: UserModel;
  readonly workStation: WorkStationModel;
  readonly agence: AgenceModel;
  readonly status: number;
  readonly updatedAt: string;
}
