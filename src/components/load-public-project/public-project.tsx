"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions";
import { Project } from "@prisma/client";

export default function PublicProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const take = 15;
  const [loading, setLoading] = useState<boolean>(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const newProject = await getProjects(skip, take);
      setProjects((prev) => [...prev, ...newProject]);
      setSkip((prev) => prev + take);
      setLoading(false);
    } catch (error) {
      throw new Error(`Something error : ${error}`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded">
            {project.title}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={loadProjects}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
