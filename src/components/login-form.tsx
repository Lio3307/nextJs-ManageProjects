"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { signIn } from "../../server/user";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import LogedIn from "./loged-in";
import Link from "next/link";
import { motion } from "motion/react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: session, isPending } = authClient.useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInwithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { success, message } = await signIn(values.email, values.password);
      if (success) {
        toast.success(message as string);
        router.push("/dashboard");
      } else {
        console.error(message as string);
        toast.error("Something wrong, please try again");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-950 dark:text-gray-100" />
      </div>
    );
  }

  return (
    <>
      <LoadingOverlay 
        message="Signing in with Google..." 
        isVisible={isGoogleLoading} 
      />
      <LoadingOverlay 
        message="Signing in..." 
        isVisible={isLoading} 
      />
      {session ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LogedIn />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <Card className="border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl bg-white dark:bg-neutral-950">
            <CardHeader className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <CardTitle className="text-2xl font-bold text-neutral-950 dark:text-gray-100">
                  Welcome back
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Login to your account
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      onClick={signInwithGoogle}
                      variant="outline"
                      disabled={isGoogleLoading || isLoading}
                      className="w-full h-11 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium"
                      aria-describedby="google-signin-desc"
                    >
                      {isGoogleLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          Continue with Google
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white dark:bg-neutral-950 text-gray-500">
                        Or
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@email.com"
                              className="h-11 border-2 rounded-lg"
                              {...field}
                              disabled={isLoading || isGoogleLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-11 pr-10 border-2 rounded-lg"
                                {...field}
                                disabled={isLoading || isGoogleLoading}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                disabled={isLoading || isGoogleLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      disabled={isLoading || isGoogleLoading}
                      type="submit"
                      className="w-full h-11 bg-neutral-950 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-neutral-950 font-semibold rounded-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin mr-2" />
                          Signing in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    Dont have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-semibold text-neutral-950 dark:text-gray-100 hover:underline"
                    >
                      Sign up
                    </Link>
                  </motion.p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
