import React from "react";
import AuthGuard from "../common/guards/AuthGuard";
import { hypnoticV1 } from "../common/helpers/patternStyles";
import { Card, CardHeader, CardContent, Button } from "@mui/material";
import { GoAlert } from "react-icons/go";
import { MdOutlineHome } from "react-icons/md";
import Link from "next/link";

const Transactions = () => {
  return (
    <AuthGuard>
      <div
        style={hypnoticV1}
        className="main-container  animate__animated animate__fadeIn"
      >
        <div className="flex justify-center items-center h-screen">
          <Card className="w-full max-w-md">
            <CardHeader
              title="Funcionalidad No Disponible"
              className="bg-red-500 text-white"
            />
            <CardContent className="text-center">
              <GoAlert className="text-6xl text-red-500 mb-4" />
              <p>
                Lo sentimos, esta funcionalidad no está disponible en este
                momento. Estamos trabajando para restaurarla a la brevedad
                posible.
              </p>
              <br />
              <p>
                Pd: No alcance a programar esta funcionalidad, pero cree todos
                los endpoints necesarios para crear y observar transacciones
                entre cuentas.
              </p>
              <br />
              <div className="mt-4">
                <Link href="/portal">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MdOutlineHome />}
                  >
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Transactions;
