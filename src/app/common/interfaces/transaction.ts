import { SavingAccountI } from "./savingAccount";

export interface TransactionStatusI {
  _id: string;
  code: string;
  name: string;
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = "outgoing" | "incoming";
export interface TransactionI {
  _id: string;
  source_account_id: SavingAccountI;
  destination_account_id: SavingAccountI;
  value: number;
  status_id: TransactionStatusI;
  description: string;
  __v: number;
  type?: TransactionType;
  createdAt: string;
  updatedAt: string;
}
