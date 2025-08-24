import { PrismaClient } from "@prisma/client";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export default async function ButtonAddProjects({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  const prisma = new PrismaClient();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const handleSumbit = async () => {
    if (!session) {
      return redirect("/login");
    }
    try {
      await prisma.project.create({
        data: {
          title: title,
          content: content,
          userId: session.user.id,
        },
      });
      toast.success("Successfully adding new task")
      revalidatePath("/");
    } catch (error) {
        toast.error(error as string)
    }
    return redirect("/")
  };
  return (
    <>
      <Button onClick={handleSumbit}>Add Projects</Button>
    </>
  );
}
