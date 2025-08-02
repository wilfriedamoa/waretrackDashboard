export interface Subscription {
  id: number;
  dateCreation: string;
  dateEdition: string;
  status: number;
  deleted: boolean;
  pack: Pack;
  prospect: Prospect;
  subscriptionDate: string;
  expiredDate: string;
}

export interface Pack {
  id: number;
  dateCreation: string;
  dateEdition: string;
  status: number;
  deleted: boolean;
  label: string;
  price: number;
  duration: number; // Duration in days
}

export interface Prospect {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  database: string;
  contact: string;
  address: string;
  picture: any;
  companyName: string;
  deleted: boolean;
  status: number;
  dateCreation: string;
  dateEdition: string;
}
