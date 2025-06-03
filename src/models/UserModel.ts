import { AgenceModel } from "./AgenceModel";
import { RoleModel } from "./RoleModel";

export interface UserModel {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deleted: boolean;
  readonly status: number;
  readonly nom: string;
  readonly prenoms: string;
  readonly username: string;
  readonly role: RoleModel;
  readonly agence: AgenceModel;
  readonly expiredPasswordAt: string;
  readonly changedPassword: boolean;
}
