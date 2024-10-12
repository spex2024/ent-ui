'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { UsersIcon, Menu, Package2, Search, ChevronDown, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/auth";
import toast from 'react-hot-toast';
import useReturnedPacksStore from "@/store/return-pack";
import useAdminStore from "@/store/user";
import Image  from "next/image";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, success, error } = useAuth();
    const router = useRouter();
    const { newPacks, fetchReturnedPacks } = useReturnedPacksStore();
    const { user, fetchUser } = useAdminStore();

    useEffect(() => {
        fetchReturnedPacks();
        fetchUser();
    }, [fetchReturnedPacks, fetchUser]);

    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const navItems = [
        { href: '/', label: 'Dashboard' },
        { href: '/daily-orders', label: 'Daily Orders' },
        { href: '/orders', label: 'Orders' },
        { href: '/users', label: 'Users' },
        { href: '/vendors', label: 'Vendors' },
        { href: '/enterprises', label: 'Enterprise' },
        {
            href: '#',
            label: 'Subscription',
            subItems: [
                { href: 'add-subscription', label: 'One-Time' },
                { href: '/custom', label: 'Custom' },
            ]
        },
        { href: "/return-pack", label: "Return Pack" },
    ];

    return (
        <header className="z-10 w-full sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex items-center flex-1">
                <Link href={'/'} className="flex items-center gap-2 text-lg font-semibold md:text-base mr-4">
                    <Image
                        alt={"spex africa"}
                        height={70}
                        src={
                            "https://res.cloudinary.com/ddwet1dzj/image/upload/v1722177650/spex_logo-03_png_dui5ur.png"
                        }
                        width={70}
                    />
                </Link>
                <nav className="hidden lg:flex flex-row items-center gap-6 text-sm font-medium">
                    {navItems.map((item, index) => (
                        item.subItems ? (
                            <DropdownMenu key={index}>
                                <DropdownMenuTrigger className="flex items-center text-muted-foreground transition-colors hover:text-foreground">
                                    {item.label}
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <DropdownMenuItem key={subIndex}>
                                            <Link href={subItem.href} className="w-full text-xs">
                                                {subItem.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                key={index}
                                href={item.href}
                                className={`text-muted-foreground transition-colors hover:text-foreground ${item.label === 'Return Pack' ? 'relative' : ''}`}
                            >
                                {item.label}
                                {item.label === 'Return Pack' && newPacks > 0 && (
                                    <span className="absolute -top-3 -right-3 text-xs font-light text-white bg-red-600 rounded-full h-4 w-4 flex items-center justify-center">
                    {newPacks}
                  </span>
                                )}
                            </Link>
                        )
                    ))}
                </nav>
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 lg:hidden" onClick={() => setIsOpen(true)}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <nav className="grid gap-6 text-lg font-medium mt-6">
                        {navItems.map((item, index) => (
                            item.subItems ? (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-foreground">
                                        {item.label}
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <DropdownMenuItem key={subIndex}>
                                                <Link href={subItem.href} className="w-full" onClick={() => setIsOpen(false)}>
                                                    {subItem.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <UsersIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="flex flex-col items-start justify-center h-14">
                            <p className="font-bold">{user.firstName} {user.lastName}</p>
                            <p className="font-light text-sm">{user.username}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;