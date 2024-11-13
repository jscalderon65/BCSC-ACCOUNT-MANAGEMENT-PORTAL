"use client";
import React from "react";
import AuthGuard from "@guards/AuthGuard";
import { useSavingAccount } from "@hooks/useSavingAccount";
import LoadingAnimation from "@components/LoadingAnimation";
import SavingsAccountCard from "../components/SavingAccountCard";
import TransactionList from "../components/TransactionList";
import PortalActions from "../components/PortalActions";
import { hypnoticV1 } from "../common/helpers/patternStyles";

const MainPortal = () => {
  const { savingAccount, isLoading } = useSavingAccount();
  return (
    <AuthGuard>
      {!isLoading && savingAccount ? (
        <div
          style={hypnoticV1}
          className="main-container flex items-center pb-[40px] animate__animated animate__fadeIn"
        >
          <SavingsAccountCard savingAccount={savingAccount} />
          <br />
          <PortalActions title="Acciones Rápidas" />
          <br />
          <TransactionList accountId={savingAccount?._id || ""} />
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </AuthGuard>
  );
};

export default MainPortal;
