import { SignUpForm } from "@/components/signup-form"

export default function SignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 ">
      <div className="flex w-full max-w-sm flex-col">
        <SignUpForm />
      </div>
    </div>
  )
}
