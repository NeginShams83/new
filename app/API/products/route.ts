import { NextRequest, NextResponse } from "next/server";

const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    category: "Electronics",
    price: 100,
    stock: 10,
    description: "Sample product 1",
  },
  {
    id: "2",
    name: "Product 2",
    category: "Accessories",
    price: 50,
    stock: 20,
    description: "Sample product 2",
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: "success",
      data: mockProducts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = {
      id: String(mockProducts.length + 1),
      ...body,
    };
    mockProducts.push(newProduct);
    
    return NextResponse.json({
      status: "success",
      data: newProduct,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
