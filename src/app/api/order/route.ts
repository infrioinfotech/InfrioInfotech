import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, projectDescription, references, package: selectedPackage } = body;

    if (!name || !email || !phone || !businessName || !projectDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!selectedPackage) {
      return NextResponse.json(
        { error: "Please select a package" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const order = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      businessName,
      projectDescription,
      references: references || "",
      package: selectedPackage,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { 
        success: true, 
        message: "Order submitted successfully",
        data: order 
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Order API is working. Use POST to submit an order." },
    { status: 200 }
  );
}
