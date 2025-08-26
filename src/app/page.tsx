import ModalTrigger from "@/components/modals/modal-trigger";
import ProjectCard from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import ProjectModal from "@/components/modals/project-modals";
import Link from "next/link";

export default async function Home() {
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
    take: 4,
  });

  if (!session) {
    return (
      <>
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <div className="flex items-center justify-between">
            <p>You not registered yet, want to create account?</p>
            <Link className={buttonVariants()} href="/login">
              sign In
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/signup"
            >
              sign Up
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {data.length === 0 ? (
        <div className="p-6">
          <h1 className="text-2xl font-semibold">
            Welcome <span className="font-none">{session.user.name}</span>
          </h1>
          <div className="flex items-center justify-between">
            <p>You dont have a project yet</p>
            <ModalTrigger compo={<ProjectModal/>} buttonName="Create Project"/>
          </div>
        </div>
      ) : (
        <div className="p-6 w-full">
          <h1 className="text-2xl font-semibold">
            Welcome <span className="font-none">{session.user.name}</span>
          </h1>
          <p className="text-xs text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            necessitatibus ex, porro, labore qui repellat placeat corporis ut
            amet hic eos voluptates veritatis! Sint voluptas ut adipisci dolores
            porro et.
          </p>

          <div className="">
            <div className="mt-6 flex justify-between">
              <h1 className="text-[1.6rem] font-bold">Projects</h1>
              <Link href="/add-project">
                <ArrowRight size="2.2rem" />
              </Link>
            </div>
            <div className="h-[0.1rem] bg-black"></div>

            <div className="flex flex-wrap mt-3 gap-4">
              {data.map((item) => (
                <ProjectCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
