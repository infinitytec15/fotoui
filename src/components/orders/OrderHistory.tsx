import React, { useState } from "react";
import { Package, Truck, Eye, Download, Filter, Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface OrderHistoryProps {
  orders?: Order[];
}

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  deliveryMethod: "school" | "home";
  trackingNumber?: string;
  schoolPickupDetails?: {
    school: string;
    date: string;
  };
  deliveryAddress?: string;
}

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  photoId: string;
  previewUrl: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders = defaultOrders,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOrders = orders.filter((order) => {
    if (filter !== "all" && order.status !== filter) return false;
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "shipped":
        return <Badge variant="default">Shipped</Badge>;
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Delivered
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getDeliveryIcon = (method: Order["deliveryMethod"]) => {
    return method === "school" ? (
      <Package className="h-4 w-4 mr-1" />
    ) : (
      <Truck className="h-4 w-4 mr-1" />
    );
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order History</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search order ID..."
                className="pl-8 h-9 w-[200px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="recent">Recent Orders</TabsTrigger>
            <TabsTrigger value="school">School Pickup</TabsTrigger>
            <TabsTrigger value="home">Home Delivery</TabsTrigger>
          </TabsList>

          {["all", "recent", "school", "home"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No orders found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery
                        ? "Try a different search term"
                        : "You haven't placed any orders yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredOrders
                    .filter((order) => {
                      if (tab === "all") return true;
                      if (tab === "recent")
                        return (
                          new Date(order.date) >
                          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                        );
                      if (tab === "school")
                        return order.deliveryMethod === "school";
                      if (tab === "home")
                        return order.deliveryMethod === "home";
                      return true;
                    })
                    .map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                Order #{order.id}
                              </CardTitle>
                              <CardDescription>
                                Placed on{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(order.status)}
                              <div className="flex items-center text-sm text-muted-foreground">
                                {getDeliveryIcon(order.deliveryMethod)}
                                {order.deliveryMethod === "school"
                                  ? "School Pickup"
                                  : "Home Delivery"}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell className="flex items-center space-x-3">
                                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                                      <img
                                        src={item.previewUrl}
                                        alt={item.productName}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <span>{item.productName}</span>
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    ${item.price.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                          <div className="mt-4 flex justify-between items-center pt-4 border-t">
                            <div>
                              {order.deliveryMethod === "school" &&
                                order.schoolPickupDetails && (
                                  <div className="text-sm">
                                    <span className="font-medium">Pickup:</span>{" "}
                                    {order.schoolPickupDetails.school} on{" "}
                                    {new Date(
                                      order.schoolPickupDetails.date,
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              {order.deliveryMethod === "home" &&
                                order.deliveryAddress && (
                                  <div className="text-sm">
                                    <span className="font-medium">
                                      Delivery Address:
                                    </span>{" "}
                                    {order.deliveryAddress}
                                  </div>
                                )}
                              {order.trackingNumber && (
                                <div className="text-sm mt-1">
                                  <span className="font-medium">Tracking:</span>{" "}
                                  {order.trackingNumber}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                Total
                              </div>
                              <div className="text-lg font-bold">
                                ${order.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

// Default mock data
const defaultOrders: Order[] = [
  {
    id: "ORD-2023-001",
    date: "2023-10-15",
    status: "delivered",
    total: 45.99,
    deliveryMethod: "school",
    schoolPickupDetails: {
      school: "Lincoln Elementary School",
      date: "2023-10-25",
    },
    items: [
      {
        id: "ITEM-001",
        productName: "Photo Mug",
        quantity: 1,
        price: 15.99,
        photoId: "PHOTO-001",
        previewUrl:
          "https://images.unsplash.com/photo-1577741314755-048d8525d31e?w=300&q=80",
      },
      {
        id: "ITEM-002",
        productName: "Photo Frame (8x10)",
        quantity: 2,
        price: 14.99,
        photoId: "PHOTO-002",
        previewUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
      },
    ],
  },
  {
    id: "ORD-2023-002",
    date: "2023-11-05",
    status: "shipped",
    total: 89.97,
    deliveryMethod: "home",
    trackingNumber: "TRK123456789",
    deliveryAddress: "123 Main St, Anytown, CA 12345",
    items: [
      {
        id: "ITEM-003",
        productName: "Photo Calendar",
        quantity: 1,
        price: 24.99,
        photoId: "PHOTO-003",
        previewUrl:
          "https://images.unsplash.com/photo-1517677129300-07b130802f46?w=300&q=80",
      },
      {
        id: "ITEM-004",
        productName: "Photo Keychain Set",
        quantity: 3,
        price: 21.99,
        photoId: "PHOTO-004",
        previewUrl:
          "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80",
      },
    ],
  },
  {
    id: "ORD-2023-003",
    date: "2023-11-20",
    status: "processing",
    total: 67.5,
    deliveryMethod: "school",
    schoolPickupDetails: {
      school: "Washington High School",
      date: "2023-12-10",
    },
    items: [
      {
        id: "ITEM-005",
        productName: "Class Photo Package",
        quantity: 1,
        price: 45.5,
        photoId: "PHOTO-005",
        previewUrl:
          "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&q=80",
      },
      {
        id: "ITEM-006",
        productName: "Photo Magnet",
        quantity: 2,
        price: 10.99,
        photoId: "PHOTO-006",
        previewUrl:
          "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=300&q=80",
      },
    ],
  },
];

export default OrderHistory;
