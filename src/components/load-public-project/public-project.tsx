"use client";
import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions/handle-pagination-public-project";
import { Project } from "@prisma/client";
import ProjectCard from "../card/project-card";
import { Archive, Loader2 } from "lucide-react";

export default function PublicProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const take = 15;
  const [loading, setLoading] = useState<boolean>(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const newProject = await getProjects(skip, take);

      setProjects((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const filtered = newProject.filter((p) => !ids.has(p.id));
        return [...prev, ...filtered];
      });

      setSkip((prev) => prev + take);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    return () => {
      setProjects([]);
      setSkip(0);
    };
  }, []);

  return (
    <div className="space-y-6">
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {projects.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard data={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="flex justify-center text-gray-400 mb-4">
            <Archive className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No public projects yet
          </h3>
          <p className="text-gray-500">
            Click the button below to load public projects from the community
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={loadProjects}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading
            ? "Loading..."
            : projects.length === 0
            ? "Load Public Projects"
            : "Load More"}
        </button>
      </div>
    </div>
  );
}
