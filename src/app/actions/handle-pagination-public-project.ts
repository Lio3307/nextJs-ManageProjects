"use server";

import prisma from "@/lib/prisma";

export async function getProjects(skip: number = 0, take: number = 15) {
  const projects = await prisma.project.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
    where: {
      visibility: "Public",
    },
  });

  return projects;
}