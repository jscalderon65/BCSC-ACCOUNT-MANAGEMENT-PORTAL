"use client";
import React, { useState } from "react";
import { LoginBodyI, TwoFaBodyI } from "../common/interfaces/login";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../common/hooks/localStorage";
import { CLIENT_TOKEN_STORAGE_NAME } from "../common/constants/appConfig";
import { validateTwoFaNumber } from "../services/portalProfile";
import { Alert, AlertTitle, TextField } from "@mui/material";

type TwoFaFormProps = {
  loginData: LoginBodyI;
  temporalToken: string;
};

const TwoFaForm: React.FC<TwoFaFormProps> = ({ loginData, temporalToken }) => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setClientTokenStorageData] = useLocalStorage(
    CLIENT_TOKEN_STORAGE_NAME,
    null,
  );
  const {
    control: controlTwoFa,
    handleSubmit: handleSubmitTwoFa,
    formState: { errors: errorsTwoFa },
  } = useForm({
    defaultValues: {
      two_factor_authentication_number: "",
    },
  });
  const twoFactorRules = { required: "El código es requerido" };
  const onValidate2fa = async (data: {
    two_factor_authentication_number: string;
  }): Promise<void> => {
    try {
      setLoginError(null);
      setLoading(true);
      const twoFaBody: TwoFaBodyI = {
        ...loginData,
        two_factor_authentication_number: Number(
          data.two_factor_authentication_number,
        ),
      };

      const portalProfileToken = await validateTwoFaNumber(
        twoFaBody,
        temporalToken || "",
      );

      setClientTokenStorageData(portalProfileToken);
      router.push("/portal");
    } catch (error: any) {
      setLoading(false);
      setLoginError(JSON.stringify(error.response.data.message));
    }
  };
  return (
    <form onSubmit={handleSubmitTwoFa(onValidate2fa)}>
      <h1 className="text-3xl font-bold mb-[20px]">¡Revisa tu correo!</h1>
      <p className="text-sm mb-[20px]">
        E Ingresa el código que te acabo de llegar
      </p>

      <Controller
        name="two_factor_authentication_number"
        control={controlTwoFa}
        rules={twoFactorRules}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label="Código"
              variant="outlined"
              fullWidth
              error={!!errorsTwoFa.two_factor_authentication_number}
              helperText={errorsTwoFa.two_factor_authentication_number?.message}
            />
          );
        }}
      />
      <div className="mb-[20px]"></div>
      {loading ? (
        <button className="login-button w-full">Verificando...</button>
      ) : (
        <button className="login-button w-full" type="submit">
          Validar
        </button>
      )}

      {loginError ? (
        <Alert severity="error" className="mt-[20px]">
          <AlertTitle>Error</AlertTitle>
          Ocurrio un error iniciando sesión: {loginError}
        </Alert>
      ) : null}
    </form>
  );
};

export default TwoFaForm;
