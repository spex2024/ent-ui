"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Eye } from "lucide-react"; // Import only the eye icon
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

import useUserStore from "../../app/store/profile";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function OrderTable() {
  const { user, error: userError, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const orders = user?.orders || [];
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Sort orders by date and time in descending order (most recent first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB - dateA;
  });

  // Get current orders after sorting
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Map order details including date and time
  const orderDetails = currentOrders.map((order) => ({
    meals: order.meals,
    id: order.orderId,
    price: order.totalPrice,
    quantity: order.quantity,
    status: order.status,
    imageUrl: order.imageUrl,
    date: new Date(order.createdAt).toLocaleDateString(), // Extract date
    time: new Date(order.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }), // Extract time
  }));

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    onOpen(); // Open the modal when viewing details
  };

  const renderCell = useCallback(
    (order, columnKey) => {
      switch (columnKey) {
        case "imageUrl":
          return (
            <img
              alt={`Order ${order.id}`}
              src={order.imageUrl}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          );
        case "meals":
          return (
            <div className="flex flex-col">
              {order.meals.map((meal, index) => (
                <p key={index}>{meal.main}</p>
              ))}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[order.status]}
              size="sm"
              variant="flat"
            >
              {order.status}
            </Chip>
          );
        case "date":
          return order.date;
        case "time":
          return order.time;
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-5 cursor-pointer">
              <Tooltip content="View Details">
                <Eye
                  color={"#000"}
                  size={22}
                  strokeWidth={2}
                  onClick={() => handleViewDetails(order)}
                />
              </Tooltip>
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
            { uid: "meals", name: "Meal Name" },
            { uid: "id", name: "Order ID" },
            { uid: "price", name: "Price" },
            { uid: "quantity", name: "Qty" },
            { uid: "status", name: "Status" },
            { uid: "actions", name: "Actions" },
            { uid: "date", name: "Date" },
            { uid: "time", name: "Time" }, // Add time column
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
            <TableRow key={order.id}>
              {[
                "imageUrl",
                "meals",
                "id",
                "price",
                "quantity",
                "status",
                "actions",
                "date",
                "time", // Render the time column
              ].map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(order, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        isCompact
        showControls
        className="mt-4"
        color="primary"
        page={currentPage}
        total={Math.ceil(orders.length / ordersPerPage)}
        onChange={(page) => setCurrentPage(page)}
      />

      {/* Modal for displaying order details */}
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
                    alt={`Order ${selectedOrder.id}`}
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
                      <strong>Order ID:</strong> {selectedOrder.id}
                    </p>
                    <p>
                      <strong>Price:</strong> GH₵{selectedOrder.price}
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
                      className={`flex flex-col lg:flex-row lg:items-center gap-2`}
                    >
                      <strong>Meals:</strong>
                      <ul>
                        {selectedOrder.meals.map((meal, index) => (
                          <ul key={index} className={`flex gap-4 text-xs`}>
                            <li>{meal.main}</li>
                            <li>{meal.protein}</li>
                            <li>{meal.sauce}</li>
                            <li>{meal.extras}</li>
                          </ul>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onOpenChange}>
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
