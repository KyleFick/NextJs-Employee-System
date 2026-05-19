// lib/types.ts
export type Role = "ADMIN" | "EMPLOYEE";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}
