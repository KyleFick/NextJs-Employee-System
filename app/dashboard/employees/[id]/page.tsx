import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import EmployeeEdit from "./EmployeeEdit";

interface Employee {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
}

async function getEmployee(id: string): Promise<Employee | null> {
    const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function EmployeePage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params; // ✅ FIX HERE

    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) notFound();

    const user = JSON.parse(userCookie.value);

    if (user.role !== "ADMIN") {
        return <p className="text-red-500">Access denied. Admins only.</p>;
    }

    const employee = await getEmployee(id);

    if (!employee) notFound();

    return <EmployeeEdit employee={employee} />;
}