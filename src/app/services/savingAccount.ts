import axiosInstance from "./axiosInstance";

export const currentSavingAccount = async (): Promise<any> => {
  const response = await axiosInstance.get("/savings-accounts/me");
  return response.data;
};
