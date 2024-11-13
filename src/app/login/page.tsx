"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useDocumentTypes } from "@hooks/useDocumentTypes";
import { loginService } from "@services/portalProfile";
import { CLIENT_TOKEN_STORAGE_NAME } from "@/app/common/constants/appConfig";
import { DocumentTypeI } from "@interfaces/utils";
import { LoginBodyI } from "@interfaces/login";
import TwoFaForm from "../components/TwoFaForm";
import { netV2 } from "../common/helpers/patternStyles";

const Login = () => {
  const [temporalToken, setTemporalToken] = useState<string | null>(null);

  const [loginData, setLoginData] = useState<LoginBodyI>({
    document_type_id: "",
    document_number: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { documentTypes, isLoading } = useDocumentTypes();

  const {
    control: controlFormLogin,
    handleSubmit: handleSubmmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    defaultValues: {
      document_type_id: "",
      document_number: "",
      password: "",
    },
  });

  const documentTypesRules = { required: "Tipo de documento es requerido" };

  const documentRules = {
    required: "Documento es requerido",
    pattern: {
      value: /^[0-9]*$/,
      message: "Solo se permiten números",
    },
    maxLength: {
      value: 10,
      message: "Máximo 10 dígitos",
    },
    minLength: {
      value: 5,
      message: "Mínimo 5 dígitos",
    },
  };

  const passwordRules = {
    required: "Contraseña es requerida",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  };

  useEffect(() => {
    localStorage.removeItem(CLIENT_TOKEN_STORAGE_NAME);
  }, []);

  const onSubmit = async (data: LoginBodyI): Promise<void> => {
    setLoginError(null);
    try {
      setLoading(true);
      const loginTemporalToken: string = await loginService(data);
      setLoginData(data);
      setLoading(false);
      setTemporalToken(loginTemporalToken);
    } catch (error: any) {
      setLoading(false);
      setLoginError(JSON.stringify(error.response.data.message));
    }
  };

  return (
    <div
      style={netV2}
      className="main-container flex justify-center items-center presentation-part-1-background"
    >
      <div className="md:w-[30vw] h-auto w-[80vw] main-background rounded-lg p-[20px] flex flex-col justify-center">
        <div className="mb-[40px]">
          <Image
            className="cursor-pointer"
            src="/images/Banco_Caja_Social_logo.png"
            alt="index-header-logo.png"
            width={200}
            height={56}
            priority
          />
        </div>

        {!temporalToken ? (
          <form onSubmit={handleSubmmitLogin(onSubmit)}>
            <h1 className="text-3xl font-bold mb-[20px]">
              Bienvenido al portal de Caja Plus
            </h1>
            <p className="text-sm mb-[20px]">
              Aquí podrás gestionar tu cuenta bancaria y ver tus últimos
              movimientos
            </p>

            <Controller
              name="document_type_id"
              control={controlFormLogin}
              rules={documentTypesRules}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl fullWidth error={!!errorsLogin.document_type_id}>
                  <InputLabel id="tipo-documento-label">
                    Tipo de documento
                  </InputLabel>
                  <Select
                    labelId="tipo-documento-label"
                    label="Tipo de documento"
                    value={value || ""}
                    onChange={onChange}
                    {...field}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} className="mr-2" />
                        Cargando...
                      </MenuItem>
                    ) : documentTypes && documentTypes.length > 0 ? (
                      documentTypes.map((type: DocumentTypeI) => (
                        <MenuItem key={type.code} value={type._id}>
                          {type.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        No hay tipos de documento disponibles
                      </MenuItem>
                    )}
                  </Select>
                  {errorsLogin.document_type_id && (
                    <FormHelperText>
                      {errorsLogin.document_type_id.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <div className="mb-[20px]"></div>
            <Controller
              name="document_number"
              control={controlFormLogin}
              rules={documentRules}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Documento de identidad"
                  variant="outlined"
                  fullWidth
                  error={!!errorsLogin.document_number}
                  helperText={errorsLogin.document_number?.message}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 10) {
                      field.onChange(value);
                    }
                  }}
                />
              )}
            />
            <div className="mb-[20px]"></div>
            <Controller
              name="password"
              control={controlFormLogin}
              rules={passwordRules}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  error={!!errorsLogin.password}
                  helperText={errorsLogin.password?.message}
                />
              )}
            />
            <div className="mb-[20px]"></div>
            {loading ? (
              <button className="login-button w-full">Verificando...</button>
            ) : (
              <button className="login-button w-full" type="submit">
                Ingresar
              </button>
            )}
            {loginError ? (
              <Alert severity="error" className="mt-[20px]">
                <AlertTitle>Error</AlertTitle>
                Ocurrio un error iniciando sesión: {loginError}
              </Alert>
            ) : null}
          </form>
        ) : (
          <TwoFaForm loginData={loginData} temporalToken={temporalToken} />
        )}
      </div>
    </div>
  );
};

export default Login;
