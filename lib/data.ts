// lib/data.ts
import { User } from "./types";

export const users: User[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@test.com",
        role: "ADMIN",
    },
    {
        id: "2",
        name: "Employee User",
        email: "employee@test.com",
        role: "EMPLOYEE",
    },
];

// 🔥 helper to get next sequential ID
export function getNextUserId(): string {
    const maxId = users.reduce((max, user) => {
        return Math.max(max, Number(user.id));
    }, 0);

    return String(maxId + 1);
}