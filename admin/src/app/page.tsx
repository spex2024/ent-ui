'use client';

import Link from "next/link";
import {ArrowUpRight, CircleArrowLeft, CircleArrowRight} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/page-ui/header";
import useOrdersStore from "@/store/order";
import useAgencyStore from "@/store/agency";
import useVendorStore from "@/store/vendors";
import useUserStore from "@/store/users";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal,
  useEffect,
  useState
} from "react";

interface Order {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    agency: {
      company: string;
    };
  };
  meals: {
    mealId: string;
    main?: string;
    price?: number;
  }[];
  quantity: number;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const {orders, fetchOrders} = useOrdersStore();
  const {agencies, fetchAgencies} = useAgencyStore();
  const {vendors, fetchVendors} = useVendorStore();
  const {user, fetchUser} = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Calculate pagination details
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders
      .slice()
      .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(indexOfFirstOrder, indexOfLastOrder);

  // Pagination controls
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  // Top 5 vendors sorted by sales and orders
  const topVendors = vendors
      .slice()
      .sort((a: { totalSales: number; }, b: { totalSales: number; }) => b.totalSales - a.totalSales)
      .slice(0, 5);

  useEffect(() => {
    fetchAgencies();
    fetchVendors();
    fetchUser();
    fetchOrders();
  }, [fetchAgencies, fetchVendors, fetchUser, fetchOrders]);

  return (
      <div className="flex min-h-screen w-full flex-col">
        <Header/>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders?.length ?? 0}</div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enterprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agencies?.length ?? 0}</div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vendors?.length}</div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.length ?? 0}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>Recent transactions from your store.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="#">View All <ArrowUpRight className="h-4 w-4"/></Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table className={`text-xs`}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Meal</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order: Order) => (
                        <TableRow key={order._id}>
                          <TableCell>
                            <div className="font-medium capitalize">{order.user?.firstName} {order.user?.lastName}</div>
                            <div className="text-xs text-muted-foreground md:inline capitalize">{order.user?.agency?.company}</div>
                          </TableCell>
                          <TableCell>{order?.meals.map((meal) => (
                              <div key={meal?.mealId}>{meal.main || 'N/A'}</div>))}</TableCell>
                          <TableCell>{order?.quantity}</TableCell>
                          <TableCell><Badge className="text-xs capitalize" variant="outline">{order?.status}</Badge></TableCell>
                          <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>GH₵{order?.meals.reduce((total, meal) => total + (meal.price || 0), 0)}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="w-full flex items-center justify-items-center text-xs">
                  <Button disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                          className="h-7 gap-1 bg-none rounded-none "
                          variant='ghost'
                  >

                    <CircleArrowLeft size={16} strokeWidth={1.25}/> Previous
                  </Button>
                  <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
                  <Button disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="h-7 gap-1 bg-none rounded-none "
                          variant='ghost'
                  >Next <CircleArrowRight size={16} strokeWidth={1.25}/></Button>
                </div>
              </CardFooter>

            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Top 5 Vendors</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8 text-xs">
                {topVendors.map((vendor: {
                  _id: Key | null | undefined;
                  imageUrl: string | undefined;
                  code: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                  name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                  location: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; totalSales: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                    <div className="flex items-center gap-4" key={vendor._id}>
                      <Avatar className="hidden h-10 w-10 sm:flex rounded">
                        <AvatarImage src={vendor.imageUrl} alt="Avatar" />
                        <AvatarFallback>{vendor.code}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className=" font-medium leading-none capitalize">{vendor.name}</p>
                        <p className=" text-muted-foreground capitalize">{vendor.location}</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <p className=" font-medium leading-none">GH₵ {vendor.totalSales}</p>
                        <p className="text-muted-foreground">Total Sales</p>
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
}
