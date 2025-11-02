"use server";

import prisma from "@/lib/prisma";

export async function getProjects(skip: number = 0, take: number = 15) {
  const projects = await prisma.project.findMany({
    skip,
    take: take + 1, // Fetch one extra to check if there are more
    orderBy: { createdAt: "desc" },
    where: {
      visibility: "Public",
    },
  });

  return projects.slice(0, take); // Return only the requested amount
}