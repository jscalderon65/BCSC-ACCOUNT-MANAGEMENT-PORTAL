"use client";
import React, { useState } from "react";
import Image from "next/image";
import IndexHeader from "@components/IndexHeader";
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
import { useLocalStorage } from "@hooks/localStorage";
import { CLIENT_TOKEN_STORAGE_NAME } from "@constants/app-config";
import { useRouter } from "next/navigation";
import { DocumentTypeI } from "@interfaces/utils";
import { LoginBodyI } from "../common/interfaces/login";
const Login = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState<null | string>(null);
  const { documentTypes, isLoading } = useDocumentTypes();
  const [_, setClientTokenStorageData] = useLocalStorage(
    CLIENT_TOKEN_STORAGE_NAME,
    null,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data: LoginBodyI): Promise<void> => {
    try {
      const response = await loginService(data);
      setClientTokenStorageData(response);
      router.push("/portal");
    } catch (error: any) {
      console.log(error);
      setLoginError(JSON.stringify(error.response.data.message));
    }
  };

  return (
    <>
      <IndexHeader showButtons={false} />
      <div className="main-container flex justify-center items-center presentation-part-1-background">
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold mb-[20px]">
              Bienvenido al portal de Caja Plus
            </h1>
            <p className="text-sm mb-[20px]">
              Aquí podrás gestionar tu cuenta bancaria y ver tus últimos
              movimientos
            </p>

            <Controller
              name="document_type_id"
              control={control}
              rules={documentTypesRules}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl
                  fullWidth
                  error={!!errors.document_type_id}
                  className="mb-[20px]"
                >
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
                  {errors.document_type_id && (
                    <FormHelperText>
                      {errors.document_type_id.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="document_number"
              control={control}
              rules={documentRules}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Documento de identidad"
                  variant="outlined"
                  fullWidth
                  className="mb-[20px]"
                  error={!!errors.document_number}
                  helperText={errors.document_number?.message}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 10) {
                      field.onChange(value);
                    }
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={passwordRules}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  className="mb-[20px]"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <button className="login-button w-full" type="submit">
              Ingresar
            </button>
            {loginError ? (
              <Alert severity="error" className="mt-[20px]">
                <AlertTitle>Error</AlertTitle>
                Ocurrio un error iniciando sesión: {loginError}
              </Alert>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
