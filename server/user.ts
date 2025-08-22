"use server";
import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      success: true,
      message: "Sign In Successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An Unknown error",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
    try {
        await auth.api.signUpEmail({
          body: {
            email,
            password,
            name,
          },
        });
        return {success: true, message: "Successfully Sign In"}
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "Unkown error "
        }
    }
};
