import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
    const cookieStore = await cookies(); // ✅ await
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Welcome back, {user.name}
            </h2>
            <p className="text-muted-foreground">
                Role: {user.role}
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You are logged in successfully.</p>
                </CardContent>
            </Card>
        </div>
    );
}
