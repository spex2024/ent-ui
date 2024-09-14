import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import {Check, EyeIcon, X} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAuth from "@/hook/auth"

interface Meal {
    main : string;
    mealId:string;
    protein:string;
    sauce:string;
    extras:string;
}

interface Vendor {
    _id: string;
    name: string;
    location: string;
}

interface Order {
    _id: string;
    orderId: string;
    user: string;
    vendor: Vendor;
    meals: Meal[];
    quantity: number;
    status: string;
    totalPrice: number;
    imageUrl: string;
    createdAt: string;
    userName?: string;
    code : string
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    code  : string;
    orders: Order[];
}

interface OrderTableProps {
    users: User[];
    onOrderStatusChange: (updatedOrder: Order) => void;
}

export default function OrderTable({ users, onOrderStatusChange }: OrderTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const [orders, setOrders] = useState<Order[]>(users.flatMap(user =>
        user.orders.map(order => ({
            ...order,
            userName: `${user.firstName} ${user.lastName}`,
            code :`${user.code}`
        }))
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

    const totalPages = Math.ceil(orders.length / rowsPerPage);

    const { completeOrder, cancelOrder } = useAuth();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const filteredOrders = (status: string) =>
        orders.filter(order => status === 'all' || order.status === status).slice(startIndex, endIndex);

    const handleCompleteOrder = async (orderId: string) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order._id === orderId ? { ...order, status: 'Completed' } : order
            )
        );

        try {
            await completeOrder(orderId);
            const updatedOrder = orders.find(order => order._id === orderId);
            if (updatedOrder) {
                onOrderStatusChange({ ...updatedOrder, status: 'Completed' });
            }
        } catch (error) {
            console.error('Failed to complete order:', error);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: 'Pending' } : order
                )
            );
        }
    };

    const handleCancelOrder = async (orderId: string) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order._id === orderId ? { ...order, status: 'Cancelled' } : order
            )
        );

        try {
            await cancelOrder(orderId);
            const updatedOrder = orders.find(order => order._id === orderId);
            if (updatedOrder) {
                onOrderStatusChange({ ...updatedOrder, status: 'Cancelled' });
            }
        } catch (error) {
            console.error('Failed to cancel order:', error);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: 'Pending' } : order
                )
            );
        }
    };


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                {/* Add any additional controls here */}
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>All Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Meals</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Ordered By</TableHead>
                                                <TableHead>Pack Code</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Total Price</TableHead>
                                                <TableHead>Created At</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders('all').map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell>
                                                        <Image
                                                            src={order.imageUrl}
                                                            width={40}
                                                            height={40}
                                                            alt="Order Image"
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{order.orderId}</TableCell>
                                                    <TableCell>
                                                        {order.meals.map(meal => meal.main).join(', ')}
                                                    </TableCell>
                                                    <TableCell>{order.quantity}</TableCell>
                                                    <TableCell>{order.userName}</TableCell>
                                                    <TableCell>{order.code}</TableCell>
                                                    <TableCell>{order.status}</TableCell>
                                                    <TableCell> GH₵{order.totalPrice.toFixed(2)}</TableCell>
                                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="flex space-x-2">
                                                        {order.status === 'Pending'? (
                                                            <>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="icon"
                                                                                onClick={() => handleCompleteOrder(order._id)}
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
                                                                                onClick={() => handleCancelOrder(order._id)}
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
                                                                                onClick={() => handleCancelOrder(order._id)}
                                                                            >
                                                                                <EyeIcon className="h-4 w-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent  className={`w-36 h-36 flex flex-col items-center justify-center bg-white text-black border border-black`}>
                                                                            <h2 className={`font-bold mb-2`}>Order Details</h2>
                                                                            {order?.meals.map(meal =>(
                                                                                <div className={`w-full  px-3 space-y-2 `} key={meal.mealId}>
                                                                                    <h1>{meal.main}</h1>
                                                                                    <h1>{meal.protein}</h1>
                                                                                    <h1>{meal.sauce}</h1>
                                                                                    <h1>{meal.extras}</h1>


                                                                                </div>
                                                                            ))}
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </>
                                                        ):(
                                                            <>
                                                            <TooltipProvider>
                                                            <Tooltip>
                                                            <TooltipTrigger asChild>
                                                            <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleCancelOrder(order._id)}
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent  className={`w-32 h-32 flex flex-col items-center justify-center bg-white text-black border border-black`}>
                                                    <h2 className={`font-bold mb-2`}>Order Details</h2>
                                                    {order?.meals.map(meal =>(
                                                        <div className={`w-full  px-3 space-y-2 `} key={meal.mealId}>
                                                            <h1>{meal.main}</h1>
                                                            <h1>{meal.protein}</h1>
                                                            <h1>{meal.sauce}</h1>
                                                            <h1>{meal.extras}</h1>


                                                        </div>
                                                    ))}
                                                </TooltipContent>
                                                </Tooltip>
                                                </TooltipProvider>
                                                            </>

                                                            )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="pending">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Pending Orders</CardTitle>
                                </CardHeader>
                                <CardContent>

                                </CardContent>
                                <CardFooter className="flex items-center justify-end space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="completed">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Completed Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Meals</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Ordered By</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Total Price</TableHead>
                                                <TableHead>Created At</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders('Completed').map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell>
                                                        <Image
                                                            src={order.imageUrl}
                                                            width={40}
                                                            height={40}
                                                            alt="Order Image"
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{order.orderId}</TableCell>
                                                    <TableCell>
                                                        {order.meals.map(meal => meal.main).join(', ')}
                                                    </TableCell>
                                                    <TableCell>{order.quantity}</TableCell>
                                                    <TableCell>{order.userName}</TableCell>
                                                    <TableCell>{order.status}</TableCell>
                                                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="flex space-x-2">
                                                        {/* Actions for Completed Orders */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="cancelled">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Cancelled Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Meals</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Ordered By</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Total Price</TableHead>
                                                <TableHead>Created At</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders('Cancelled').map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell>
                                                        <Image
                                                            src={order.imageUrl}
                                                            width={40}
                                                            height={40}
                                                            alt="Order Image"
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{order.orderId}</TableCell>
                                                    <TableCell>
                                                        {order.meals.map(meal => meal.main).join(', ')}
                                                    </TableCell>
                                                    <TableCell>{order.quantity}</TableCell>
                                                    <TableCell>{order.userName}</TableCell>
                                                    <TableCell>{order.status}</TableCell>
                                                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="flex space-x-2">
                                                        {/* Actions for Cancelled Orders */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
