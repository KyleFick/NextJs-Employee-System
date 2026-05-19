// components/role-guard.tsx
"use client";

export function RoleGuard({
                              role,
                              allowed,
                              children,
                          }: {
    role: string;
    allowed: string[];
    children: React.ReactNode;
}) {
    if (!allowed.includes(role)) {
        return <p className="text-red-500">Access Denied</p>;
    }
    return <>{children}</>;
}
