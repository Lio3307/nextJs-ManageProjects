"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { signUp } from "../../server/user";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import LogedIn from "./loged-in";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: session, isPending } = authClient.useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const signInwithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { success, message } = await signUp(
      values.email,
      values.password,
      values.name
    );
    if (success) {
      toast.success(message as string);
      router.push("/");
    } else {
      console.error(message)
      toast.error("Something wrong, please try again");
    }
    setIsLoading(false);
  }

  if(isPending){
    return <p>Loading</p>
  }

  return (
    <>
      {session ? (
        <LogedIn />
      ) : (
        <div className={cn("flex flex-col gap-6 items-center justify-center min-h-screen", className)} {...props}>
  <Card className="w-full max-w-md">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Login with your Google account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Button
            type="button"
            onClick={signInwithGoogle}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

          <div className="relative text-center text-sm text-muted-foreground">
            <span className="bg-card px-2 relative z-10">Or continue with</span>
            <div className="absolute inset-0 flex items-center">
              <div className="border-t border-border w-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>This is your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
          </Button>

          <div className="text-center text-sm">
            Have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 text-primary">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>

  <div className="text-muted-foreground text-center text-xs mt-4">
    By clicking continue, you agree to our{" "}
    <a href="#" className="underline text-primary">Terms of Service</a> and{" "}
    <a href="#" className="underline text-primary">Privacy Policy</a>.
  </div>
</div>

      )}
    </>
  );
}
