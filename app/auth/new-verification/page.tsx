import NewVerificationForm from "@/components/auth/new-verification-form";

export default function NewVerificationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="login-container my-auto">
        <NewVerificationForm></NewVerificationForm>
      </div>
    </main>
  );
}