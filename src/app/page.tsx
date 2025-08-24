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
    <>
      {session ? (
        <div className="flex ">
          <p>welcome</p>
          <Link href="/add-project" className={buttonVariants()}>
            Add Project
          </Link>
          <LogedOut />
        </div>
      ) : (
        <>
          <p>welcome</p>
          <Link href="/add-project" className={buttonVariants()}>
            Add Project
          </Link>
        </>
      )}
    </>
  );
}
