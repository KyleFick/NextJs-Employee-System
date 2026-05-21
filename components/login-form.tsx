"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                setError("Invalid email or password");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className={cn(
                "flex flex-col gap-6 max-w-5xl mx-auto",
                className
            )}
            {...props}
        >
            <div></div>
            <Card className="overflow-hidden p-0 shadow-xl">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={handleLogin}
                        className="p-6 md:p-8"
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Welcome back
                                </h1>

                                <p className="text-muted-foreground">
                                    Sign in to your employee dashboard
                                </p>
                            </div>

                            <Field>
                                <FieldLabel>Email</FieldLabel>

                                <Input
                                    type="email"
                                    placeholder="admin@test.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            {/*<Field>*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <FieldLabel>*/}
                            {/*            Password*/}
                            {/*        </FieldLabel>*/}

                            {/*        <Link*/}
                            {/*            href="#"*/}
                            {/*            className="ml-auto text-sm hover:underline"*/}
                            {/*        >*/}
                            {/*            Forgot password?*/}
                            {/*        </Link>*/}
                            {/*    </div>*/}

                            {/*    <Input*/}
                            {/*        type="password"*/}
                            {/*        value={password}*/}
                            {/*        onChange={(e) =>*/}
                            {/*            setPassword(*/}
                            {/*                e.target.value*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*        required*/}
                            {/*    />*/}
                            {/*</Field>*/}

                            {error && (
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            )}

                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </Field>

                            <FieldSeparator>
                                Demo Accounts
                            </FieldSeparator>

                            <div className="rounded-md border p-3 text-sm text-muted-foreground space-y-1">
                                <p>
                                    Admin:
                                    {" "}
                                    <strong>
                                        admin@test.com
                                    </strong>
                                </p>

                                <p>
                                    Employee:
                                    {" "}
                                    <strong>
                                        employee@test.com
                                    </strong>
                                </p>
                            </div>

                            <FieldDescription className="text-center">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="underline"
                                >
                                    Sign up
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="relative hidden md:block h-full w-full bg-muted">
                        <Image
                            src="/EmployeeManagementSystemLogo.png"
                            alt="Login image"
                            fill
                            className="object-cover brightness-75 dark:brightness-50"
                            priority
                        />
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="text-center px-6">
                By continuing you agree to our{" "}
                <Link href="#">
                    Terms
                </Link>{" "}
                and{" "}
                <Link href="#">
                    Privacy Policy
                </Link>
            </FieldDescription>
        </div>
    );
}