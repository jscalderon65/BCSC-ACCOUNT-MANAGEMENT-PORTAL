import React from "react";
import AuthGuard from "../common/guards/AuthGuard";
import { hypnoticV1 } from "../common/helpers/patternStyles";
import EffectiveAnualRateHeader from "../components/EffectiveAnualRateData";

const EffectivAnualRate = () => {
  return (
    <AuthGuard>
      <div
        style={hypnoticV1}
        className="main-container  animate__animated animate__fadeIn flex items-center py-[40px] "
      >
        <EffectiveAnualRateHeader />
      </div>
    </AuthGuard>
  );
};

export default EffectivAnualRate;
