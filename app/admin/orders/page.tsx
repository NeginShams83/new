"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Filter,
  Calendar,
  User,
  Phone,
  MapPin,
  Mail,
  ShoppingCart,
} from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";

const mockOrders = [
  {
    id: "ORD-001",
    customerName: "علی احمدی",
    orderDate: "1403/01/15",
    status: "در حال پردازش" as const,
    totalAmount: 2999000,
    customer: {
      name: "علی احمدی",
      email: "ali.ahmadi@email.com",
      phone: "09123456789",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    },
    items: [
      { name: "هدفون بی‌سیم", quantity: 1, price: 1999000, total: 1999000 },
      { name: "کاور گوشی", quantity: 2, price: 500000, total: 1000000 },
    ],
  },
  {
    id: "ORD-002",
    customerName: "سارا محمدی",
    orderDate: "1403/01/14",
    status: "ارسال شده" as const,
    totalAmount: 1495000,
    customer: {
      name: "سارا محمدی",
      email: "sara.mohammadi@email.com",
      phone: "09987654321",
      address: "اصفهان، خیابان چهارباغ، پلاک ۴۵۶",
    },
    items: [
      { name: "اسپیکر بلوتوث", quantity: 1, price: 1495000, total: 1495000 },
    ],
  },
  {
    id: "ORD-003",
    customerName: "محمد رضایی",
    orderDate: "1403/01/13",
    status: "تحویل داده شده" as const,
    totalAmount: 899000,
    customer: {
      name: "محمد رضایی",
      email: "mohammad.rezaei@email.com",
      phone: "09456789123",
      address: "شیراز، خیابان زند، پلاک ۷۸۹",
    },
    items: [
      {
        name: "کابل USB",
        quantity: 3,
        price: 299000,
        total: 0,
      },
    ].map((item) => ({ ...item, total: item.quantity * item.price })),
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `ORD-${String(i + 4).padStart(3, "0")}`,
    customerName: `مشتری ${i + 4}`,
    orderDate: `1403/01/${String(12 - (i % 12)).padStart(2, "0")}`,
    status: (["در حال پردازش", "ارسال شده", "تحویل داده شده"] as const)[i % 3],
    totalAmount: Math.round((Math.random() * 5000000 + 500000) / 1000) * 1000,
    customer: {
      name: `مشتری ${i + 4}`,
      email: `customer${i + 4}@email.com`,
      phone: `0912345${String(Math.floor(Math.random() * 9000) + 1000)}`,
      address: `شهر نمونه، خیابان ${i + 4}، پلاک ${
        Math.floor(Math.random() * 999) + 1
      }`,
    },
    items: [
      {
        name: `محصول ${i + 1}`,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.round((Math.random() * 1000000) / 1000) * 1000,
        total: 0,
      },
    ].map((item) => ({ ...item, total: item.quantity * item.price })),
  })),
];

type Order = (typeof mockOrders)[0];
type OrderStatus = "در حال پردازش" | "ارسال شده" | "تحویل داده شده";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter orders by status
  useEffect(() => {
    let filtered = orders;
    if (statusFilter !== "all") {
      filtered = orders.filter((order) => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [orders, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    setIsLoading(false);
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      "در حال پردازش":
        "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md",
      "ارسال شده":
        "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md",
      "تحویل داده شده":
        "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const formatToman = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              مدیریت سفارشات
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg border border-purple-100">
            <Filter className="w-5 h-5 text-purple-600" />
            <label className="text-sm font-medium text-gray-700">
              فیلتر بر اساس وضعیت:
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-purple-200 focus:border-purple-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="در حال پردازش">در حال پردازش</SelectItem>
                <SelectItem value="ارسال شده">ارسال شده</SelectItem>
                <SelectItem value="تحویل داده شده">تحویل داده شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
          <table className="min-w-full divide-y divide-purple-100">
            <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  شناسه سفارش
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  نام مشتری
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  تاریخ سفارش
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  مبلغ کل
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-purple-700 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-50">
              {currentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gradient-to-r hover:from-purple-25 hover:to-blue-25 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-gray-25" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-700">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    {formatToman(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() => handleViewDetails(order)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      مشاهده جزئیات
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">
              تعداد در هر صفحه:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20 border-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">۱۰</SelectItem>
                <SelectItem value="20">۲۰</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              نمایش {startIndex + 1} تا{" "}
              {Math.min(endIndex, filteredOrders.length)} از{" "}
              {filteredOrders.length} نتیجه
            </span>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="px-4 py-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                قبلی
              </Button>
              <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                صفحه {currentPage} از {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                variant="outline"
                className="px-4 py-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                بعدی
              </Button>
            </div>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                جزئیات سفارش - {selectedOrder?.id}
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    اطلاعات مشتری
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">نام:</span>{" "}
                      {selectedOrder.customer.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">ایمیل:</span>{" "}
                      {selectedOrder.customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="font-medium">تلفن:</span>{" "}
                      {selectedOrder.customer.phone}
                    </div>
                    <div className="col-span-2 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                      <span className="font-medium">آدرس:</span>{" "}
                      {selectedOrder.customer.address}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    اقلام سفارش
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                            کالا
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                            تعداد
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                            قیمت
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                            مجموع
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                              {item.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-green-600 font-medium">
                              {formatToman(item.price)}
                            </td>
                            <td className="px-4 py-3 text-sm text-green-700 font-bold">
                              {formatToman(item.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-left mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-xl font-bold text-green-700">
                      مجموع کل: {formatToman(selectedOrder.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                  <h3 className="text-lg font-bold mb-4 text-purple-700">
                    وضعیت سفارش
                  </h3>
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value: OrderStatus) =>
                        handleStatusChange(value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-48 border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="در حال پردازش">
                          در حال پردازش
                        </SelectItem>
                        <SelectItem value="ارسال شده">ارسال شده</SelectItem>
                        <SelectItem value="تحویل داده شده">
                          تحویل داده شده
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {isLoading && (
                      <span className="text-sm text-purple-600 font-medium">
                        در حال ذخیره تغییرات...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
