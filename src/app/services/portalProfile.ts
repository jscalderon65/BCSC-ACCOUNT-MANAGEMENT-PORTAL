import axiosInstance from "@services/axiosInstance";
import { LoginBodyI } from "@interfaces/login";

export const loginService = async (body: LoginBodyI): Promise<string> => {
  const response = await axiosInstance.post(
    "/customer/portal-profile/login",
    body,
  );
  return response.data;
};
