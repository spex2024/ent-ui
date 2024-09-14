'use client'

import React, { useCallback, useState } from "react";
import { Eye } from "lucide-react"; // Import only the eye icon
import { Chip, TableBody, TableColumn, TableHeader, TableRow, Tooltip, Table, TableCell, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useUser } from "@/app/provider/user/user-context";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function OrderTable() {
    const { user, loading, error: userError } = useUser();
    const orders = user?.orders || [];
    const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const orderDetails = orders.map(order => ({
        meals: order.meals,
        id: order.orderId,
        price: order.totalPrice,
        quantity: order.quantity,
        status: order.status,
        imageUrl: order.imageUrl,
    }));

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        onOpen(); // Open the modal when viewing details
    };

    const renderCell = useCallback((order, columnKey) => {
        switch (columnKey) {
            case "imageUrl":
                return (
                    <img src={order.imageUrl} alt={`Order ${order.id}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
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
                    <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
                        {order.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-5">
                        <Tooltip content="View Details">
                            <span
                                className="text-lg text-primary cursor-pointer active:opacity-50"
                                onClick={() => handleViewDetails(order)}
                            >
                                <Eye size={22} strokeWidth={2} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return order[columnKey];
        }
    }, [onOpen]);

    return (
        <>
            <Table aria-label="Order Table">
                <TableHeader columns={[
                    { uid: "imageUrl", name: "Image" },
                    { uid: "meals", name: "Meal Name" },
                    { uid: "id", name: "Order ID" },
                    { uid: "price", name: "Price" },
                    { uid: "quantity", name: "Qty" },
                    { uid: "status", name: "Status" },
                    { uid: "actions", name: "Actions" }
                ]}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={orderDetails}>
                    {(order) => (
                        <TableRow key={order.id}>
                            {["imageUrl", "meals", "id", "price", "quantity", "status", "actions"].map((columnKey) => (
                                <TableCell key={columnKey}>{renderCell(order, columnKey)}</TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Modal for displaying order details */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                className="modal-custom"
            >
                <ModalContent>
                    {() => (
                        <>
                            <div className="relative  ">
                                <ModalHeader className="flex flex-col gap-1 text-white px-6 z-10">
                                    <p className={'w-[35%] px-2'}>Order Details</p>
                                </ModalHeader>
                                {selectedOrder?.imageUrl && (
                                    <img
                                        src={selectedOrder.imageUrl}
                                        alt={`Order ${selectedOrder.id}`}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            zIndex: -1
                                        }}
                                    />
                                )}
                            </div>
                            <ModalBody className="pt-16 mt-10"> {/* Add padding to avoid overlap */}
                                {selectedOrder && (
                                    <>
                                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                                        <p><strong>Price:</strong> GH₵{selectedOrder.price}</p>
                                        <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                                        <div className={`flex flex-col lg:flex-row lg:items-center gap-2`}>
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

            <style jsx>{`
                .modal-custom {
                    width: 80%;
                    max-width: 800px;
                }
                .modal-custom .nextui-modal-content {
                    padding: 0;
                }
            `}</style>
        </>
    );
}
