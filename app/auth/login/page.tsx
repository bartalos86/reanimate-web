"use client";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="login-container my-auto">
        <LoginForm></LoginForm>
      </div>
    </main>
  );
}
