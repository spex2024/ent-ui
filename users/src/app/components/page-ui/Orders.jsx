'use client'
import React, { useCallback } from "react";
import { ApproveIcon, CancelIcon } from "lucide-react"; // Import the new icons
import { Chip, TableBody, TableColumn, TableHeader, TableRow, Tooltip, Table, TableCell, User } from "@nextui-org/react";
import { columns, users } from "@/app/hook/data";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function Orders() {
    const handleApprove = (userId) => {
        // Logic for approving the user
        console.log(`Approved user with ID: ${userId}`);
    };

    const handleCancel = (userId) => {
        // Logic for canceling the user
        console.log(`Cancelled user with ID: ${userId}`);
    };

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2 border-green-600">
                        <Tooltip content="Approve">
                            <span
                                className="text-lg text-success cursor-pointer active:opacity-50"
                                onClick={() => handleApprove(user.id)} // Handle approve
                            >
                                <ApproveIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Cancel">
                            <span
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => handleCancel(user.id)} // Handle cancel
                            >
                                <CancelIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
