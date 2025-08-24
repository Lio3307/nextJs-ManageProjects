import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/project-task/project-card";

export default async function ProjectList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const data = await prisma.project.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-4 py-6">
      {data.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          You don&apos;t have any tasks yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <ProjectCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
