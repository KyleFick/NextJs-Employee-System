"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Employee {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
}

export default function EmployeeEdit({ employee }: { employee: Employee }) {
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [role, setRole] = useState<"ADMIN" | "EMPLOYEE">(employee.role);
    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        setLoading(true);

        const res = await fetch(`/api/employees/${employee.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, role }),
        });

        setLoading(false);

        if (!res.ok) {
            alert("Failed to update employee");
            return;
        }

        alert("Employee updated successfully!");
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this employee?")) return;

        setLoading(true);

        const res = await fetch(`/api/employees/${employee.id}`, {
            method: "DELETE",
        });

        setLoading(false);

        if (!res.ok) {
            alert("Failed to delete employee");
            return;
        }

        alert("Employee deleted!");
        window.location.href = "/dashboard/employees";
    }

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div>
                <label>Name</label>
                <input
                    className="border rounded px-2 py-1 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Email</label>
                <input
                    className="border rounded px-2 py-1 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Role</label>
                <select
                    className="border rounded px-2 py-1 w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "ADMIN" | "EMPLOYEE")}
                >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            <div className="flex justify-between space-x-2">
                <Button onClick={handleUpdate} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </div>
    );
}
