import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      serviceType: serviceType || "General",
      message,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { 
        success: true, 
        message: "Contact submission received successfully",
        data: submission 
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
    { message: "Contact API is working. Use POST to submit a contact form." },
    { status: 200 }
  );
}
