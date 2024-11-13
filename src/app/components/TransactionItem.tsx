import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { FiArrowUpRight, FiArrowDownLeft, FiClock } from "react-icons/fi";
import {
  formatToCOP,
  formatTransactionDate,
} from "../common/helpers/financial";
import { TransactionI } from "../common/interfaces/transaction";

const TransactionItem: FC<{ transaction: TransactionI }> = ({
  transaction,
}) => {
  return (
    <Card className="p-4 mb-[10px] w-[90vw] md:w-[60vw]">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {transaction.type === "incoming" ? (
            <FiArrowDownLeft className="text-green-500 text-xl" />
          ) : transaction.type === "outgoing" ? (
            <FiArrowUpRight className="text-red-500 text-xl" />
          ) : (
            <FiClock className="text-gray-500 text-xl" />
          )}
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start gap-4">
            <Typography
              variant="subtitle1"
              className="font-medium leading-snug break-words"
              style={{
                maxWidth: "calc(100% - 120px)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {transaction.description}
            </Typography>
            <Typography
              variant="subtitle1"
              className={`font-medium flex-shrink-0 ${
                transaction.type === "incoming"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatToCOP(transaction.value)}
            </Typography>
          </div>

          <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
            <span>
              Cuenta:{" "}
              {transaction.type === "outgoing"
                ? transaction.destination_account_id.account_number
                : transaction.source_account_id.account_number}
            </span>
            <span className="flex-shrink-0">
              {formatTransactionDate(transaction.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionItem;
