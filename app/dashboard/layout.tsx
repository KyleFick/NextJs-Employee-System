import { cookies } from "next/headers";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut} from "lucide-react";
import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const userCookie = (await cookieStore).get("user");

    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);

    const initials = user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar role={user.role} />

            {/* Main area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Topbar */}
                <header className="h-14 border-b bg-background flex items-center justify-between px-6">
                    <h1 className="text-base font-semibold tracking-tight">
                        Dashboard
                    </h1>

                    {/* User menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>

                            <div className="text-right leading-tight">
                                <p className="text-sm font-medium">
                                    {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {user.role}
                                </p>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile" className="flex items-center gap-2">
                                    <User size={16} />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="flex items-center gap-2">
                                    <ModeToggle/>
                                    Theme
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="flex items-center gap-2">
                                    <Settings size={16} />
                                    Settings
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link
                                    href="/out"
                                    className="flex items-center gap-2 text-red-500"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <Separator />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
                    {children}
                </main>
            </div>
        </div>
    );
}