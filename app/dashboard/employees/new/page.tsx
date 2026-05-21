"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {ArrowLeft} from "lucide-react";

export default function NewEmployeePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"ADMIN" | "EMPLOYEE">("EMPLOYEE");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, role }),
        });

        setLoading(false);

        if (!res.ok) {
            setError("Failed to create employee");
            return;
        }

        router.push("/dashboard/employees");
    }

    return (
        <div>

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
                <Card className="w-full mx-auto">

                    <CardHeader>
                        <CardTitle>Create New Employee</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <Label>Name</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Role</Label>
                                <select
                                    className="border rounded px-2 py-1 w-full"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as "ADMIN" | "EMPLOYEE")}
                                >
                                    <option value="EMPLOYEE">Employee</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <Button type="submit" className="max-w-md" disabled={loading}>
                                {loading ? "Creating..." : "Create Employee"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

        </div>
    );
}
