"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import {
  Home,
  Package,
  FileText,
  HelpCircle,
  Mail,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Star,
  Truck,
  Shield,
  Headphones,
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
export default function WebsitePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="تک لند"
                width={40}
                height={40}
                className="h-10"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-reverse space-x-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                خانه
              </Link>
              <Link
                href="#products"
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Package className="w-4 h-4" />
                محصولات
              </Link>
              <Link
                href="#blog"
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                وبلاگ
              </Link>
              <Link
                href="#faq"
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                سوالات متداول
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                تماس با ما
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-reverse space-x-3">
              <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-3 text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4" />
                  خانه
                </Link>
                <Link
                  href="#products"
                  className="flex items-center gap-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  <Package className="w-4 h-4" />
                  محصولات
                </Link>
                <Link
                  href="#blog"
                  className="flex items-center gap-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  وبلاگ
                </Link>
                <Link
                  href="#faq"
                  className="flex items-center gap-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  سوالات متداول
                </Link>
                <Link
                  href="#contact"
                  className="flex items-center gap-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  تماس با ما
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              به فروشگاه آنلاین ما خوش آمدید
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              بهترین محصولات با کیفیت عالی و قیمت مناسب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                مشاهده محصولات
              </button>
              <button
                onClick={handleAdminClick}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {isAuthenticated ? "پنل مدیریت" : "ورود به پنل"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              چرا ما را انتخاب کنید؟
            </h2>
            <p className="text-lg text-gray-600">
              خدمات ویژه ما که تجربه خرید شما را بهتر می‌کند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ارسال رایگان</h3>
              <p className="text-gray-600">
                ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمانت کیفیت</h3>
              <p className="text-gray-600">
                ضمانت بازگشت وجه تا ۳۰ روز پس از خرید
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">پشتیبانی ۲۴/۷</h3>
              <p className="text-gray-600">
                پشتیبانی آنلاین در تمام ساعات شبانه روز
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">کیفیت برتر</h3>
              <p className="text-gray-600">
                محصولات با کیفیت و اصالت تضمین شده
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              محصولات پرفروش
            </h2>
            <p className="text-lg text-gray-600">
              مجموعه‌ای از بهترین محصولات ما
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
              >
                <div className="aspect-square bg-gray-200 rounded-t-lg mb-4">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&query=product-${item}`}
                    alt={`محصول ${item}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    محصول شماره {item}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-sm text-gray-500 mr-2">(۲۳ نظر)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {(item * 150000).toLocaleString("fa-IR")} تومان
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              مشاهده همه محصولات
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              نظرات مشتریان
            </h2>
            <p className="text-lg text-gray-600">
              آنچه مشتریان ما درباره خدماتمان می‌گویند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "علی احمدی",
                text: "خدمات عالی و محصولات با کیفیت. حتماً دوباره خرید خواهم کرد.",
              },
              {
                name: "فاطمه رضایی",
                text: "ارسال سریع و بسته‌بندی مناسب. از خریدم راضی هستم.",
              },
              {
                name: "محمد کریمی",
                text: "پشتیبانی فوق‌العاده و قیمت‌های مناسب. پیشنهاد می‌کنم.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="mr-3 font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              تماس با ما
            </h2>
            <p className="text-lg text-gray-600">
              برای هرگونه سوال یا پیشنهاد با ما در تماس باشید
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-900">تلفن تماس</h3>
                    <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-900">ایمیل</h3>
                    <p className="text-gray-600">info@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-900">آدرس</h3>
                    <p className="text-gray-600">
                      تهران، خیابان ولیعصر، پلاک ۱۲۳
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-900">ساعات کاری</h3>
                    <p className="text-gray-600">
                      شنبه تا پنج‌شنبه: ۹ صبح تا ۶ عصر
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موضوع
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    پیام
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="mr-3 text-xl font-bold">فروشگاه آنلاین</span>
              </div>
              <p className="text-gray-400">
                بهترین فروشگاه آنلاین برای خرید محصولات با کیفیت و قیمت مناسب
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">لینک‌های مفید</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    محصولات
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    وبلاگ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">خدمات مشتریان</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    راهنمای خرید
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    شرایط و قوانین
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    حریم خصوصی
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    پشتیبانی
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">عضویت در خبرنامه</h3>
              <p className="text-gray-400 mb-4">
                از آخرین اخبار و تخفیف‌ها باخبر شوید
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="flex-1 px-4 py-2 rounded-r-lg border-0 text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-l-lg hover:bg-blue-700 transition-colors">
                  عضویت
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © ۱۴۰۳ فروشگاه آنلاین. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
      <h1 className="text-primary-700">تک لند</h1>
      <span className="text[#042352]">
        انتخاب هوشمندانه <span className="text[#F45E0C]">خرید مطمئن</span>
      </span>
    </div>
  );
}
