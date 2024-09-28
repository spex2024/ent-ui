import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {CircleX, MapPin, Phone, Mail, Building} from 'lucide-react';

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

interface AgencyDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    agency: Agency;
}

export default function AgencyDetailsModal({ isOpen, onClose, agency }: AgencyDetailsModalProps) {
    // Function to calculate total sales
    const calculateTotalSales = (orders: Order[]): number => {
        return orders.reduce((total, order) => total + order.totalPrice, 0);
    };

    if (!isOpen) return null; // Do not render the modal if not open

    return (
        <div
            id="agency-details-modal"
            className={`fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
            role="dialog"
            aria-labelledby="agency-details-modal-label"
        >
            <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900 w-full h-[82vh] mx-auto mt-20 max-w-lg">
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

                <div className="w-full h-[38%] relative">
                    <Image
                        src={agency.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt={`${agency.company} Image`}
                        className="rounded-t-xl object-cover object-center"
                    />
                </div>

                <div className="w-full p-4 sm:p-10 text-sm flex flex-col justify-between h-1/2">
                    <div className="flex flex-col gap-5">
                        <h3 id="agency-details-modal-label" className="mb-1 text-md font-bold text-gray-800 dark:text-neutral-200 uppercase">
                            {agency.company} ({agency.code})
                        </h3>

                        <h1 className="font-bold text-md">Contact</h1>
                        <div className="w-full grid grid-cols-2 gap-2 text-xs capitalize">
                            <div className="flex gap-2">
                                <Building size={20} strokeWidth={1.25} />
                                {agency.branch}
                            </div>
                            <div className="flex gap-3 capitalize">
                                <MapPin size={20} strokeWidth={1.25} />
                                {agency.location}
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2 text-xs">
                            <div className="flex gap-3">
                                <Phone size={20} strokeWidth={1.25} />
                                <p>{agency.phone}</p>
                            </div>
                            <div className="flex gap-3">
                                <Mail size={20} strokeWidth={1.25} />
                                <p>{agency.email}</p>
                            </div>
                        </div>
                        <h1 className="font-bold mt-3 text-md">Metrics</h1>
                        <div className="w-full grid grid-cols-3 gap-3 text-xs">
                            <div className="flex gap-1">
                                <strong>Carbon Points:</strong>
                                <p>50</p>
                            </div>
                            <div className="flex gap-1">
                                <strong>Wallet:</strong>
                                <p>50</p>
                            </div>
                            <div className="flex gap-1">
                                <strong>Emissions Saved:</strong>
                                <p>20</p>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2 text-xs place-items-center">
                            <div className="flex gap-2">
                                <strong>Total Orders:</strong>
                                <p>{agency.users.reduce((count, user) => count + user.orders.length, 0)}</p>
                            </div>
                            <div className="flex gap-2">
                                <strong>Purchases:</strong>
                                <p>GH₵{agency.users.reduce((total, user) =>
                                    total + user.orders.reduce((orderTotal, order) => orderTotal + order.totalPrice, 0), 0
                                ).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
