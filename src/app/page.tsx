import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>welcome</p>
      <Link href="/add-project" className={buttonVariants()}>
        Add Project
      </Link>
    </>
  );
}
