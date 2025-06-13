"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { newVerification } from "@/actions/new-verification";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async (token: string) => {
    try {
      setIsVerifying(true);
      setError(null);

      const response = await newVerification(token);
      if(response.success) {
        setSuccess(true);
      } else {
        setError(response.error!);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to verify email. Please try again or request a new verification link.";
      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-verify when component mounts if token exists
  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px] px-4">
        <Card className="w-full min-w-[400px] max-w-[600px] mx-auto shadow-lg border-0 bg-white">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold text-gray-900">ReAnimate</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Invalid Token
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              The verification link appears to be invalid or has expired
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Verification Failed</AlertTitle>
              <AlertDescription className="text-orange-700">
                Please request a new verification email.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] px-4">
      <Card className="w-full min-w-[400px] max-w-[600px] mx-auto shadow-lg border-0 bg-white">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">ReAnimate</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Email Verification
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Verifying your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isVerifying ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                <p className="text-gray-600">Verifying your email...</p>
              </div>
            ) : error ? (
              <Alert variant="destructive" className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800">Verification Failed</AlertTitle>
                <AlertDescription className="text-orange-700">
                  {error}
                </AlertDescription>
              </Alert>
            ) : success ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Email Verified!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your email has been verified successfully. You can now log in to your account.
                </AlertDescription>
              </Alert>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}