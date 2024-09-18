"use client";

import OrderTable from "../../../components/page-ui/order-table";

const Order = () => {
  return (
    <div className="lg:w-[80vw] lg:p-10 p-5 mx-auto min-h-screen ">
      <div className="flex flex-col lg:mb-10 p-5 gap-2">
        <h1 className={`text-4xl font-bold`}>Your Orders</h1>
        <p className="text-sm text-gray-500">
          {" "}
          Check the status of your recent orders
        </p>
      </div>
      <OrderTable />
    </div>
  );
};

export default Order;
