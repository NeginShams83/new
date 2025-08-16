import { NextRequest, NextResponse } from "next/server";

const mockOrders = [
  {
    id: "1",
    customerName: "John Doe",
    total: 150,
    status: "completed",
    date: "2024-01-15",
    items: [
      { name: "Product 1", quantity: 1, price: 100 },
      { name: "Product 2", quantity: 1, price: 50 },
    ],
  },
  {
    id: "2",
    customerName: "Jane Smith",
    total: 75,
    status: "pending",
    date: "2024-01-16",
    items: [
      { name: "Product 3", quantity: 1, price: 75 },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: "success",
      data: mockOrders,
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
    const newOrder = {
      id: String(mockOrders.length + 1),
      ...body,
      date: new Date().toISOString().split('T')[0],
    };
    mockOrders.push(newOrder);
    
    return NextResponse.json({
      status: "success",
      data: newOrder,
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
