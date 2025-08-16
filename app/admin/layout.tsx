"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";

export default function DashboardPage() {
  // Mock data for dashboard statistics
  const stats = {
    totalOrders: 156,
    totalProducts: 89,
    totalRevenue: 45600000, // in Toman
    lowStockItems: 12,
    pendingOrders: 23,
    totalCustomers: 342,
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "احمد محمدی",
      amount: 850000,
      status: "در حال پردازش",
    },
    {
      id: "ORD-002",
      customer: "فاطمه احمدی",
      amount: 1200000,
      status: "تایید شده",
    },
    {
      id: "ORD-003",
      customer: "علی رضایی",
      amount: 650000,
      status: "ارسال شده",
    },
  ];

  const lowStockProducts = [
    { name: "لپ تاپ ایسوس", stock: 2, category: "لپ تاپ" },
    { name: "موس لاجیتک", stock: 5, category: "لوازم جانبی" },
    { name: "کیبورد مکانیکی", stock: 3, category: "لوازم جانبی" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              داشبورد مدیریت
            </h1>
            <p className="text-gray-600">خلاصه‌ای از وضعیت کسب و کار شما</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  کل سفارشات
                </CardTitle>
                <ShoppingCart className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalOrders.toLocaleString("fa-IR")}
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  <span className="text-green-200">+12%</span> نسبت به ماه قبل
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  کل محصولات
                </CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalProducts.toLocaleString("fa-IR")}
                </div>
                <p className="text-xs text-green-100 mt-1">
                  <span className="text-green-200">+5</span> محصول جدید این هفته
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">درآمد کل</CardTitle>
                <DollarSign className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalRevenue.toLocaleString("fa-IR")} تومان
                </div>
                <p className="text-xs text-purple-100 mt-1">
                  <span className="text-green-200">+18%</span> نسبت به ماه قبل
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  سفارشات در انتظار
                </CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.pendingOrders.toLocaleString("fa-IR")}
                </div>
                <p className="text-xs text-orange-100 mt-1">نیاز به بررسی</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  کل مشتریان
                </CardTitle>
                <Users className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalCustomers.toLocaleString("fa-IR")}
                </div>
                <p className="text-xs text-teal-100 mt-1">
                  <span className="text-green-200">+25</span> مشتری جدید این ماه
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">موجودی کم</CardTitle>
                <Package className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.lowStockItems.toLocaleString("fa-IR")}
                </div>
                <p className="text-xs text-red-100 mt-1">محصول نیاز به تامین</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  دسترسی سریع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/orders">
                  <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white">
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    مدیریت سفارشات
                  </Button>
                </Link>
                <Link href="/products">
                  <Button className="w-full justify-start bg-green-500 hover:bg-green-600 text-white">
                    <Package className="w-4 h-4 ml-2" />
                    مدیریت محصولات
                  </Button>
                </Link>
                <Link href="/price-inventory">
                  <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white">
                    <DollarSign className="w-4 h-4 ml-2" />
                    قیمت و موجودی
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  آخرین سفارشات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-xs text-gray-500">{order.id}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm text-gray-900">
                          {order.amount.toLocaleString("fa-IR")} تومان
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "تایید شده"
                              ? "bg-green-100 text-green-800"
                              : order.status === "در حال پردازش"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  هشدار موجودی کم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                    >
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          {product.stock.toLocaleString("fa-IR")} عدد
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
