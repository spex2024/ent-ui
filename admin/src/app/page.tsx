'use client'

import Link from "next/link"
import {
  ArrowUpRight,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent, CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Header from "@/components/page-ui/header";
import useOrdersStore from "@/store/order";
import useAgencyStore from "@/store/agency";
import useVendorStore from "@/store/vendors";
import useUserStore from "@/store/users";
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect} from "react";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";

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
  }[];
  quantity: number;
  status: string;
  createdAt: string;
  totalPrice: number;
}

export default function Dashboard() {
  const {orders ,fetchOrders} = useOrdersStore()
  const {agencies, fetchAgencies} = useAgencyStore()
  const {vendors, fetchVendors} = useVendorStore()
  const {user, fetchUser} = useUserStore()
  // const { isAuthenticated } = useAuthStore();
  // const router = useRouter();




  useEffect(() => {
    fetchAgencies()
  }, [fetchAgencies])

  useEffect(() => {
    fetchVendors()
  }, [fetchVendors])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])
  // // Optionally, you can return a loading indicator while checking authentication
  // if (!isAuthenticated || user === null ) {
  //   return (
  //       <div className="flex items-center justify-center min-h-screen">
  //         <ScaleLoader color={'#000'} />
  //       </div>
  //   );
  // }
  return (
      <div className="flex min-h-screen w-full flex-col">
        <Header/>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders?.length ?? 0}</div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Enterprise
                </CardTitle>
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
                <div className="text-2xl font-bold">{vendors.length}</div>
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
                  <CardDescription>
                    Recent transactions from your store.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4"/>
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
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
                    {orders.map((order: Order) => (
                        <TableRow key={order._id}>
                          <TableCell>
                            <div className="font-medium">
                              {order.user.firstName} {order.user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground md:inline">
                              {order.user.agency.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.meals.map((meal) => (
                                <div key={meal.mealId}>{meal.main || 'N/A'}</div>
                            ))}
                          </TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            <Badge className="text-xs" variant="outline">
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>GH₵{order.totalPrice.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Vendors</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                {vendors?.map((vendor: { _id: Key | null | undefined; imageUrl: string | undefined; code: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; location: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; totalSales: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
                    <div className="flex items-center gap-4" key={vendor._id}>
                      <Avatar className="hidden h-12 w-13 sm:flex">
                        <AvatarImage src={vendor.imageUrl} alt="Avatar" />
                        <AvatarFallback>{vendor.code}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor.location}</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <p className="text-sm font-medium leading-none">GH₵ {vendor.totalSales}</p>
                        <p className="text-xs text-muted-foreground">Total Sales</p>
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  )
}
