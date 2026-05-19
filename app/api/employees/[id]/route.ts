// app/api/employees/[id]/route.ts

import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const user = users.find((u) => u.id === id);
    console.log("ALL USERS:", users);
    console.log("LOOKING FOR ID:", id);
    console.log(users);
    if (!user) {
        return NextResponse.json(
            { error: "Employee not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(user);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const data = await req.json();

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return NextResponse.json(
            { error: "Employee not found" },
            { status: 404 }
        );
    }

    users[index] = {
        ...users[index],
        ...data,
    };

    return NextResponse.json(users[index]);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return NextResponse.json(
            { error: "Employee not found" },
            { status: 404 }
        );
    }

    users.splice(index, 1);

    return NextResponse.json({
        success: true,
    });
}