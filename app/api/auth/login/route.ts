// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function POST(req: Request) {
    const { email } = await req.json();

    const user = users.find(u => u.email === email);
    if (!user) {
        return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const res = NextResponse.json(user);
    res.cookies.set("user", JSON.stringify(user), {
        httpOnly: true,
    });

    return res;
}
