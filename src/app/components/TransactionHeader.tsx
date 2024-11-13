import { FC } from "react";
import { Typography, Divider, Card } from "@mui/material";
import { FiCreditCard } from "react-icons/fi";

interface TransactionsHeaderProps {
  title?: string;
  totalTransactions?: number;
}

const TransactionsHeader: FC<TransactionsHeaderProps> = ({
  title = "Historial de Transacciones",
  totalTransactions,
}) => {
  return (
    <Card className="mb-[10px] bg-white w-[90vw] md:w-[60vw] p-[20px] rounded-lg shadow-3">
      <div className="flex items-center gap-3 mb-4">
        <FiCreditCard className="text-2xl text-primary" />
        <div>
          <Typography variant="h5" className="font-semibold title-color">
            {title}
          </Typography>
          {totalTransactions !== undefined && (
            <Typography variant="body2" className="text-gray-600">
              {totalTransactions} transacciones registradas
            </Typography>
          )}
        </div>
      </div>
      <Divider />
    </Card>
  );
};

export default TransactionsHeader;
