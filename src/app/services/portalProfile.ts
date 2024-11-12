import axiosInstance from "@services/axiosInstance";
import { LoginBodyI, TwoFaBodyI } from "@interfaces/login";

export const loginService = async (body: LoginBodyI): Promise<string> => {
  const response = await axiosInstance.post(
    "/customer/portal-profile/login",
    body,
  );
  return response.data;
};

export const validateTwoFaNumber = async (
  body: TwoFaBodyI,
  temporalToken: string,
): Promise<string> => {
  const response = await axiosInstance.post(
    "/customer/portal-profile/validate-2fa",
    body,
    {
      headers: {
        Authorization: `Bearer ${temporalToken}`,
      },
    },
  );
  return response.data;
};

export const currentPortalProfile = async (token: string): Promise<any> => {
  const response = await axiosInstance.get("/customer/portal-profile/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
