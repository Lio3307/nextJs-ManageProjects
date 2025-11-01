import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";

export default function LogedIn() {
  return (
    <>
      <div className="flex justify-center ">
        <Card>
          <CardContent>
            <CardTitle className="mb-4">You already registered</CardTitle>
            <Link className={buttonVariants()} href={"/dashboard"}>Back Home</Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
