"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import {Eye} from "lucide-react";

export type Employee = {
    id: string
    name: string
    email: string
    role: string
}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const employee = row.original

            return (
                <div className="flex items-center">
                    <Link href={`/dashboard/employees/${employee.id}`}>
                        <Button
                            size="icon"
                            variant="outline"
                        >
                            <Eye className="h-4 w-4"/>
                        </Button>
                    </Link>
                </div>
            )
        },
    },
]