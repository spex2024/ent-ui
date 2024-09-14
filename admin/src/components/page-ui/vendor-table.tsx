import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import {Eye, ListFilter, LucideEdit3, TrashIcon} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VendorDetailsModal from "@/components/page-ui/vendor-modal";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {File} from 'lucide-react'
import {AddVendor} from "@/components/page-ui/add-vendor";
import useAuth from "@/hook/auth";
import UpdateVendorForm from "@/components/page-ui/update-vendor";
interface Agency {
    name: string;
    initials: string;
    company: string;
}

interface Order {
    _id: string;
    orderId: string;
    totalPrice: number;
}

interface Vendor {
    _id: string;
    name: string;
    location: string;
    agencies: Agency[];
    imageUrl: string;
    phone :string;
    code: string;
    owner: string;
    orders: Order[];
}

interface VendorTableProps {
    vendors: Vendor[];
}

export default function VendorTable({ vendors }: VendorTableProps) {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const {deleteVendor} = useAuth()

    const handleViewClick = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedVendor(null);
    };

    const handleDelete = async (userId: string) => {
        await deleteVendor(userId);
    };

    return (
        <div className="w-full p-4">
            <div className="ml-auto flex items-center gap-2  justify-end mb-5">

                <AddVendor/>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10 gap-1 bg-black text-white">
                            <ListFilter className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuCheckboxItem>
                            Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                            Cancelled
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-10 gap-1 bg-black text-white">
                    <File className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                </Button>

            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Agencies</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Sales</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor) => (
                                <TableRow key={vendor._id}>
                                    <TableCell>
                                        <Image
                                            src={vendor.imageUrl}
                                            width={50}
                                            height={50}
                                            alt={`${vendor.name} Image`}
                                            className="object-cover rounded-lg"
                                        />
                                    </TableCell>
                                    <TableCell>{vendor.name}</TableCell>
                                    <TableCell>{vendor.location}</TableCell>
                                    <TableCell>{vendor.code}</TableCell>
                                    <TableCell>{vendor.owner}</TableCell>
                                    <TableCell>{vendor.agencies.length}</TableCell>
                                    <TableCell>{vendor.orders.length}</TableCell>
                                    <TableCell> GH₵ {vendor.orders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleViewClick(vendor)}
                                                    >
                                                        <Eye size={20} strokeWidth={1.25}/>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    View details
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger>

                                                    <UpdateVendorForm vendor={vendor}/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="flex flex-col">
                                                        <Button  size="sm"
                                                                 className="w-full text-left">update vendor</Button>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleDelete(vendor._id)}
                                                    >
                                                        <TrashIcon size={16}/>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>

                                                    <Button  size="sm"
                                                             className="w-full text-left" >Delete vendor</Button>
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
            {selectedVendor && (
                <VendorDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vendor={selectedVendor}
                />
            )}
        </div>
    );
}
