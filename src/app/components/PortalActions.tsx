import { FC } from "react";
import { Button, Typography, Divider, Card } from "@mui/material";
import { FiSend, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

interface ActionHeaderProps {
  title?: string;
}

const PortalActions: FC<ActionHeaderProps> = ({
  title = "Acciones Rápidas",
}) => {
  return (
    <Card className=" bg-white w-[90vw] md:w-[60vw] p-[20px] rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <FiSend className="text-2xl text-primary" />
          <Typography variant="h5" className="font-semibold title-color">
            {title}
          </Typography>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto md:flex-row flex-col md:justify-end">
          <Link href="/transactions" className="flex-1 sm:flex-initial">
            <button
              style={{ width: "100%" }}
              className="register-button w-full sm:w-auto font-bold flex"
            >
              <FiSend className="mr-[10px]" />
              <p className="text-center w-full">Realizar transacción</p>
            </button>
          </Link>
          <Link href="/effective-anual-rate" className="flex-1 sm:flex-initial">
            <button
              style={{ width: "100%" }}
              className="account-button w-full sm:w-auto font-bold"
            >
              <FiTrendingUp className="mr-[10px]" />
              <p className="text-center w-full">Ver Rendimiento Anual</p>
            </button>
          </Link>
        </div>
      </div>
      <Divider />
    </Card>
  );
};

export default PortalActions;
