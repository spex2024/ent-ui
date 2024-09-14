
'use client'
import {
    Check, EyeIcon,
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle, X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useReturnedPacksStore from "@/store/return-pack";
import { useEffect, useState } from "react";
import useAuth from "@/hook/auth";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface Pack {
    _id: string;
    code: string;
    status: string;
    createdAt: string;
    user : {
        firstName: string,
        lastName: string,
        code : string,
        agency :{
            company: string,
        }
    }
    disabled: Boolean;
}

const ROWS_PER_PAGE = 10;

export default function ReturnPackPage() {
    const { returnedPacks, fetchReturnedPacks, updatePackStatus, loading, error } = useReturnedPacksStore();
    const { handlePackRequest, success, error: authError } = useAuth();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginatedPacks, setPaginatedPacks] = useState<Pack[]>([]);

    useEffect(() => {
        fetchReturnedPacks();
    }, [fetchReturnedPacks]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, returnedPacks.length);
        setPaginatedPacks(returnedPacks.slice(startIndex, endIndex));
    }, [returnedPacks, currentPage]);

    const totalPages = Math.ceil(returnedPacks.length / ROWS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        console.log(`Handling action: id=${id}, action=${action}`);
        try {
            await handlePackRequest({ id, action });
            console.log(`Action ${action} handled successfully`);
            updatePackStatus(id, action === 'approve' ? 'Approved' : 'Rejected');
            console.log(`Pack with ID ${id} ${action === 'approve' ? 'approved' : 'rejected'}`);
        } catch (err) {
            console.error(`Failed to ${action} pack with ID ${id}`, err);
        }
    };



    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [isAuthenticated, router]);

    // Optionally, you can return a loading indicator while checking authentication
    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-100 px-20">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="active">Pending</TabsTrigger>
                                <TabsTrigger value="draft">Approved</TabsTrigger>
                                <TabsTrigger value="archived" className="hidden sm:flex">
                                    Rejected
                                </TabsTrigger>
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
                                        <DropdownMenuItem>
                                            Approved
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Pending</DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Rejected
                                        </DropdownMenuItem>
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
                            <Card className="bg-white bg-opacity-30 backdrop-blur-md border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Pack Requests</CardTitle>
                                    <CardDescription>
                                        Manage and process pack requests here.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Code</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedPacks.map((pack: Pack) => (
                                                <TableRow key={pack?._id}>
                                                    <TableCell className="font-medium text-gray-900">{pack?.code}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={`bg-transparent border px-3 py-1.5 rounded-full shadow-none ${
                                                                pack?.status === 'Approved'
                                                                    ? 'bg-teal-100 text-teal-800'
                                                                    : pack?.status === 'Pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : pack?.status === 'Rejected'
                                                                            ? 'bg-red-100 text-red-800'
                                                                            : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {pack?.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(pack?.createdAt).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            pack.status === 'Pending'? (
                                                                <>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="icon"
                                                                                    onClick={() => handleAction(pack?._id, 'approve')}
                                                                                >
                                                                                    <Check className="h-4 w-4" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                Complete Order
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="icon"
                                                                                    onClick={() => handleAction(pack?._id, 'reject')}
                                                                                >
                                                                                    <X className="h-4 w-4" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                Cancel Order
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"

                                                                                >
                                                                                    <EyeIcon className="h-4 w-4" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent  className={`w-36 h-36 flex flex-col items-center justify-center bg-white text-black border border-black`}>
                                                                                <h2 className={`font-bold mb-2`}>Order Details</h2>
                                                                                    <div className={`w-full  px-3 space-y-2 `}>
                                                                                        <h1>{pack?.code}</h1>



                                                                                    </div>

                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </>
                                                            ): (
                                                               <>
                                                                   <TooltipProvider>
                                                                       <Tooltip>
                                                                           <TooltipTrigger asChild>
                                                                               <Button
                                                                                   variant="ghost"
                                                                                   size="icon"

                                                                               >
                                                                                   <EyeIcon className="h-4 w-4" />
                                                                               </Button>
                                                                           </TooltipTrigger>
                                                                           <TooltipContent  className={`w-72 h-36 flex flex-col items-center justify-center bg-white text-black border border-black`}>
                                                                               <h2 className={`w-full font-bold mb-2 px-3`}>Pack Details</h2>
                                                                               <div className={`w-full  px-3 space-y-2 text-xs`}>
                                                                                   <h1> Code : {pack?.code}</h1>
                                                                                   <h1> User : {`${pack?.user?.firstName} ${pack?.user?.lastName}`}</h1>
                                                                                   <h1> Enterprise: {pack?.user?.agency.company}</h1>



                                                                               </div>

                                                                           </TooltipContent>
                                                                       </Tooltip>
                                                                   </TooltipProvider>
                                                               </>
                                                            )
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="w-full bg-white border-t border-gray-200 flex justify-between items-center py-4">
                                    <Pagination className="flex items-center w-[70%]">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                />
                                            </PaginationItem>
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <PaginationItem key={index + 1}>
                                                    <PaginationLink
                                                        href="#"
                                                        onClick={() => handlePageChange(index + 1)}
                                                        isActive={currentPage === index + 1}
                                                    >
                                                        {index + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                    <div className="text-xs text-muted-foreground w-[50%]">
                                        Showing <strong>{paginatedPacks.length > 0 ? ((currentPage - 1) * ROWS_PER_PAGE) + 1 : 0}</strong> -{' '}
                                        <strong>{Math.min(currentPage * ROWS_PER_PAGE, returnedPacks.length)}</strong> of <strong>{returnedPacks.length}</strong> requests
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
