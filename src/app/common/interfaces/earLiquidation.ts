import { SavingAccountI } from "./savingAccount";

export interface EarLiquidationI {
  _id: string;
  account_id: SavingAccountI;
  annual_effective_rate: number;
  liquidation_base: number;
  generated_interest: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
