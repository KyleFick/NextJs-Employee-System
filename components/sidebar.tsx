"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Sidebar({ role }: { role: string }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            show: true,
        },
        {
            label: "Employees",
            href: "/dashboard/employees",
            icon: Users,
            show: role === "ADMIN",
        },
    ];

    return (
        <aside
            className={cn(
                "h-screen border-r bg-background flex flex-col transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                {!collapsed && (
                    <span className="font-semibold text-sm">
                        Hack Bolt Studios
                    </span>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ChevronRight size={18} />
                    ) : (
                        <ChevronLeft size={18} />
                    )}
                </Button>
            </div>

            <Separator />

            {/* Nav */}
            <nav className="flex flex-col gap-1 p-2">
                {links
                    .filter((l) => l.show)
                    .map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link key={link.href} href={link.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-2",
                                        collapsed && "justify-center px-0"
                                    )}
                                >
                                    <Icon size={18} />

                                    {!collapsed && (
                                        <span>{link.label}</span>
                                    )}
                                </Button>
                            </Link>
                        );
                    })}
            </nav>
        </aside>
    );
}