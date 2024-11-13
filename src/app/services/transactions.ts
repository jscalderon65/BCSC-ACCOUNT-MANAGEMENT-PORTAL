import {
  TransactionI,
  TransactionType,
} from "../common/interfaces/transaction";
import axiosInstance from "./axiosInstance";

export const getTransactions = async (
  type: TransactionType,
  accountId: string,
  startDate: string,
  endDate: string,
): Promise<TransactionI[]> => {
  const response = await axiosInstance.get(
    `savings-accounts-process/transaction/${type}/${accountId}?startDate=${startDate}&endDate=${endDate}`,
  );
  return response.data;
};
