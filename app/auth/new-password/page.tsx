import NewPasswordForm from "@/components/auth/new-password-form";

export default function NewPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="login-container my-auto">
        <NewPasswordForm></NewPasswordForm>
      </div>
    </main>
  );
}