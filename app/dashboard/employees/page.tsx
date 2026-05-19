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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Employees</CardTitle>

                <Link href="/dashboard/employees/new">
                    <Button>Add Employee</Button>
                </Link>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{emp.role}</TableCell>
                                <TableCell className="text-right">
                                    {emp.id && (
                                        <Link href={`/dashboard/employees/${emp.id}`}>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {employees.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-4">
                        No employees found.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
