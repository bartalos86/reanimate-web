"use client"

import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BookOpen, Mail, User, Lock, Eye, EyeOff, Github } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormResponseMessage } from "./form-response-message";
import { register as registerAction} from "@/actions/register"
import { useSearchParams } from "next/navigation";


export type RegisterFormValues = z.infer<typeof RegisterSchema>;

// interface RegisterFormProps {
//   onRegister: (values: RegisterFormValues) => void;
// }

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const urlError = useSearchParams().get('error') === "OAuthAccountNotLinked" ? "This email is already registered using a different provider!" : "";


  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
      startTransition(() => {
        registerAction(values).then(resp => {
          if(resp.error){
            setErrorMessage(resp.error)
            setSuccessMessage('')
          }else if(resp.success){
            setSuccessMessage(resp.success);
            setErrorMessage('')
          }
        }).finally(() => setIsLoading(false))
      })

  }

  function socialSignIn(provider: "google" | "github"){
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">ReAnimate</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Create your account
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Join thousands of users digitizing their favorite books with AI
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3 items-start">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">First name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="John"
                          className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Last name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Doe"
                          className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="john@example.com"
                        className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  <FormLabel className="text-sm font-medium text-gray-700">Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600 leading-5">
                      I agree to the{' '}
                      <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0 h-auto">
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0 h-auto">
                        Privacy Policy
                      </Button>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          <FormResponseMessage type="success" message={successMessage} />
          <FormResponseMessage type="error" message={errorMessage || urlError} />

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" onClick={() => socialSignIn("google")} className="w-full border-gray-200 hover:bg-gray-50">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <Button variant="outline" onClick={() => socialSignIn("github")} className="w-full border-gray-200 hover:bg-gray-50">
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
      <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;