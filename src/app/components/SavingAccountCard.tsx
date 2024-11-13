import React from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import {
  FaRegCopy,
  FaRegEye,
  FaRegEyeSlash,
  FaCreditCard,
} from "react-icons/fa";
import { SavingAccountI } from "@interfaces/savingAccount";
import { formatToCOP } from "@helpers/financial";
type SavingsAccountCardProps = {
  savingAccount: SavingAccountI | null;
};

const SavingsAccountCard: React.FC<SavingsAccountCardProps> = ({
  savingAccount,
}) => {
  const [showBalance, setShowBalance] = React.useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="md:w-[50vw] w-[90vw] from-blue-950 to-blue-700 text-white max-w-2xl mx-auto  shadow-xl mt-[40px] ">
      <CardContent className="p-[20px]">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <p className="text-gray-300 text-sm title-color">
              Cuenta de Ahorros
            </p>
            <h2 className="text-2xl font-semibold">Banco Caja Social</h2>
          </div>
          <FaCreditCard className="w-8 h-8 title-color" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-300 text-sm mb-1  title-color">
              Titular de la Cuenta
            </p>
            <p className="text-xl font-medium">
              {savingAccount?.customer_id.first_name}{" "}
              {savingAccount?.customer_id.last_name}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1  title-color">
                Número de Cuenta
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-medium">
                  {" "}
                  {savingAccount?.account_number}
                </p>
                <IconButton
                  onClick={() =>
                    copyToClipboard(savingAccount?.account_number || "")
                  }
                  className="text-gray-300 hover:bg-white/10"
                  size="small"
                >
                  <FaRegCopy className="w-4 h-4" />
                </IconButton>
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-300 text-sm mb-1  title-color">
                Saldo Disponible
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold">
                  {showBalance
                    ? formatToCOP(Number(savingAccount?.balance))
                    : "$ ∗∗∗∗∗∗∗"}
                </p>
                <IconButton
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-300 hover:bg-white/10"
                  size="small"
                >
                  {showBalance ? (
                    <FaRegEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaRegEye className="w-4 h-4" />
                  )}
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid-cols-3 gap-4 text-center w-full flex justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1  title-color">
                Tipo de Cuenta
              </p>
              <p className="font-medium">Ahorros</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm mb-1  title-color">Estado</p>
              <p className="font-medium text-green-400">Activa</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsAccountCard;
