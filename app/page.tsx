"use client";

import { LoginForm } from "@/components/login-form";
import Image from "next/image";
export default function LoginPage() {

  return (
      <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

          {/* Background image */}
          <Image
              src="/Employee Management System.png"
              alt="Background"
              fill
              priority
              className="object-cover -z-10"
          />

          {/* Optional overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative w-full max-w-sm md:max-w-4xl">
              <LoginForm />
          </div>
      </div>
  )
}

