"use client";
import React from "react";
import { Card } from "@mui/material";
import {
  FaPiggyBank,
  FaChartLine,
  FaMoneyBillWave,
  FaPercentage,
} from "react-icons/fa";
import { formatToCOP } from "../common/helpers/financial";
import { useEarLiquidation } from "../common/hooks/useEarLiquidation";
import { IoMdArrowRoundBack } from "react-icons/io";

import Link from "next/link";

const SavingsGrowthDashboard = () => {
  const { lastLiquidationBase, totalInterest, averageBase, averageInterest } =
    useEarLiquidation();

  return (
    <div className="p-6  bg-white rounded-lg w-[90vw] md:w-[60vw] shadow-2">
      <h1 className="text-2xl font-bold text-gray-800">
        Crecimiento de tus Ahorros
      </h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-[20px] border-l-4 border-l-green-500">
          <div className="flex flex-row items-center justify-between ">
            <div className="text-sm font-medium text-gray-600 flex justify-between w-full align-center">
              <p>Capital Actual</p>
              <FaPiggyBank className="text-2xl  text-green-500" />
            </div>
          </div>
          <br />
          <div className="text-2xl font-bold text-gray-900">
            {formatToCOP(lastLiquidationBase)}
            <p className="text-xs text-gray-500">Base de liquidación actual</p>
          </div>
        </Card>
        <Card className="p-[20px] border-l-4 border-l-blue-500">
          <div className="flex flex-row items-center justify-between ">
            <div className="text-sm font-medium text-gray-600 flex justify-between w-full align-center">
              <p>Intereses Ganados</p>
              <FaChartLine className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <br />
          <div className="text-2xl font-bold text-gray-900">
            {formatToCOP(totalInterest)}
          </div>
          <p className="text-xs text-gray-500">Total de intereses acumulados</p>
        </Card>
        <Card className="p-[20px] border-l-4 border-l-purple-500">
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-600 flex justify-between w-full align-center">
              <p>Base Promedio</p>
              <FaMoneyBillWave className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <br />
          <div className="text-2xl font-bold text-gray-900">
            {formatToCOP(averageBase)}
          </div>
          <p className="text-xs text-gray-500">Promedio de capital base</p>
        </Card>
        <Card className="p-[20px] border-l-4 border-l-orange-500">
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-600 flex justify-between w-full align-center">
              <p>Interés Promedio</p>
              <FaPercentage className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <br />
          <div className="text-2xl font-bold text-gray-900">
            {formatToCOP(averageInterest)}
          </div>
          <p className="text-xs text-gray-500">Promedio de interés generado</p>
        </Card>
      </div>
      <br />
      <div className="text-sm text-gray-500">
        <p>
          La información mostrada corresponde a los datos reales de las últimas
          liquidaciones de intereses, que se realizan diariamente a las 10 p.m.
          Esto significa que desde el primer día que abres tu cuenta, comienzas
          a generar intereses automáticamente. La tasa de interes efectiva anual
          puede variar en el tiempo.
        </p>
        <br />
        <div className="flex md:justify-end justify-center w-full">
          <Link href="/portal">
            <button className="account-button font-bold">
              <IoMdArrowRoundBack className="mr-[10px]" />
              <p className="text-center w-full">Volver</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavingsGrowthDashboard;
