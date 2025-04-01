import React from "react";
import ActionCard from "./ActionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Package, ShoppingCart } from "lucide-react";

interface DashboardGridProps {
  onActionSelect?: (action: string) => void;
  recentOrders?: Array<{
    id: string;
    date: string;
    status: "processing" | "shipped" | "delivered";
    total: string;
  }>;
  upcomingEvents?: Array<{
    id: string;
    title: string;
    date: string;
    school: string;
  }>;
}

const DashboardGrid = ({
  onActionSelect = () => {},
  recentOrders = [
    {
      id: "ORD-001",
      date: "2023-09-15",
      status: "processing" as const,
      total: "$45.99",
    },
    {
      id: "ORD-002",
      date: "2023-09-10",
      status: "shipped" as const,
      total: "$32.50",
    },
    {
      id: "ORD-003",
      date: "2023-09-05",
      status: "delivered" as const,
      total: "$78.25",
    },
  ],
  upcomingEvents = [
    {
      id: "EVT-001",
      title: "Fall Portrait Day",
      date: "2023-10-15",
      school: "Lincoln Elementary",
    },
    {
      id: "EVT-002",
      title: "Sports Team Photos",
      date: "2023-10-22",
      school: "Washington Middle School",
    },
    {
      id: "EVT-003",
      title: "Graduation Photos",
      date: "2023-11-05",
      school: "Jefferson High School",
    },
  ],
}: DashboardGridProps) => {
  const handleActionCardClick = (action: string) => {
    onActionSelect(action);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to School Photo Sales
      </h1>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard
          title="Find Photos by Face"
          description="Upload a photo of your child to find all their school photos"
          icon="facial-recognition"
          onClick={() => handleActionCardClick("facial-recognition")}
        />
        <ActionCard
          title="Browse All Photos"
          description="View and browse through all available school photos"
          icon="browse-photos"
          onClick={() => handleActionCardClick("browse-photos")}
        />
        <ActionCard
          title="Your Orders"
          description="View your order history and track current orders"
          icon="view-orders"
          onClick={() => handleActionCardClick("view-orders")}
        />
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                        <span className="font-semibold">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <Package className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Upcoming Photo Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <ScrollArea className="h-[250px] pr-4">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium">{event.title}</p>
                            <Badge variant="outline">
                              {formatDate(event.date)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {event.school}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <CalendarDays className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-500">No upcoming events</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="calendar">
                <div className="h-[250px] flex items-center justify-center border rounded-lg p-4">
                  <p className="text-gray-500 text-center">
                    Calendar view will be implemented in the next phase
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardGrid;
