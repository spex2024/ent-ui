
'use client';
import React, { useEffect } from 'react';
import Link from "next/link";
import { UsersIcon, Menu, Package2, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/auth";
import toast from 'react-hot-toast';
import useReturnedPacksStore from "@/store/return-pack";
import useAdminStore from "@/store/user";
import useAuthStore from "@/store/authenticate";


const Header: React.FC = () => {
    const { logout, success, error } = useAuth();
    const router = useRouter();
    const { newPacks, fetchReturnedPacks } = useReturnedPacksStore();
    const {user , fetchUser}= useAdminStore()
    // const { logout:clear ,isAuthenticated } = useAuthStore();


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!isAuthenticated) {
    //             router.push('/login'); // Redirect to login page if not authenticated
    //         }
    //     }, 1000); // Adjust the delay as needed
    //
    //     return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    // }, [isAuthenticated, router]);

    useEffect(() => {
        fetchReturnedPacks(); // Fetch packs on component mount
    }, [fetchReturnedPacks]);
  useEffect(() => {
        fetchUser(); // Fetch packs on component mount
    }, [fetchUser]);


    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);



    const handleLogout = async () => {
        await logout();
        // clear()
        router.push('/login'); // Redirect to the login page after logout
    };

    useEffect(() => {
        // Set a timeout to automatically log out after 2 minutes (120,000 milliseconds)
        const logoutTimer = setTimeout(() => {
            handleLogout();
        }, 86400000);

        // Clear the timeout if the component unmounts or the user logs out before the timer completes
        return () => clearTimeout(logoutTimer);
    }, []);
    // if (!isAuthenticated) return null;
    return (
        <header className="z-10 w-full sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                className="hidden lg:w-[80%] flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href={'/'}
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6"/>
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    href={'/'}
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    href={'/daily-orders'}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Daily Orders
                </Link> <Link
                    href={'/orders'}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Orders
                </Link>
                <Link
                    href={'/users'}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Users
                </Link>
                <Link
                    href={'/vendors'}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Vendors
                </Link>
                <Link
                    href={'/enterprises'}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Enterprise
                </Link>
                <Link
                    href={"/return-pack"}
                    className="relative text-muted-foreground transition-colors hover:text-foreground"
                >
                    Return Pack
                    {newPacks > 0 && (
                        <span className="absolute -top-3 -right-3 text-xs font-light text-white bg-red-600 rounded-full h-4 w-4 flex items-center justify-center">
                            {newPacks}
                        </span>
                    )}
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link href={'/'} className="hover:text-foreground">
                            Dashboard
                        </Link>
                        <Link
                            href={'/daily-orders'}
                            className="text-muted-foreground hover:text-foreground"
                        >

                            Daily Orders
                        </Link>
                        <Link
                            href={'/orders'}
                            className="text-muted-foreground hover:text-foreground"
                        >

                            Orders
                        </Link>
                        <Link
                            href={'/users'}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Users
                        </Link>
                        <Link
                            href={'/vendors'}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Vendors
                        </Link>
                        <Link
                            href={'/enterprises'}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Enterprise
                        </Link>
                        <Link
                            href={'/return-pack'}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Return Pack
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <UsersIcon className="h-5 w-5"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`w-52`}>
                        <DropdownMenuLabel className="w-full h-14 items-center justify-start flex flex-col ">
                            <p className={`w-full font-bold flex gap-2`}>{user.firstName} {user.lastName}</p>
                            <p className={`w-full font-light`}>{user.username}</p>

                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;



