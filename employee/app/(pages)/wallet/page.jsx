import React from "react";

import CarbonStats from "../../../components/page-ui/carbon-stats";

const WalletDashboard = () => {
  return (
    <div
      className={`w-full min-h-screen flex  flex-col py-10 bg-gray-100 px-32  dark:bg-neutral-900 dark:border-neutral-400 dark:text-white`}
    >
      <CarbonStats />
    </div>
  );
};

export default WalletDashboard;
