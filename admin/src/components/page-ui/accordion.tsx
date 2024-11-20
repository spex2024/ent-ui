import { useEffect, useState, useCallback } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus } from "lucide-react";
import OrderTable from "@/components/page-ui/order-table";

// Define the Meal type
interface Meal {
    main: string;
    proteinOptions: string[];
    drinksOptions: string[];
    stewOptions: string[];
    comments?: string;
}

interface Vendor {
    _id: string;
    name: string;
    location: string;
}
// Define the Order type
interface Order {
    _id: string;
    orderId: string;
    user: User;
    vendor: Vendor;
    mealId:string;
    mealName:string
    options:{
        protein:string;
        sauce:string;
        extras:[];
    }
    price:number;

    selectedDays:[]
    quantity: number;
    status: string;
    totalPrice: number;
    imageUrl: string;
    createdAt: Date ;
    userName?: string;
    code : string
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    orders: Order[];
}

interface AccordionCardProps {
    name: string;
    location: string;
    user: any;
    image: string;
}



export function AccordionCard({ name, location, user, image }: AccordionCardProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrdersCount, setNewOrdersCount] = useState(0);

    const updateNewOrdersCount = useCallback(() => {
        const pendingOrdersCount = orders.reduce((count, order) =>
                count + (order.status === 'pending' ? 1 : 0)
            , 0);

        setNewOrdersCount(pendingOrdersCount);
    }, [orders]);

    useEffect(() => {
        const allOrders = user.flatMap((user: { orders: any; }) => user.orders);
        setOrders(allOrders);
    }, [user]);

    useEffect(() => {
        updateNewOrdersCount();
    }, [orders, updateNewOrdersCount]);

    const handleOrderStatusChange = (updatedOrder: Order) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
            );
            return updatedOrders;
        });
    };

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={name}>
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <img src={image} alt={name} width={50}  className={`rounded-full w-12 h-12 border-2 border-black`} />
                        <ul className="flex items-center">
                            <li>{name}</li>
                            <Minus size={20} strokeWidth={1} />
                            <li>{location}</li>
                        </ul>
                        {newOrdersCount > 0 && (
                            <span className="ml-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                {newOrdersCount} New
                            </span>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <OrderTable users={user} onOrderStatusChange={handleOrderStatusChange} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
