import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CircleX } from "lucide-react";

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
    email:string;
    agencies: Agency[];
    imageUrl: string;
    code: string;
    owner: string;
    orders: Order[];
    totalSales : number;
}

interface VendorDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: Vendor;
}

export default function VendorDetailsModal({ isOpen, onClose, vendor }: VendorDetailsModalProps) {
    const calculateTotalSales = (orders: Order[]): number => {
        return orders.reduce((total, order) => total + order.totalPrice, 0);
    };

    if (!isOpen) return null; // Do not render the modal if not open

    return (
        <div
            id="vendor-details-modal"
            className={`fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
            role="dialog"
            aria-labelledby="vendor-details-modal-label"
        >
            <div
                className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900 w-full h-[80vh] mx-auto mt-20 max-w-lg"
            >
                <div className="absolute top-2 right-2 z-[10]">
                    <button
                        type="button"
                        className="inline-flex justify-center items-center text-sm font-semibold rounded-full border border-transparent bg-black text-white shadow-md"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <CircleX size={25} strokeWidth={1.25} />
                    </button>
                </div>
                <div className="w-full h-[40%] relative">
                    <Image
                        src={vendor.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt={`${vendor.name} Image`}
                        className="rounded-t-xl object-cover object-center"
                    />
                </div>
                <div className="w-full p-4 sm:p-10 text-sm flex flex-col justify-between h-1/2">
                    <div className="flex flex-col gap-3">
                        <h3 id="vendor-details-modal-label" className="mb-2 text-2xl font-bold text-gray-800 dark:text-neutral-200">
                            {vendor.name}
                        </h3>
                        <p><strong>Location:</strong> {vendor.location}</p>
                        <p><strong>Code:</strong> {vendor.code}</p>
                        <p><strong>Owner:</strong> {vendor.owner}</p>
                        <p><strong>Owner:</strong> {vendor.email}</p>
                        <p><strong>Agencies:</strong> {vendor.agencies.map(agency => agency.company).join(', ')}</p>
                        <p><strong>Total Sales:</strong>GH₵ {vendor.totalSales.toFixed(2)}</p>
                        <p><strong>Total Orders:</strong> {vendor.orders.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
