import React from "react";
import AuthGuard from "@guards/AuthGuard";

const Page = () => {
  return (
    <AuthGuard>
      <div>No puedes entrar</div>
    </AuthGuard>
  );
};

export default Page;
