"use client";

import { ModeToggle } from "@/components/ModeToggle";

export function FloatingModeToggle() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
        </div>
    );
}