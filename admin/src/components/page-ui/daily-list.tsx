import { useEffect, useState, useCallback } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Printer } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Meal {
    main: string;
    protein: string;
    extras: string;
    sauce: string;
}

interface Order {
    _id: string;
    orderId: string;
    user: string;
    vendor: { _id: string; name: string; location: string };
    quantity: number;
    status: string;
    totalPrice: number;
    createdAt: string;
    userName?: string;
    userCode?: string;
    meals: Meal[];
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    code: string;
    orders: Order[];
}

interface AccordionCardProps {
    enterprise: string;
    location: string;
    user: User[];
    image: string;
}

export function DailyAccordionCard({ enterprise, location, user, image }: AccordionCardProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrdersCount, setNewOrdersCount] = useState(0);

    const isToday = (dateString: string) => {
        const today = new Date();
        const date = new Date(dateString);
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const updateNewOrdersCount = useCallback(() => {
        const pendingOrdersCount = orders.reduce((count, order) =>
                count + (order.status === 'Pending' ? 1 : 0)
            , 0);

        setNewOrdersCount(pendingOrdersCount);
    }, [orders]);

    useEffect(() => {
        const allOrders = user.flatMap((user: User) =>
            user.orders.map(order => ({
                ...order,
                userName: `${user.firstName} ${user.lastName}`,
                userCode: `${user.code}`,
            }))
        );

        const todayOrders = allOrders.filter(order => isToday(order.createdAt));
        todayOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setOrders(todayOrders);
    }, [user]);

    useEffect(() => {
        updateNewOrdersCount();
    }, [orders, updateNewOrdersCount]);

    const handlePrint = () => {
        const doc = new jsPDF({ orientation: 'landscape' });

        (doc as any).autoTable({
            head: [['User', 'Code', 'Enterprise', 'Branch', 'Vendor', 'Quantity', 'Total Price', 'Meals']],
            body: orders.map(order => [
                order.userName,
                order.userCode,
                enterprise,
                location,
                `${order.vendor.name} (${order.vendor.location})`,
                order.quantity,
                order.totalPrice,
                order.meals.map(meal => `${meal.main}  ${meal.protein} , ${meal.sauce} , ${meal.extras}`).join(' '),
            ]),
            styles: {
                fontSize: 8,
            },
        });

        doc.save('orders.pdf');
    };

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={enterprise}>
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <img src={image} alt={enterprise} width={50} className="rounded-full w-12 h-12 border-2 border-black" />
                        <ul className="flex items-center capitalize">
                            <li>{enterprise}</li>
                            <Minus size={20} strokeWidth={1} />
                            <li>{location}</li>
                        </ul>
                        {newOrdersCount > 0 && (
                            <span className="ml-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                {newOrdersCount} New
                            </span>
                        )}
                        <button onClick={handlePrint} className="ml-auto">
                            <Printer size={24} className="text-gray-700 hover:text-black" />
                        </button>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 lg:grid-cols-4">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="w-full flex flex-col py-2 border-l-2 p-5 gap-1 text-xs">
                                <div className="w-full flex flex-col">
                                    <h1 className="text-sm font-bold capitalize">User Info</h1>
                                    <p><strong>User:</strong> {order.userName}</p>
                                    <p><strong>Pack No.:</strong> {order.userCode}</p>
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-col gap-1 mt-2">
                                        <h1 className="text-sm font-bold">Order Details</h1>
                                        <p><strong>Order Id:</strong> {order.orderId}</p>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        {order.meals.map((meal, index) => (
                                            <div key={index} className="w-full flex flex-col gap-1 capitalize">
                                                <p><strong>Main Meal:</strong> {meal.main}</p>
                                                <p><strong>Option-1:</strong> {meal.protein}</p>
                                                <p><strong>Option-2:</strong> {meal.sauce}</p>
                                                <p><strong>Option-3:</strong> {meal.extras}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No orders for today.</p>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
