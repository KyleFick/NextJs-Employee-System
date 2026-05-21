"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {ArrowLeft} from "lucide-react";

interface Employee {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
}

export default function EmployeeEdit({
                                         employee,
                                     }: {
    employee: Employee;
}) {
    const router = useRouter();

    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [role, setRole] = useState<"ADMIN" | "EMPLOYEE">(employee.role);

    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        setLoading(true);

        try {
            const res = await fetch(`/api/employees/${employee.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    role,
                }),
            });

            if (!res.ok) {
                alert("Failed to update employee");
                return;
            }

            alert("Employee updated successfully");

            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        setLoading(true);

        try {
            const res = await fetch(
                `/api/employees/${employee.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                alert("Failed to delete employee");
                return;
            }

            alert("Employee deleted");

            router.push("/dashboard/employees");
            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full mx-auto">
            <div className="flex items-center justify-between">

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

            </div>

            <div>
            <CardHeader>
                <CardTitle>Edit Employee</CardTitle>
                <CardDescription>
                    Update employee details or remove them.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="space-y-2">
                    <Label htmlFor="name">
                        Name
                    </Label>

                    <Input
                        id="name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email
                    </Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label>
                        Role
                    </Label>

                    <Select
                        value={role}
                        onValueChange={(value) =>
                            setRole(
                                value as
                                    | "ADMIN"
                                    | "EMPLOYEE"
                            )
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="EMPLOYEE">
                                Employee
                            </SelectItem>

                            <SelectItem value="ADMIN">
                                Admin
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2 justify-end">

                    <Button
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Update"}
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Delete employee?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={handleDelete}
                                >
                                    Confirm Delete
                                </AlertDialogAction>

                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </CardContent>
            </div>
        </Card>
    );
}