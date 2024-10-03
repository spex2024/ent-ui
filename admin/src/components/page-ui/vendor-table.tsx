import React, { useState } from 'react';
import Image from 'next/image';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {Eye, ListFilter, LucideEdit3, TrashIcon, File, CircleArrowLeft, CircleArrowRight} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VendorDetailsModal from "@/components/page-ui/vendor-modal";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AddVendor } from "@/components/page-ui/add-vendor";
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
    status: string;
}

interface Vendor {
    _id: string;
    name: string;
    location: string;
    agencies: Agency[];
    imageUrl: string;
    email:string;
    phone: string;
    code: string;
    owner: string;
    orders: Order[];
    totalSales: number;
    createdAt: Date; // Include created date
}

interface VendorTableProps {
    vendors: Vendor[];
}

export default function VendorTable({ vendors }: VendorTableProps) {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { deleteVendor } = useAuth();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const vendorsPerPage = 10;

    // Sort vendors by created date (current one first)
    const sortedVendors = [...vendors].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Get current vendors
    const indexOfLastVendor = currentPage * vendorsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
    const currentVendors = sortedVendors.slice(indexOfFirstVendor, indexOfLastVendor);

    const totalPages = Math.ceil(sortedVendors.length / vendorsPerPage);

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

    const getOrderCountByStatus = (orders: Order[], status: string) => {
        return orders.filter(order => order.status === status).length;
    };

    const limitWords = (text: string, maxWords: number) => {
        const words = text.split(' ');
        return words.length > maxWords
            ? words.slice(0, maxWords).join(' ') + '...'
            : text;
    };

    // Pagination control functions
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full p-4">
            <div className="ml-auto flex items-center gap-2 justify-end mb-5">
                <AddVendor />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10 gap-1 bg-black text-white">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" variant="outline" className="h-10 gap-1 bg-black text-white">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="text-xs">
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Enterprise(s)</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Completed Orders</TableHead>
                                <TableHead>Cancelled Orders</TableHead>
                                <TableHead>Total Sales</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentVendors.map((vendor) => (
                                <TableRow key={vendor._id} className={`text-xs`}>
                                    <TableCell>
                                        <Image
                                            src={vendor.imageUrl}
                                            width={50}
                                            height={50}
                                            alt={`${vendor.name} Image`}
                                            className="object-cover rounded-lg"
                                        />
                                    </TableCell>
                                    <TableCell>{limitWords(vendor.name, 4)}</TableCell>
                                    <TableCell>{limitWords(vendor.location, 3)}</TableCell>
                                    <TableCell>{vendor.code}</TableCell>
                                    <TableCell>{vendor.owner}</TableCell>
                                    <TableCell>{vendor.agencies.length}</TableCell>
                                    <TableCell>{vendor.orders.length}</TableCell>
                                    <TableCell>{getOrderCountByStatus(vendor.orders, 'completed')}</TableCell>
                                    <TableCell>{getOrderCountByStatus(vendor.orders, 'cancelled')}</TableCell>
                                    <TableCell>GH₵ {vendor.totalSales.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" onClick={() => handleViewClick(vendor)}>
                                                        <Eye size={16} strokeWidth={1.25} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>View details</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <UpdateVendorForm vendor={vendor} />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="flex flex-col">
                                                        <Button size="sm" className="w-full text-left">Update profile</Button>
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
                                                        <TrashIcon size={16} strokeWidth={1.25} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <Button size="sm" className="w-full text-left">Delete vendor</Button>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-end space-x-2 text-xs">
                    <div className="flex justify-between mt-4 items-center justify-items-center">
                        <Button onClick={prevPage} disabled={currentPage === 1} variant="ghost" className={`text-black flex gap-2 rounded-none`}>

                            Previous <CircleArrowLeft size={16}/>
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button onClick={nextPage} disabled={currentPage === totalPages} variant='ghost' className={`text-black flex gap-2 rounded-none`}>

                            Next <CircleArrowRight size={16}/>
                        </Button>
                    </div>

                </CardFooter>
            </Card>


            {selectedVendor && (
                <VendorDetailsModal vendor={selectedVendor} isOpen={isModalOpen} onClose={handleCloseModal}/>
            )}
        </div>
    );
}
