import axiosInstance from "@services/axiosInstance";
import { DocumentTypeI } from "../common/interfaces/utils";

export const getDocumentTypes = async (): Promise<DocumentTypeI[]> => {
  const response = await axiosInstance.get("/utils/document-types");
  return response.data;
};
