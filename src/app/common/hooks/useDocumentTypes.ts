"use client";
import { getDocumentTypes } from "@services/utils";
import { useState, useEffect } from "react";
import { DocumentTypeI } from "@interfaces/utils";

export const useDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentTypeI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocumentTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDocumentTypes();
      setDocumentTypes(response);
    } catch (err: any) {
      setError(err.message || "Error al cargar los tipos de documento");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const refetch = () => {
    fetchDocumentTypes();
  };

  return {
    documentTypes,
    isLoading,
    error,
    refetch,
  };
};
