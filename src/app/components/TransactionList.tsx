"use client";
import { useGetTransactions } from "@hooks/useGetTransactions";
import TransactionItem from "./TransactionItem";
import TransactionsHeader from "./TransactionHeader";

type TransactionListProps = {
  accountId: string;
};

const TransactionList: React.FC<TransactionListProps> = ({ accountId }) => {
  const today = new Date();
  const startDate = new Date(
    today.setMonth(today.getMonth() - 1),
  ).toISOString();
  const endDate = new Date().toISOString();
  const { allTransactions, isLoading } = useGetTransactions(
    accountId,
    startDate,
    endDate,
  );
  return (
    <div>
      <TransactionsHeader
        title="Historial de Transacciones"
        totalTransactions={allTransactions?.length}
      />
      {allTransactions?.map((transaction) => {
        return (
          <TransactionItem key={transaction._id} transaction={transaction} />
        );
      })}
    </div>
  );
};

export default TransactionList;
