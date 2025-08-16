"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  ImageIcon,
  Badge,
  Search,
} from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  images: string[];
};

const mockProducts: Product[] = [
  {
    id: "PROD-001",
    name: "هدفون بی‌سیم",
    category: "الکترونیک",
    price: 4500000,
    stock: 25,
    image: "/placeholder.svg?height=60&width=60",
    description: "هدفون بی‌سیم با کیفیت بالا و قابلیت حذف نویز",
    images: ["/placeholder.svg?height=60&width=60"],
  },
  {
    id: "PROD-002",
    name: "اسپیکر بلوتوث",
    category: "الکترونیک",
    price: 3200000,
    stock: 15,
    image: "/placeholder.svg?height=60&width=60",
    description: "اسپیکر بلوتوث قابل حمل با کیفیت صدای عالی",
    images: ["/placeholder.svg?height=60&width=60"],
  },
  {
    id: "PROD-003",
    name: "کاور گوشی",
    category: "لوازم جانبی",
    price: 650000,
    stock: 50,
    image: "/placeholder.svg?height=60&width=60",
    description: "کاور محافظ گوشی با مقاومت در برابر ضربه",
    images: ["/placeholder.svg?height=60&width=60"],
  },
  {
    id: "PROD-004",
    name: "کابل USB",
    category: "لوازم جانبی",
    price: 450000,
    stock: 100,
    image: "/placeholder.svg?height=60&width=60",
    description: "کابل شارژ USB پرسرعت",
    images: ["/placeholder.svg?height=60&width=60"],
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `PROD-${String(i + 5).padStart(3, "0")}`,
    name: `محصول ${i + 5}`,
    category: ["الکترونیک", "لوازم جانبی", "پوشاک"][i % 3],
    price: Math.round((Math.random() * 5000000 + 100000) / 10000) * 10000,
    stock: Math.floor(Math.random() * 100) + 1,
    image: `/placeholder.svg?height=60&width=60&query=محصول%20${i + 5}`,
    description: `توضیحات محصول ${i + 5}`,
    images: [`/placeholder.svg?height=60&width=60&query=محصول%20${i + 5}`],
  })),
];

interface InlineEditProps {
  value: number;
  onSave: (value: number) => Promise<void>;
  type: "price" | "stock";
}

function InlineEdit({ value, onSave, type }: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const numValue = Number.parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0) return;

    if (numValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    await onSave(numValue);
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="w-20 h-8 text-sm border-purple-200 focus:border-purple-400"
        type="number"
        step={type === "price" ? "0.01" : "1"}
        min="0"
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 px-3 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-purple-200"
    >
      {type === "price"
        ? `${new Intl.NumberFormat("fa-IR").format(value)} تومان`
        : value}
    </span>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { toast } = useToast();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      images: [],
    });
    setImagePreviews([]);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      images: product.images,
    });
    setImagePreviews(product.images);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      toast({
        title: "خطا در ذخیره محصول",
        description: "لطفاً تمام فیلدهای ضروری را پر کنید",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      description: formData.description,
      image:
        formData.images[0] ||
        `/placeholder.svg?height=60&width=60&query=${encodeURIComponent(
          formData.name
        )}`, // Use first image as main image
      images:
        formData.images.length > 0
          ? formData.images
          : [
              `/placeholder.svg?height=60&width=60&query=${encodeURIComponent(
                formData.name
              )}`,
            ],
    };

    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...productData }
            : product
        )
      );
      toast({
        title: "محصول بروزرسانی شد",
        description: `محصول "${formData.name}" با موفقیت بروزرسانی شد`,
        variant: "success",
      });
    } else {
      const newProduct = {
        id: `PROD-${String(products.length + 1).padStart(3, "0")}`,
        ...productData,
      };
      setProducts((prev) => [...prev, newProduct]);
      toast({
        title: "محصول اضافه شد",
        description: `محصول "${formData.name}" با موفقیت اضافه شد`,
        variant: "success",
      });
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete.id)
    );

    toast({
      title: "محصول حذف شد",
      description: `محصول "${productToDelete.name}" با موفقیت حذف شد`,
      variant: "success",
    });

    setIsLoading(false);
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleInlineEdit = async (
    productId: string,
    field: "price" | "stock",
    value: number
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      const newPreviews: string[] = [];
      let processedFiles = 0;

      Array.from(files).forEach((file) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "خطا در آپلود تصویر",
            description: "لطفاً فقط فایل‌های تصویری انتخاب کنید",
            variant: "destructive",
          });
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "خطا در آپلود تصویر",
            description: "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
            variant: "destructive",
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          newImages.push(result);
          newPreviews.push(result);
          processedFiles++;

          if (processedFiles === files.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, ...newImages],
            }));

            toast({
              title: "تصاویر آپلود شدند",
              description: `${files.length} تصویر با موفقیت انتخاب شد`,
              variant: "success",
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setImagePreviews((prev) => [...prev, url]);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, string> = {
      الکترونیک:
        "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md",
      "لوازم جانبی":
        "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md",
      پوشاک: "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md",
    };
    return (
      <Badge className={variants[category] || "bg-gray-400 text-white"}>
        {category}
      </Badge>
    );
  };

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [] as string[], // Changed from single image to array of images
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">مدیریت محصولات</h1>
            <Button
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن محصول
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pr-10 text-right"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-green-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-green-100">
                <thead className="bg-gradient-to-r from-green-50 to-teal-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      تصویر
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      نام محصول
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      دسته‌بندی
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      قیمت
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      موجودی
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-green-700 uppercase tracking-wider">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-50">
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`hover:bg-gradient-to-r hover:from-green-25 hover:to-teal-25 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-gray-25" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-xl object-cover shadow-md border-2 border-green-100"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-2 h-2 text-white" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(product.category)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <InlineEdit
                          value={product.price}
                          onSave={(value) =>
                            handleInlineEdit(product.id, "price", value)
                          }
                          type="price"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <InlineEdit
                          value={product.stock}
                          onSave={(value) =>
                            handleInlineEdit(product.id, "stock", value)
                          }
                          type="stock"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                        <Button
                          onClick={() => handleEditProduct(product)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200 inline-flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          ویرایش
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          حذف
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg border border-green-100 mt-8">
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
                <SelectTrigger className="w-20 border-green-200">
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
                {Math.min(endIndex, filteredProducts.length)} از{" "}
                {filteredProducts.length} نتیجه
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  variant="outline"
                  className="px-4 py-2 border-green-200 text-green-600 hover:bg-green-50"
                >
                  قبلی
                </Button>
                <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-100 to-teal-100 rounded-lg">
                  صفحه {currentPage} از {totalPages}
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="px-4 py-2 border-green-200 text-green-600 hover:bg-green-50"
                >
                  بعدی
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md bg-white border-gray-200 max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {selectedProduct ? "ویرایش محصول" : "افزودن محصول"}
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-1">
                <div className="space-y-4 pb-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      نام محصول
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="نام محصول را وارد کنید"
                      className="border-gray-200 focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      دسته‌بندی
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="border-gray-200 focus:border-gray-400">
                        <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الکترونیک">الکترونیک</SelectItem>
                        <SelectItem value="لوازم جانبی">لوازم جانبی</SelectItem>
                        <SelectItem value="پوشاک">پوشاک</SelectItem>
                        <SelectItem value="خانه">خانه</SelectItem>
                        <SelectItem value="ورزش">ورزش</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-700"
                      >
                        قیمت
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                        className="border-gray-200 focus:border-gray-400"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="stock"
                        className="text-sm font-medium text-gray-700"
                      >
                        موجودی
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        placeholder="0"
                        className="border-gray-200 focus:border-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="images"
                      className="text-sm font-medium text-gray-700"
                    >
                      تصاویر محصول
                    </Label>
                    <div className="space-y-3">
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt={`تصویر ${index + 1}`}
                                width={80}
                                height={80}
                                className="h-20 w-20 rounded-lg object-cover border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <input
                          id="images-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("images-upload")?.click()
                          }
                          className="border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <ImageIcon className="w-4 h-4 ml-2" />
                          انتخاب تصاویر
                        </Button>
                        <span className="text-xs text-gray-500">
                          حداکثر ۵ مگابایت برای هر تصویر
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        یا
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="image-url"
                          placeholder="آدرس تصویر را وارد کنید"
                          className="border-gray-200 focus:border-gray-400"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const input = e.target as HTMLInputElement;
                              handleAddImageUrl(input.value);
                              input.value = "";
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById(
                              "image-url"
                            ) as HTMLInputElement;
                            handleAddImageUrl(input.value);
                            input.value = "";
                          }}
                          className="border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          افزودن
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      توضیحات
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="توضیحات محصول را وارد کنید"
                      rows={3}
                      className="border-gray-200 focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  لغو
                </Button>
                <Button
                  onClick={handleSaveProduct}
                  disabled={
                    isLoading ||
                    !formData.name ||
                    !formData.category ||
                    !formData.price ||
                    !formData.stock
                  }
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? "در حال ذخیره..." : "ذخیره"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent className="bg-white border-gray-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  حذف محصول
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  آیا مطمئن هستید که می‌خواهید محصول {productToDelete?.name}
                  را حذف کنید؟ این عمل قابل بازگشت نیست.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-200 text-gray-600 hover:bg-gray-50">
                  لغو
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isLoading ? "در حال حذف..." : "حذف"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </ProtectedRoute>
  );
}
