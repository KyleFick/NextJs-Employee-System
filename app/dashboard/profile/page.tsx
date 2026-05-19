// app/dashboard/profile/page.tsx
import { cookies } from "next/headers";

export default async function ProfilePage() {
    const user = JSON.parse((await cookies()).get("user")!.value);

    return (
        <div className="space-y-2">
            <h1 className="text-xl font-bold">My Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
