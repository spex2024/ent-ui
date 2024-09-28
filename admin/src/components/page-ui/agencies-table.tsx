import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import AgencyDetailsModal from "@/components/page-ui/agency-modal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {CircleArrowLeft, CircleArrowRight, Eye, TrashIcon} from "lucide-react";
import UpdateEntForm from "@/components/page-ui/update-enterprise";
import useAuth from "@/hook/auth";
import { toast } from "react-hot-toast";

interface Order {
    _id: string;
    orderId: string;
    totalPrice: number;
    meals :[
        meal:{
            price:number
        }
    ];

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
    isVerified: boolean;
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { deleteEnterprise, success, error } = useAuth();

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
            return total + user.orders.reduce((userTotal, order) => {
                // Sum the prices of all meals in each order
                const orderTotal = order.meals.reduce((mealTotal, meal) => mealTotal + meal.price, 0);
                return userTotal + orderTotal;
            }, 0);
        }, 0);
    };


    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const handleDelete = async (agencyId: string) => {
        await deleteEnterprise(agencyId);
    };

    // Sort agencies by creation date in ascending order
    const sortedAgencies = [...agencies].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedAgencies = sortedAgencies.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(sortedAgencies.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
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
                                <TableHead>Status</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Purchase</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedAgencies.map((agency) => (
                                <TableRow key={agency._id} className={`text-xs`}>
                                    <TableCell>
                                        <Image
                                            src={agency.imageUrl}
                                            alt={`${agency.company} Logo`}
                                            width={50}
                                            height={50}
                                            className={`rounded-full w-12 h-12 border-2 border-black`}
                                        />
                                    </TableCell>
                                    <TableCell  className={`capitalize text-xs`}>{agency.company}</TableCell>
                                    <TableCell className={`capitalize text-xs`}>{agency.branch}</TableCell>
                                    <TableCell>{agency.code}</TableCell>
                                    <TableCell>{agency.isVerified ? 'Active' : 'Inactive'}</TableCell>
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
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <UpdateEntForm agency={agency} />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="flex flex-col">
                                                        <Button size="sm" className="w-full text-left">Update Profile</Button>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleDelete(agency._id)}
                                                    >
                                                        <TrashIcon size={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <Button size="sm" className="w-full text-left">Delete Vendor</Button>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Pagination Controls */}
                    <div className=" w-full flex justify-end items-center gap-5 mt-4 text-xs">
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={' text-black flex gap-2 rounded-none '}
                            variant='ghost'
                        >
                          <CircleArrowLeft size={16}/>  Previous
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={' text-black flex gap-2 rounded-none'}
                            variant='ghost'

                        >
                            Next <CircleArrowRight size={16}/>
                        </Button>
                    </div>
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
