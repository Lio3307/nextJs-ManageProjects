import LogedOut from "@/components/logout";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50">
      <h1 className="text-2xl font-semibold">Welcome </h1>

      <div className="flex items-center gap-4">
        <Link href="/add-project" className={buttonVariants()}>
          Add Project
        </Link>

        {session && <LogedOut />}
        {session && <Link href="/project-list">Project list</Link>}
      </div>
    </div>
  );
}
