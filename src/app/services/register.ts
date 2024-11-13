import { RegisterPortalProfileI } from "../common/interfaces/register";
import axiosInstance from "./axiosInstance";

export const createPortalProfile = async (
  body: RegisterPortalProfileI,
): Promise<string> => {
  const response = await axiosInstance.post(
    "customer/portal-profile/register",
    body,
  );
  return response.data._id;
};
