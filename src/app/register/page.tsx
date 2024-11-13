"use client";
import React, { useState } from "react";
import { netV2 } from "../common/helpers/patternStyles";
import { useDocumentTypes } from "../common/hooks/useDocumentTypes";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DocumentTypeI } from "../common/interfaces/utils";
import { RegisterPortalProfileI } from "../common/interfaces/register";
import { createPortalProfile } from "../services/register";
import { createSavingAccount } from "../services/savingAccount";
import { useRouter } from "next/navigation";
const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { documentTypes, isLoading } = useDocumentTypes();
  const [registerError, setRegisterError] = useState<null | string>(null);
  const {
    control: controlFormRegister,
    handleSubmit: handleSubmmitRegister,
    formState: { errors: errorsLogin },
  } = useForm({
    defaultValues: {
      document_type_id: "",
      document_number: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterPortalProfileI): Promise<void> => {
    setRegisterError(null);
    try {
      const newPortalProfileId = await createPortalProfile(data);
      const newSavingAccountBody = { balance: 100000, is_active: true };
      const newSavingAccount = await createSavingAccount(
        newPortalProfileId,
        newSavingAccountBody,
      );
      console.log({ newSavingAccount });
      setLoading(true);
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setRegisterError(JSON.stringify(error.response.data.message));
    }
  };

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
      value: 10,
      message: "Mínimo 10 dígitos",
    },
  };

  const passwordRules = {
    required: "Contraseña es requerida",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  };

  const nameRules = {
    required: "Este campo es obligatorio",
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: "Solo se permiten letras sin espacios",
    },
  };
  const emailRules = {
    required: "Este campo es obligatorio",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Ingrese un email válido",
    },
  };
  return (
    <div
      style={netV2}
      className="main-container pb-[40px] flex items-center animate__animated animate__fadeIn"
    >
      <div className="main-background rounded-lg p-[20px] mt-[40px] w-[90vw] md:w-[40vw]">
        <form onSubmit={handleSubmmitRegister(onSubmit)}>
          <h1 className="text-3xl font-bold mb-[20px]">
            ¡Estas a un paso de tener tu cuenta de Caja Plus!
          </h1>
          <p className="text-sm ">
            Llena los siguientes campos para crear tu cuenta
          </p>
          <div className="mb-[40px]"></div>
          <Divider></Divider>
          <div className="mb-[40px]"></div>
          <p className="text-sm ">Datos personales:</p>
          <div className="mb-[40px]"></div>
          <Controller
            name="document_type_id"
            control={controlFormRegister}
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
            control={controlFormRegister}
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
            name="first_name"
            control={controlFormRegister}
            rules={nameRules}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primer nombre"
                variant="outlined"
                fullWidth
                error={!!errorsLogin.document_number}
                helperText={errorsLogin.document_number?.message}
              />
            )}
          />
          <div className="mb-[20px]"></div>
          <Controller
            name="last_name"
            control={controlFormRegister}
            rules={nameRules}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primer apellido"
                variant="outlined"
                fullWidth
                error={!!errorsLogin.last_name}
                helperText={errorsLogin.last_name?.message}
              />
            )}
          />
          <div className="mb-[20px]"></div>
          <Controller
            name="phone_number"
            control={controlFormRegister}
            rules={documentRules}
            render={({ field }) => (
              <TextField
                {...field}
                label="Télefono celular"
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
          <div className="mb-[40px]"></div>
          <Divider></Divider>
          <div className="mb-[40px]"></div>
          <p className="text-sm ">Creación de usuario:</p>
          <div className="mb-[40px]"></div>
          <Controller
            name="email"
            control={controlFormRegister}
            rules={emailRules}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo"
                variant="outlined"
                fullWidth
                error={!!errorsLogin.email}
                helperText={errorsLogin.email?.message}
              />
            )}
          />
          <div className="mb-[20px]"></div>
          <Controller
            name="password"
            control={controlFormRegister}
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
              Registrarme
            </button>
          )}
          {registerError ? (
            <Alert severity="error" className="mt-[20px]">
              <AlertTitle>Error</AlertTitle>
              Ocurrio un error iniciando sesión: {registerError}
            </Alert>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Register;
