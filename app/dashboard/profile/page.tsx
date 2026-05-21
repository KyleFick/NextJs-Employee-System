// app/dashboard/profile/page.tsx

import { cookies } from "next/headers"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function ProfilePage() {
    const cookieStore = await cookies()

    const userCookie = cookieStore.get("user")

    if (!userCookie) {
        return (
            <div className="p-6">
                User not found
            </div>
        )
    }

    const user = JSON.parse(userCookie.value)

    const initials = user.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()

    return (
        <div className="w-full mx-auto p-6">

            <Card>

                <CardHeader>

                    <div className="flex flex-col sm:flex-row items-center gap-6">

                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="/avatar.png"
                                alt={user.name}
                            />

                            <AvatarFallback className="text-xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-2 text-center sm:text-left">

                            <CardTitle className="text-3xl">
                                {user.name}
                            </CardTitle>

                            <CardDescription>
                                {user.email}
                            </CardDescription>

                            <Badge
                                variant={
                                    user.role === "ADMIN"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.role}
                            </Badge>

                        </div>

                    </div>

                </CardHeader>

                <Separator />

                <CardContent className="pt-6">

                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Full Name
                            </p>

                            <p className="font-medium">
                                {user.name}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Email Address
                            </p>

                            <p className="font-medium">
                                {user.email}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Account Role
                            </p>

                            <p className="font-medium">
                                {user.role}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <Badge>
                                Active
                            </Badge>
                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    )
}