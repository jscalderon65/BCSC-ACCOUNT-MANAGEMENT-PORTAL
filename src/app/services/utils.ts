import axiosInstance from "@services/axiosInstance";

export const getDocumentTypes = async (): Promise<any> => {
  const response = await axiosInstance.get("/utils/document-types");
  return response.data;
};
