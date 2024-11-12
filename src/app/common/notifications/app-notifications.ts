import Swal from "sweetalert2";

export const showUnauthorizedAlert = () => {
  Swal.fire({
    title: "Acceso Denegado",
    text: "Debe iniciar sesión para acceder a este módulo",
    icon: "warning",
    confirmButtonText: "Entendido",
    confirmButtonColor: "#004481",
    allowOutsideClick: false,
  });
};

export const showGeneralErrorAlert = () => {
  Swal.fire({
    title: "Ha ocurrido un error",
    text: "Por favor intente nuevamente. Si el problema persiste, contacte al administrador del sistema.",
    icon: "error",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#004481",
    allowOutsideClick: false,
  });
};

export const showSessionExpiredAlert = () => {
  Swal.fire({
    title: "Sesión Expirada",
    text: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
    icon: "info",
    confirmButtonText: "Iniciar Sesión",
    confirmButtonColor: "#004481",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
};
