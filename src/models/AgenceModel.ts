export interface AgenceModel {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deleted: boolean;
  readonly status: number;
  readonly libelle: string;
  readonly adresse: string;
  readonly ville: string;
}
