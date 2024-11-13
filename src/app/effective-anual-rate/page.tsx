import React from "react";
import AuthGuard from "../common/guards/AuthGuard";
import { hypnoticV1 } from "../common/helpers/patternStyles";

const EffectivAnualRate = () => {
  return (
    <AuthGuard>
      <div
        style={hypnoticV1}
        className="main-container  animate__animated animate__fadeIn"
      ></div>
    </AuthGuard>
  );
};

export default EffectivAnualRate;
