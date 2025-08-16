"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Home,
  LogOut,
  User,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "داشبورد", icon: Home },
    { href: "/orders", label: "سفارشات", icon: ShoppingCart },
    { href: "/products", label: "محصولات", icon: Package },
    { href: "/price-inventory", label: "قیمت و موجودی", icon: DollarSign },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-reverse space-x-8">
            <h1 className="text-xl font-bold text-white">پنل مدیریت</h1>
            <div className="hidden md:flex space-x-reverse space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-white/20 text-white shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-reverse space-x-4">
            <Link
              href="/website"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به سایت
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            {/* User menu */}
            {/* User menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-white"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">
                  {user?.username || "کاربر"}
                </span>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-700 border-b border-gray-200">
                      حساب کاربری
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      {user?.email}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 ml-2 inline" />
                      خروج از سیستم
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-white/20 text-white shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/website"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <ArrowRight className="w-5 h-5" />
                بازگشت به سایت
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
