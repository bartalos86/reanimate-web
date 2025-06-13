"use client";

import {
  BookOpen,
  EyeOff,
  Eye,
  ArrowRight,
  Lock,
} from "lucide-react";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { NewPasswordSchema, NewPasswordFormValue } from "@/schemas";
import Link from "next/link";
import { FormResponseMessage } from "./form-response-message";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

interface Response {
  error?: string;
  success?: string;
}

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordFormValue>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: NewPasswordFormValue) {
    console.log("onSubmit called with values:", values);
    if (!token) {
      console.log("No token found");
      setErrorMessage("Missing token!");
      return;
    }

    setIsLoading(true);
    console.log("Starting password reset process");

    startTransition(() => {
      console.log("Inside startTransition");
      newPassword(values, token)
        .then((resp: Response) => {
          console.log("Response received:", resp);
          if (resp?.error) {
            setErrorMessage(resp?.error);
            setSuccessMessage("");
          }
          if (resp?.success) {
            setSuccessMessage(resp.success!);
            setErrorMessage("");
          }
        })
        .finally(() => {
          console.log("Process completed");
          setIsLoading(false);
        });
    });
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
            Enter new password
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Please enter your new password below
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className="pl-10 pr-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          className="pl-10 pr-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormResponseMessage
                type="error"
                message={errorMessage}
              />

              <FormResponseMessage
                type="success"
                message={successMessage}
              />

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Updating password..."
                ) : (
                  <>
                    Update password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            <Link
              href="/auth/login"
              className=""
            >
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewPasswordForm;