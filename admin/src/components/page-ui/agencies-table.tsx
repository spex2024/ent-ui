import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import AgencyDetailsModal from "@/components/page-ui/agency-modal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

interface Order {
    _id: string;
    orderId: string;
    totalPrice: number;
}

interface User {
    _id: string;
    name: string;
    orders: Order[];
}

interface Agency {
    _id: string;
    company: string;
    branch: string;
    code: string;
    location: string;
    email: string;
    phone: string;
    imageUrl: string;
    orders: Order[];
    users: User[];
    createdAt: Date;
}

interface AgencyTableProps {
    agencies: Agency[];
}

export default function AgencyTable({ agencies }: AgencyTableProps) {
    const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleViewClick = (agency: Agency) => {
        setSelectedAgency(agency);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAgency(null);
    };

    // Helper function to calculate total purchase
    const calculateTotalPurchase = (agency: Agency) => {
        return agency.users.reduce((total, user) => {
            return total + user.orders.reduce((userTotal, order) => userTotal + order.totalPrice, 0);
        }, 0);
    };


    return (
        <div className="w-full p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Purchase</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agencies?.map((agency) => (
                                <TableRow key={agency._id}>
                                    <TableCell>
                                        <Image
                                            src={agency.imageUrl}
                                            alt={`${agency.company} Logo`}
                                            width={50}
                                            height={50}
                                            className={`rounded-full w-12 h-12 border-2 border-black`}
                                        />
                                    </TableCell>
                                    <TableCell>{agency.company}</TableCell>
                                    <TableCell>{agency.branch}</TableCell>
                                    <TableCell>{agency.code}</TableCell>
                                    <TableCell>{agency.phone}</TableCell>
                                    <TableCell>{agency.email}</TableCell>
                                    <TableCell>{agency.users.reduce((count, user) => count + user.orders.length, 0)}</TableCell>
                                    <TableCell>
                                        GH₵{calculateTotalPurchase(agency).toFixed(2)}
                                    </TableCell>
                                    <TableCell>{new Date(agency.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewClick(agency)}
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>View Details</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {selectedAgency && (
                <AgencyDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    agency={selectedAgency}
                />
            )}
        </div>
    );
}
