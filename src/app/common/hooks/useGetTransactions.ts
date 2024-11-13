"use client";
import { useState, useEffect } from "react";
import { getTransactions } from "@services/transactions";
import { TransactionI } from "@interfaces/transaction";
import { showCustomErrorAlert } from "../notifications/AppNotifications";

export const useGetTransactions = (
  accountId: string,
  startDate: string,
  endDate: string,
) => {
  const [incomingTransactions, setIncomingTransactions] = useState<
    TransactionI[] | null
  >(null);
  const [outgoingTransactions, setOutgoingTransactions] = useState<
    TransactionI[] | null
  >(null);
  const [allTransactions, setAllTransactions] = useState<TransactionI[] | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocumentTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const getIncomingTransactions = await getTransactions(
        "incoming",
        accountId,
        startDate,
        endDate,
      );

      const getOutgoingTransactions = await getTransactions(
        "outgoing",
        accountId,
        startDate,
        endDate,
      );

      const incoming: TransactionI[] = getIncomingTransactions.map((t) => ({
        ...t,
        type: "incoming",
      }));

      const outgoing: TransactionI[] = getOutgoingTransactions.map((t) => ({
        ...t,
        type: "outgoing",
      }));

      setIncomingTransactions(incoming);

      setOutgoingTransactions(outgoing);

      const sortTransactionsByDate = (
        transactions: TransactionI[],
      ): TransactionI[] => {
        return transactions.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      };

      setAllTransactions(sortTransactionsByDate([...incoming, ...outgoing]));
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
    allTransactions,
    incomingTransactions,
    outgoingTransactions,
    isLoading,
    error,
    refetch,
  };
};
