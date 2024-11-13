import { NewSavingAccountI } from "../common/interfaces/savingAccount";
import axiosInstance from "./axiosInstance";

export const currentSavingAccount = async (): Promise<any> => {
  const response = await axiosInstance.get("/savings-accounts/me");
  return response.data;
};

export const createSavingAccount = async (
  customer_id: string,
  body: NewSavingAccountI,
): Promise<any> => {
  const response = await axiosInstance.post("/savings-accounts/", {
    ...body,
    customer_id,
  });
  return response.data;
};
