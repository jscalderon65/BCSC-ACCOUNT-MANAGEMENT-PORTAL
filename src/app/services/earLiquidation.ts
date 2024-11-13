import { EarLiquidationI } from "../common/interfaces/earLiquidation";
import axiosInstance from "./axiosInstance";

export const getEarLiquidations = async (
  startDate: string,
  endDate: string,
): Promise<EarLiquidationI[]> => {
  const response = await axiosInstance.get(
    `/ear-liquidation/me?startDate=${startDate}&endDate=${endDate}`,
  );
  return response.data;
};
