// app/api/employees/route.ts

import { NextResponse } from "next/server";
import { users } from "@/lib/data";

// ✅ GET all employees
export async function GET() {
    return NextResponse.json(users);
}

// ✅ POST new employee
export async function POST(req: Request) {
    const data = await req.json();

    const newUser = {
        id: (users.length + 1).toString(),
        ...data,
    };

    users.push(newUser);

    return NextResponse.json(newUser);
}