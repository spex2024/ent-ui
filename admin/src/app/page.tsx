'use client';

import Link from "next/link";
import { ArrowUpRight, CircleArrowLeft, CircleArrowRight, Leaf, Package, Clock, XCircle, ShoppingCart, Users, Building, Store, TrendingUp, TrendingDown, DollarSign, Star, Coins } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/page-ui/header";
import useOrdersStore from "@/store/order";
import useAgencyStore from "@/store/agency";
import useVendorStore from "@/store/vendors";
import useUserStore from "@/store/users";
import { useEffect, useState } from "react";

interface Vendor {
  _id: string;
  name: string;
  location: string;
  totalSales: number;
  imageUrl: string;
  code: string;
  rating: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  code: string;
  orders: Order[];
  agency: {
    company: string;
  };
  emissionSaved: number;
  points: number;
  moneyBalance: number;
}

interface Order {
  _id: string;
  orderId: string;
  user: User;
  vendor: Vendor;
  mealId: string;
  mealName: string;
  options: {
    protein: string;
    sauce: string;
    extras: [];
  };
  price: number;
  selectedDays: [];
  quantity: number;
  status: string;
  totalPrice: number;
  imageUrl: string;
  createdAt: Date;
  userName?: string;
  code: string;
}

interface StatCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  description: string;
  unit?: string;
}

export default function Dashboard() {
  const { orders, fetchOrders } = useOrdersStore();
  const { agencies, fetchAgencies } = useAgencyStore();
  const { vendors, fetchVendors } = useVendorStore();
  const { user, fetchUser } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchAgencies();
    fetchVendors();
    fetchUser();
    fetchOrders();
  }, [fetchAgencies, fetchVendors, fetchUser, fetchOrders]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = orders
      .slice()
      .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  const topVendors = vendors
      .slice()
      .sort((a: { totalSales: number; }, b: { totalSales: number; }) => b.totalSales - a.totalSales)
      .slice(0, 5);

  const completedOrders = orders.filter((order: Order) => order.status === 'completed').length;
  const pendingOrders = orders.filter((order: Order) => order.status === 'pending').length;
  const cancelledOrders = orders.filter((order: Order) => order.status === 'cancelled').length;
  const plasticsSaved = user.reduce((total: number, user: User) => total + user.emissionSaved, 0);
  const plasticsPoints = user.reduce((total: number, user: User) => total + user.points, 0);
  const earnedIncentives = user.reduce((total: number, user: User) => total + user.moneyBalance, 0);

  // Calculate previous month's data
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const previousMonthOrders = orders.filter((order: Order) => new Date(order.createdAt) < oneMonthAgo);
  const previousMonthCompletedOrders = previousMonthOrders.filter((order: Order) => order.status === 'completed').length;
  const previousMonthPendingOrders = previousMonthOrders.filter((order: Order) => order.status === 'pending').length;
  const previousMonthCancelledOrders = previousMonthOrders.filter((order: Order) => order.status === 'cancelled').length;
  const previousMonthPlasticsSaved = previousMonthOrders.reduce((total: number, order: Order) => total + order.quantity, 0) * 0.5;

  return (
      <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <StatCard
                title="Total Orders"
                value={orders.length}
                previousValue={previousMonthOrders.length}
                icon={<ShoppingCart className="h-6 w-6" />}
                description="All orders placed"
            />
            <StatCard
                title="Enterprises"
                value={agencies.length}
                previousValue={agencies.length}
                icon={<Building className="h-6 w-6" />}
                description="Registered Enterprises "
            />
            <StatCard
                title="Vendors"
                value={vendors.length}
                previousValue={vendors.length}
                icon={<Store className="h-6 w-6" />}
                description="Registered Food Vendors"
            />
            <StatCard
                title="Users"
                value={user.length}
                previousValue={user.length}
                icon={<Users className="h-6 w-6" />}
                description="Registered Users"
            />
            <StatCard
                title="Completed Orders"
                value={completedOrders}
                previousValue={previousMonthCompletedOrders}
                icon={<Package className="h-6 w-6" />}
                description="Successfully delivered meals"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <StatCard
                title="Platic Saved"
                value={plasticsSaved}
                previousValue={previousMonthPlasticsSaved}
                unit="kg"
                icon={<Leaf className="h-6 w-6" />}
                description="Estimated plastic reduction"
            />
            <StatCard
                title="Plastics Points"
                value={plasticsPoints}
                previousValue={plasticsPoints}
                icon={<Star className="h-6 w-6" />}
                description="Total points earned "
            />
            <StatCard
                title="Earned Incentives"
                value={earnedIncentives}
                previousValue={earnedIncentives}
                unit="GHS"
                icon={<Coins className="h-6 w-6" />}
                description="Total money erned "
            />
            <StatCard
                title="Pending Orders"
                value={pendingOrders}
                previousValue={previousMonthPendingOrders}
                icon={<Clock className="h-6 w-6" />}
                description="Orders awaiting processing"
            />
            <StatCard
                title="Cancelled Orders"
                value={cancelledOrders}
                previousValue={previousMonthCancelledOrders}
                icon={<XCircle className="h-6 w-6" />}
                description="Orders that were cancelled"
            />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-7">
            <Card className="lg:col-span-5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
                  <CardDescription>Overview of the latest orders from your store.</CardDescription>
                </div>
                <Button asChild size="sm" className="hidden sm:flex gap-1">
                  <Link href="#">View All <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Customer</TableHead>
                        <TableHead className="hidden md:table-cell">Meal</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.map((order: Order) => (
                          <TableRow key={order._id} className="hover:bg-muted/50 transition-colors">
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={order.imageUrl} alt={`${order.user?.firstName} ${order.user?.lastName}`} />
                                  <AvatarFallback>{order.user?.firstName?.[0]}{order.user?.lastName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium capitalize text-xs">{order.user?.firstName} {order.user?.lastName}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{order.user?.agency?.company}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell font-medium">
                              {order?.mealName}
                            </TableCell>
                            <TableCell>{order?.quantity}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className={`
                            ${order.status === 'completed' ? "bg-green-100 text-green-800" :
                                  order.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                                      "bg-red-100 text-red-800"}`
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-muted-foreground">
                              {new Date(order?.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right font-medium">GHS {order?.price?.toFixed(2)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full text-xs">
                  <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="h-8 gap-1"
                      variant='outline'
                  >
                    <CircleArrowLeft size={16} strokeWidth={1.25} /> Previous
                  </Button>
                  <span className="hidden sm:inline">{`Page ${currentPage} of ${totalPages}`}</span>
                  <Button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="h-8 gap-1"
                      variant='outline'
                  >
                    Next <CircleArrowRight size={16} strokeWidth={1.25} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Top 5 Vendors</CardTitle>
                <CardDescription>Best performing vendors by total sales</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {topVendors.map((vendor: Vendor, index: number) => (
                    <div className="flex items-center gap-4" key={vendor._id}>
                      <div className="relative">
                        <Avatar className="h-10 w-10 rounded">
                          <AvatarImage src={vendor.imageUrl} alt={`${vendor.name}'s avatar`} />
                          <AvatarFallback>{vendor.code}</AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-yellow-900">
                              {index + 1}
                            </span>
                        )}
                      </div>
                      <div className="grid gap-0.5 flex-1">
                        <p className="font-medium leading-none capitalize">{vendor.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Store className="mr-1 h-3 w-3" />
                          <span className="capitalize">{vendor.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium leading-none flex items-center justify-end">
                          <span className="text-green-500 mr-1">GHS</span>
                          {vendor.totalSales.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-end text-xs text-muted-foreground mt-0.5">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                          {vendor?.rating?.toFixed(1)}
                        </div>
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

function StatCard({ title, value, previousValue, unit, icon, description }: StatCardProps) {
  const trend = previousValue !== 0 ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = trend >= 0;

  return (
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {unit === 'GHS' ? 'GHS ' : ''}
            {typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : value}
            {unit && unit !== 'GHS' && <span className="ml-1 text-xl font-normal text-muted-foreground">{unit}</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <div className="mt-4 flex items-center text-sm">
            {isPositive ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {Math.abs(trend).toFixed(2)}%
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
  );
}