import { cookies } from "next/headers";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies(); // ✅ await
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar role={user.role} />

            <div className="flex flex-col flex-1">
                <header className="h-14 border-b flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <span className="text-sm text-muted-foreground">
            {user.name} ({user.role})
          </span>
                </header>

                <Separator />

                <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
                    {children}
                </main>
            </div>
        </div>
    );
}
