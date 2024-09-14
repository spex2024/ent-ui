import {SetStateAction, useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    CircleArrowLeft,
    CircleArrowRight, Edit, Edit2, EyeIcon,
    File,
    Home,
    LineChart,
    ListFilter, LucideDelete, LucideEdit3,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    Search,
    ShoppingCart, TrashIcon,
    Users2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import useAuth from "@/hook/auth";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import toast from "react-hot-toast";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    returnedPack: number;
    createdAt: string;
    imageUrl: string;
    isVerified: Boolean;
    points: number;
    orders: []
}

interface DataTableProps {
    user: User[];
}

export default function DataTable({ user }: DataTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const { deleteUser, success, error } = useAuth();
    const rowsPerPage = 5

    const totalPages = Math.ceil(user.length / rowsPerPage)

    const handlePageChange = (newPage: SetStateAction<number>) => {
        setCurrentPage(newPage)
    }

    useEffect(() => {
        if (success) {
            toast.success(success);
        } else if (error) {
            toast.error(error);
        }
    }, [success, error]);


    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
    };

    // Component code

    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentRows = user.slice(startIndex, endIndex)

    const filterUsersByStatus = (status: 'all' | 'active' | 'inactive') => {
        if (status === 'all') {
            return user
        }
        return user.filter((user) => status === 'active' ? user.isVerified : !user.isVerified)
    }

    const renderTable = (filteredUsers: User[]) => {
        const currentRows = filteredUsers.slice(startIndex, endIndex)
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={'text-sm'}>
                    {currentRows.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <Image
                                    src={user.imageUrl}
                                    width={40}
                                    height={40}
                                    alt={user.firstName}
                                    className="object-cover rounded-lg"
                                />
                            </TableCell>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.points}</TableCell>
                            <TableCell>{user.isVerified === true ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.orders.length}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <TooltipProvider>
                                <div className="flex space-x-2 cursor-pointer">

                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 p-0"
                                            >
                                                <EyeIcon/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="flex flex-col">
                                                <Button  size="sm"
                                                        className="w-full text-left">View user details</Button>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 p-0"
                                            >
                                                <LucideEdit3 size={16}/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="flex flex-col">
                                                <Button  size="sm"
                                                        className="w-full text-left">update user</Button>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                <TrashIcon size={16}/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>

                                                <Button  size="sm"
                                                        className="w-full text-left" >Delete user</Button>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5"/>
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 gap-1">
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button size="sm" variant="outline" className="h-7 gap-1">
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>

                            </div>
                        </div>
                        <TabsContent value="all">
                            {renderTable(filterUsersByStatus('all'))}
                        </TabsContent>
                        <TabsContent value="active">
                            {renderTable(filterUsersByStatus('active'))}
                        </TabsContent>
                        <TabsContent value="inactive">
                            {renderTable(filterUsersByStatus('inactive'))}
                        </TabsContent>
                    </Tabs>
                    <div className="w-full flex items-center justify-center gap-10">
                        <div className="flex items-center gap-5">
                            <Button
                                className="h-7 gap-1 bg-none rounded-none "
                                variant="ghost"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <CircleArrowLeft size={20} strokeWidth={1.25} /> Previous
                            </Button>
                            <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
                            <Button
                                variant="ghost"
                                disabled={currentPage === totalPages}
                                className="h-7 gap-1 bg-none rounded-none "
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next <CircleArrowRight size={20} strokeWidth={1.25} />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
