import React from "react";
import AuthGuard from "@guards/AuthGuard";

const MainPortal = () => {
  return (
    <AuthGuard>
      <div>No puedes entrar</div>
    </AuthGuard>
  );
};

export default MainPortal;
