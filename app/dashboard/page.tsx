"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  Settings, 
  BarChart3, 
  Package, 
  Users,
  Home,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">پنل مدیریت</h1>
                <p className="text-sm text-gray-500">تک لند</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">خوش آمدید، {user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role || "مدیر"}</p>
              </div>
              <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            خوش آمدید به پنل مدیریت
          </h2>
          <p className="text-gray-600">
            از طریق این پنل می‌توانید تمام بخش‌های فروشگاه را مدیریت کنید.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">کل فروش</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۱۲,۳۴۵,۶۷۸</div>
              <p className="text-xs text-muted-foreground">
                +۲۰.۱% نسبت به ماه قبل
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">محصولات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۲۵۴</div>
              <p className="text-xs text-muted-foreground">
                +۱۸ محصول جدید این ماه
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مشتریان</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۱,۲۳۴</div>
              <p className="text-xs text-muted-foreground">
                +۱۵% نسبت به ماه قبل
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">سفارشات</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۸۹</div>
              <p className="text-xs text-muted-foreground">
                +۱۲ سفارش امروز
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>عملیات سریع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex items-center gap-2 h-20 flex-col justify-center">
                <Package className="w-6 h-6" />
                مدیریت محصولات
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-20 flex-col justify-center">
                <Users className="w-6 h-6" />
                مدیریت کاربران
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-20 flex-col justify-center">
                <Settings className="w-6 h-6" />
                تنظیمات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Website */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            بازگشت به وب‌سایت
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
