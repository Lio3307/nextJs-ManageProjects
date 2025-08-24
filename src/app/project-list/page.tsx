import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/project-task/project-card";

export default async function ProjectList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.project.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <div>
      {data.length === 0 ? (
        <p>You dont have task</p>
      ) : (
        data.map((item) => <ProjectCard key={item.id} data={item} />)
      )}
    </div>
  );
}
