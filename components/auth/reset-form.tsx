"use client";

import {
  BookOpen,
  Mail,
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
import { ResetFormValue, ResetSchema } from "@/schemas";
import Link from "next/link";
import { FormResponseMessage } from "./form-response-message";
import { reset } from "@/actions/reset";

const ResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('')


  const form = useForm<ResetFormValue>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ResetFormValue) {
    setIsLoading(true);

    startTransition(() => {
      reset(values)
        .then((resp) => {
          if (resp?.error){
            setErrorMessage(resp?.error);
            setSuccessMessage("")
          }
          if(resp?.success){
            setSuccessMessage(resp.success!);
            setErrorMessage("");
          }
        })
        .finally(() => {
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
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Reset your password using your email address
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
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

              <FormResponseMessage
                type="error"
                message={errorMessage}
              />

            <FormResponseMessage type="success" message={successMessage} />


              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending email..."
                ) : (
                  <>
                    Send reset email
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

export default ResetForm;
