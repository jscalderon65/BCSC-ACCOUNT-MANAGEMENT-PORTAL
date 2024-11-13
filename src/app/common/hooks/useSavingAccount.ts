"use client";
import { useState, useEffect } from "react";
import { currentSavingAccount } from "@services/savingAccount";
import { SavingAccountI } from "@interfaces/savingAccount";
import { showCustomErrorAlert } from "../notifications/AppNotifications";

export const useSavingAccount = () => {
  const [savingAccount, setSavingAccount] = useState<SavingAccountI | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocumentTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await currentSavingAccount();
      setSavingAccount(response);
    } catch (err: any) {
      setError(err.message || "Error al cargar los datos de la cuenta");
      showCustomErrorAlert(err.message);
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
    savingAccount,
    isLoading,
    error,
    refetch,
  };
};
