import { cookies } from "next/headers";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Plus, Server, Users2} from "lucide-react";
import {DataTable} from "@/components/data-table";
import {columns} from "@/app/dashboard/employees/columns";

interface Employee {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
}

async function getEmployees(): Promise<Employee[]> {
        const res = await fetch("http://localhost:3000/api/employees", {
            cache: "no-store",
        });

    if (!res.ok) {
        throw new Error("Failed to fetch employees");
    }

    return res.json();
}

export default async function EmployeesPage() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);

    // 🔒 Admin-only access
    if (user.role !== "ADMIN") {
        return (
            <div className="text-red-500 font-medium">
                Access denied. Admins only.
            </div>
        );
    }

    const employees = await getEmployees();

    return (
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Users2 className="h-6 w-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Services</CardTitle>
                            <CardDescription>
                                Create Add and Manage Services.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold text-primary">
                        Current Active Employees
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center justify-end py-4">
                        <Link href="/dashboard/employees/new">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Employee
                            </Button>
                        </Link>
                    </div>
                    <DataTable columns={columns} data={employees} />
                </CardContent>
            </Card>
        </div>
    );
}
