'use client'

import React, { useEffect } from "react";
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import useAuth from "@/app/hook/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/provider/user/user-context";
import CartDrawer from "@/app/components/page-ui/cartDrawer";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Meals', href: '/meals', current: false },
    { name: 'Order', href: '/order', current: false },
    { name: 'Profile', href: '/profile', current: false },
    { name: 'Return Pack', href: '/return-pack', current: false },
]


export default function Header() {
    const { logout, success, error } = useAuth();
    const router = useRouter();
    const { user, loading, error: userError ,fetchUser } = useUser();
    const orders = user?.orders || [];
    const orderDetails = orders.map(order => ({
        meals: order.meals,
        id: order.orderId,
        price: order.totalPrice
    }));

    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const handleLogout = async () => {
        await logout();
        router.push('/login'); // Redirect to the login page after logout
    };

    return (
        <Disclosure as="nav" className="bg-white w-full lg:px-20 ">
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start " >
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
                                className="lg:h-20 h-24 w-auto"

                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block  w-[80%] lg:flex lg:items-center lg:justify-between">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={
                                            item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white'}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center justify-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">



                        <CartDrawer />
                        {/* Profile dropdown */}
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="avatar-custom transition-transform bg-cover border-2 border-black"
                                    name={user?.firstName || 'User'}
                                    size="md"
                                    src={user?.imageUrl}
                                    isBordered
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2 space-x-3">
                                    <p className="font-semibold">{user?.firstName}-({user?.code})</p>
                                    <p className="font-semibold">{user?.email}</p>
                                    <p className="font-semibold">{user?.agency.company}</p>
                                </DropdownItem>
                                <DropdownItem key="team_settings">Profile</DropdownItem>
                                <DropdownItem key="analytics">Orders</DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>

        </Disclosure>
    );
}
