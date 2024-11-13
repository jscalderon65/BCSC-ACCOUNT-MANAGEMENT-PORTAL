import { PortalProfileI } from "@interfaces/portalProfile";

export interface SavingAccountI {
  _id: string;
  customer_id: PortalProfileI;
  balance: number;
  is_active: boolean;
  account_number: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewSavingAccountI {
  balance: number;
  is_active: boolean;
}
