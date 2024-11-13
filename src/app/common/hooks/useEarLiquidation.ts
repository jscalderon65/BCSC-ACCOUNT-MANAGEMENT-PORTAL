"use client";
import { useState, useEffect } from "react";
import { showCustomErrorAlert } from "../notifications/AppNotifications";
import { getEarLiquidations } from "@/app/services/earLiquidation";
import { EarLiquidationI } from "../interfaces/earLiquidation";

export const useEarLiquidation = () => {
  const [earLiquidations, setEarLiquidations] = useState<
    EarLiquidationI[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageEar, setAverageEar] = useState(0);
  const [averageInterest, setAverageInterest] = useState(0);
  const [lastLiquidationBase, setLastLiquidationBase] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [averageBase, setAverageBase] = useState(0);

  const fetchDocumentTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const currentYear = new Date().getFullYear();
      const firstDayOfYear = new Date(currentYear, 0, 1)
        .toISOString()
        .split("T")[0];

      const lastDayOfYear = new Date(currentYear, 11, 31)
        .toISOString()
        .split("T")[0];

      const response = await getEarLiquidations(firstDayOfYear, lastDayOfYear);

      setEarLiquidations(response);

      const totalInterest = response.reduce(
        (acc, curr) => acc + curr?.generated_interest,
        0,
      );

      const totalBase = response.reduce(
        (acc, curr) => acc + curr?.liquidation_base,
        0,
      );

      const averageEar: number =
        response.reduce((acc, item) => acc + item.annual_effective_rate, 0) /
        response.length;

      const averageBase: number = totalBase / response.length;

      const averageInterest: number = totalInterest / response.length;

      const lastLiquidationBase: number =
        response[response.length - 1]?.liquidation_base;

      setAverageBase(averageBase);
      setTotalInterest(totalInterest);
      setAverageEar(averageEar);
      setAverageInterest(averageInterest);
      setLastLiquidationBase(lastLiquidationBase);
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
    earLiquidations,
    averageEar,
    averageBase,
    averageInterest,
    totalInterest,
    lastLiquidationBase,
    isLoading,
    refetch,
  };
};
