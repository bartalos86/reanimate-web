"use client";

import RegisterForm from "@/components/auth/register-form";


export default function RegisterPage() {
  // function register(values: RegisterFormValues) {

  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="login-container my-auto">
        <RegisterForm></RegisterForm>
      </div>
    </main>
  );
}
