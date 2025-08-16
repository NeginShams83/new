"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Eye, EyeOff, LogIn, Shield, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "نام کاربری الزامی است")
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .max(10, "رمز عبور نباید بیش از 10 کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const success = await login(data.username, data.password);

      if (success) {
        toast({
          title: "ورود موفقیت آمیز",
          description: "به پنل مدیریت خوش آمدید",
          variant: "success",
        });
        router.push("/");
      } else {
        toast({
          title: "خطا در ورود",
          description: "نام کاربری یا رمز عبور اشتباه است",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "خطا در سیستم",
        description: "خطا در ورود به سیستم. لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <Link
        href="/website"
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white/90 transition-all duration-200 shadow-md"
      >
        <ArrowRight className="w-4 h-4" />
        بازگشت به سایت
      </Link>

      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ورود به پنل مدیریت
            </CardTitle>
            <CardDescription className="text-gray-600">
              برای دسترسی به پنل مدیریت وارد شوید
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-right block font-medium"
                >
                  نام کاربری
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="نام کاربری خود را وارد کنید"
                  className="text-right"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 text-right">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-right block font-medium"
                >
                  رمز عبور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="text-right pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 text-right">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    در حال ورود...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    ورود به سیستم
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          پنل مدیریت فروشگاه - نسخه ۱.۰
        </div>
      </div>
    </div>
  );
}
