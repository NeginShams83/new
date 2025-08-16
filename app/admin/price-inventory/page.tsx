"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProtectedRoute } from "@/components/protected-route";
import { useToast } from "@/hooks/use-toast";

// Mock data for price and inventory management
const mockProducts = [
  {
    id: 1,
    name: "لپ‌تاپ ایسوس",
    category: "الکترونیک",
    price: 25000000,
    stock: 15,
    minStock: 5,
    lastUpdated: "1403/08/15",
  },
  {
    id: 2,
    name: "گوشی سامسونگ",
    category: "الکترونیک",
    price: 18000000,
    stock: 8,
    minStock: 10,
    lastUpdated: "1403/08/14",
  },
  {
    id: 3,
    name: "کتاب برنامه‌نویسی",
    category: "کتاب",
    price: 450000,
    stock: 25,
    minStock: 5,
    lastUpdated: "1403/08/13",
  },
  {
    id: 4,
    name: "ماوس بی‌سیم",
    category: "الکترونیک",
    price: 850000,
    stock: 3,
    minStock: 8,
    lastUpdated: "1403/08/12",
  },
  {
    id: 5,
    name: "کیبورد مکانیکی",
    category: "الکترونیک",
    price: 2200000,
    stock: 12,
    minStock: 6,
    lastUpdated: "1403/08/11",
  },
];

export default function PriceInventoryPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [editingStock, setEditingStock] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState("");
  const [tempStock, setTempStock] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const handlePriceEdit = (productId: number, currentPrice: number) => {
    setEditingPrice(productId);
    setTempPrice(currentPrice.toString());
  };

  const handleStockEdit = (productId: number, currentStock: number) => {
    setEditingStock(productId);
    setTempStock(currentStock.toString());
  };

  const savePriceEdit = (productId: number) => {
    const newPrice = Number.parseInt(tempPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, price: newPrice, lastUpdated: "1403/08/15" }
            : p
        )
      );
    }
    setEditingPrice(null);
    setTempPrice("");
  };

  const saveStockEdit = (productId: number) => {
    const newStock = Number.parseInt(tempStock);
    if (!isNaN(newStock) && newStock >= 0) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, stock: newStock, lastUpdated: "1403/08/15" }
            : p
        )
      );
    }
    setEditingStock(null);
    setTempStock("");
  };

  const cancelEdit = () => {
    setEditingPrice(null);
    setEditingStock(null);
    setTempPrice("");
    setTempStock("");
  };

  const deleteProduct = (productId: number) => {
    const productToDelete = products.find((p) => p.id === productId);
    const productName = productToDelete?.name || "محصول";

    setProducts((prev) => prev.filter((p) => p.id !== productId));

    toast({
      title: "حذف موفقیت‌آمیز",
      description: `محصول "${productName}" با موفقیت حذف شد.`,
      variant: "success",
    });
  };

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              مدیریت قیمت و موجودی
            </h1>
            <p className="text-gray-600">مدیریت قیمت‌ها و موجودی محصولات</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  کل محصولات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  موجودی کم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lowStockProducts.length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  ارزش کل موجودی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {formatPrice(totalValue)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                لیست قیمت و موجودی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        نام محصول
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        دسته‌بندی
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        قیمت (تومان)
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        موجودی
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        حداقل موجودی
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        وضعیت
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        آخرین بروزرسانی
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4 font-medium">
                          {product.name}
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {product.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {editingPrice === product.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    savePriceEdit(product.id);
                                  if (e.key === "Escape") cancelEdit();
                                }}
                                className="w-32 text-right"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => savePriceEdit(product.id)}
                              >
                                ✓
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handlePriceEdit(product.id, product.price)
                              }
                              className="text-emerald-600 hover:text-emerald-800 font-medium"
                            >
                              {formatPrice(product.price)}
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {editingStock === product.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={tempStock}
                                onChange={(e) => setTempStock(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveStockEdit(product.id);
                                  if (e.key === "Escape") cancelEdit();
                                }}
                                className="w-20 text-right"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => saveStockEdit(product.id)}
                              >
                                ✓
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleStockEdit(product.id, product.stock)
                              }
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {product.stock}
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {product.minStock}
                        </td>
                        <td className="py-4 px-4">
                          {product.stock <= product.minStock ? (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <TrendingDown className="w-3 h-3 ml-1" />
                              موجودی کم
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <TrendingUp className="w-3 h-3 ml-1" />
                              موجود
                            </Badge>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-500 text-sm">
                          {product.lastUpdated}
                        </td>
                        <td className="py-4 px-4">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>حذف محصول</AlertDialogTitle>
                                <AlertDialogDescription>
                                  آیا مطمئن هستید که می‌خواهید محصول
                                  {`product.name`} را حذف کنید؟ این عمل قابل
                                  بازگشت نیست.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>لغو</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteProduct(product.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
