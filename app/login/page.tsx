"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, ShoppingBag, AlertCircle } from "lucide-react";

interface FormErrors {
  username?: string;
  password?: string;
}

interface LoginState {
  error?: string;
  success?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginState, setLoginState] = useState<LoginState>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (username.length < 3) {
      newErrors.username = "نام کاربری باید حداقل 3 کاراکتر باشد";
    }

    if (!password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (password.length < 3) {
      newErrors.password = "رمز عبور باید حداقل 3 کاراکتر باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setLoginState({ error: "لطفاً خطاهای فرم را برطرف کنید" });
      return;
    }

    setIsLoading(true);
    setLoginState({});

    // Using Maktab90 server
    const api = "https://nervous-jackson-pvcf9esfp.liara.run";
    const loginApi = `${api}/api/auth/login`;

    try {
      const response = await fetch(loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        // Handle successful login - adapt to actual API response format
        const token = data.token || data.access_token || "temp-token";
        const user = data.user ||
          data.admin || {
            id: "unknown",
            username: username,
            role: "admin",
          };

        if (typeof window !== "undefined") {
          localStorage.setItem("admin-token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("loginTime", new Date().toISOString());
        }

        setLoginState({ success: "خوش آمدید! ورود موفقیت‌آمیز بود 🎉" });

        setTimeout(() => {
          router.push("dashboard");
        }, 1500);
      } else {
        // Handle API errors
        const errorMessage =
          data.message || "نام کاربری یا رمز عبور اشتباه است";
        setLoginState({ error: errorMessage });
      }
    } catch (error) {
      console.error("خطا در ورود:", error);
      setLoginState({
        error: "مشکل در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: "username" | "password", value: string) => {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4"
    >
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">🏪 پنل مدیریت</CardTitle>
          <CardDescription className="text-blue-100 mt-3 text-lg">
            برای ورود اطلاعات خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error/Success Messages */}
            {loginState.error && (
              <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{loginState.error}</span>
              </div>
            )}
            {loginState.success && (
              <div className="flex items-center gap-2 p-3 text-green-600 bg-green-50 border border-green-200 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{loginState.success}</span>
              </div>
            )}

            <div className="space-y-3">
              <Label
                htmlFor="username"
                className="text-sm font-medium flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" /> نام کاربری
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`border-2 transition-all duration-300 focus:scale-105 ${
                  errors.username
                    ? "border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/10"
                    : "border-blue-200 focus:border-blue-500 hover:border-blue-300"
                }`}
              />
              {errors.username && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.username}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Eye className="h-4 w-4" /> رمز عبور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="admin123"
                  value={password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`border-2 transition-all duration-300 focus:scale-105 pr-12 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/10"
                      : "border-purple-200 focus:border-purple-500 hover:border-purple-300"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>در حال ورود...</span>
                </div>
              ) : (
                " ورود به پنل"
              )}
            </Button>

            {/* Back to Home Link */}
            <div className="text-center pt-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
