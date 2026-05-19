// components/sidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Sidebar({ role }: { role: string }) {
    return (
        <aside className="w-64 border-r p-4 space-y-2">
            <Link href="/dashboard">
                <Button variant="ghost" className="w-full">Dashboard</Button>
            </Link>

            {role === "ADMIN" && (
                <Link href="/dashboard/employees">
                    <Button variant="ghost" className="w-full">Employees</Button>
                </Link>
            )}

            <Link href="/dashboard/profile">
                <Button variant="ghost" className="w-full">My Profile</Button>
            </Link>

            <Link href="/dashboard/settings">
                <Button variant="ghost" className="w-full">Settings</Button>
            </Link>
        </aside>
    );
}
