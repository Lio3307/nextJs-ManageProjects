import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";

export default function LogedIn() {
  return (
    <div className="flex justify-center">
      <Card>
        <CardContent className="p-6">
          <div>
            <CardTitle className="mb-4 text-center">You are already signed in</CardTitle>
            <div>
              <Link 
                className={buttonVariants()} 
                href={"/dashboard"}
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
