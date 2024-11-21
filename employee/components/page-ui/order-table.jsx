"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CircleOff, Eye } from "lucide-react";
import {
  Chip,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Table,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import toast from "react-hot-toast";

import useAuth from "../../app/hook/auth";
import useOrderStore from "../../app/store/order";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
  completed: "success",
  cancelled: "danger",
  pending: "warning", // Add any additional statuses here
};

export default function App() {
  const { orders, fetchOrders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { cancelOrder, success, error } = useAuth();

  useEffect(() => {
    fetchOrders(); // Fetch orders directly from the order store
  }, [fetchOrders]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  console.log("Orders:",orders)

  // Sort orders by date and time in descending order if orders is defined
  const sortedOrders = Array.isArray(orders)
    ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Map order details including date and time
// Map order details including vendor name and meal details
  const orderDetails = currentOrders.map((order) => ({
    _id: order?._id,
    orderId: order?.orderId,
    vendor:  order?.vendor?.name , // Adjust as needed
    meal: order?.mealName,
    quantity: order?.quantity,
    status: order?.status || 'pending',
    imageUrl: order?.imageUrl,
    date: new Date(order?.createdAt).toLocaleDateString(),
    time: new Date(order?.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    options: order?.options, // Include options if needed in UI
    schedule: Array.isArray(order?.selectedDays) ? order?.selectedDays.join(', ') : 'No schedule selected',
  }))

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    onOpen();

  };

  const handleCancel = async (orderId) => {
    await cancelOrder(orderId);
  };

  const renderCell = useCallback(
    (order, columnKey) => {
      switch (columnKey) {
        case "imageUrl":
          return (
            <img
              alt={`Order ${order.orderId}`}
              src={order.imageUrl}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          );
        case "meal":
          return (
            <div className="flex flex-col">
              {order?.meal}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[order?.status] || "default"}
              size="sm"
              variant="flat"
            >
              {order?.status}
            </Chip>
          );
        case "date":
          return order?.date;
        case "time":
          return order?.time;
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-5 cursor-pointer">
              {order.status === "pending" ? (
                <div className={`flex flex-col sm:flex-row gap-3`}>
                  <Tooltip content="Cancel Order">
                    <CircleOff
                      color={"#000"}
                      size={22}
                      strokeWidth={2}
                      onClick={() => handleCancel(order._id)}
                    />
                  </Tooltip>
                  <Tooltip content="View Details">
                    <Eye
                      color={"#000"}
                      size={22}
                      strokeWidth={2}
                      onClick={() => handleViewDetails(order)}
                    />
                  </Tooltip>
                </div>
              ) : (
                <Tooltip content="View Details">
                  <Eye
                    color={"#000"}
                    size={22}
                    strokeWidth={2}
                    onClick={() => handleViewDetails(order)}
                  />
                </Tooltip>
              )}
            </div>
          );
        default:
          return order[columnKey];
      }
    },
    [onOpen],
  );

  return (
    <>
      <Table aria-label="Order Table">
        <TableHeader
          columns={[
            { uid: "imageUrl", name: "Image" },
            { uid: "meal", name: "Meal Name" },
            { uid: "orderId", name: "Order ID" },
            { uid: "vendor", name: "Vendor" },
            { uid: "quantity", name: "Qty" },
            { uid: "status", name: "Status" },
            { uid: "date", name: "Date" },
            { uid: "time", name: "Time" },
            { uid: "actions", name: "Actions" },
          ]}
        >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={orderDetails}>
          {(order) => (
            <TableRow key={order.orderId}>
              {[
                "imageUrl",
                "meal",
                "orderId",
                "vendor",
                "quantity",
                "status",
                "date",
                "time",
                "actions",
              ].map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(order, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        className="mt-4"
        color="primary"
        page={currentPage}
        total={Math.ceil(sortedOrders.length / ordersPerPage)} // Updated total calculation
        onChange={(page) => setCurrentPage(page)}
      />

      {success && <div className="toast-success">{success}</div>}
      {error && <div className="toast-error">{error}</div>}

      <Modal
        className="modal-custom"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <div className="relative">
                <ModalHeader className="flex flex-col gap-1 text-white px-6 z-10">
                  <p className={"w-[35%] px-2"}>Order Details</p>
                </ModalHeader>
                {selectedOrder?.imageUrl && (
                  <img
                    alt={`Order ${selectedOrder.orderId}`}
                    src={selectedOrder.imageUrl}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      zIndex: -1,
                    }}
                  />
                )}
              </div>
              <ModalBody className="pt-16 mt-10">

                {selectedOrder && (
                  <>
                    <p>
                      <strong>Order ID:</strong> {selectedOrder.orderId}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedOrder.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedOrder.time}
                    </p>
                    <div
                      className={`flex flex-col `}
                    >
                     <p> <strong>Main Meal:  </strong> {selectedOrder?.meal} </p>
                      <ul className={`flex flex-col gap-2 mt-2`}>
                        <li><strong>Protein: </strong>{selectedOrder?.options?.protein}</li>
                        <li><strong>Sauce: </strong>{selectedOrder?.options?.sauce}</li>
                        <li><strong>Extras: </strong>
                          {selectedOrder?.options.extras && selectedOrder.options?.extras.length > 0
                              ? selectedOrder?.options?.extras.map((extra, index) => (
                                  <span
                                      key={index}>{extra}{index < selectedOrder.options.extras.length - 1 ? ', ' : ''}</span>
                              ))
                              : 'Not selected'}
                        </li>
                        <li><strong>Schedule: </strong>
                          {selectedOrder.schedule}
                        </li>


                      </ul>
                    </div>
                    {console.log("Selected Days:", selectedOrder.schedule)}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button flat color="error" onClick={onOpenChange}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
