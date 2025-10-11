"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { searchProject } from "../actions";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function JoinProject() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<string>("");
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) return router.push("/login");

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    const result = await searchProject(searchValue);

    if (result) {
      setProject(result);
      setMessage("");
    } else {
      setProject(null);
      setMessage("Project not found, please check the invite code");
    }
  };

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Input invite code..."
        className="border px-2 py-1 rounded"
      />

      {searchValue.trim() !== "" && (
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 ml-2 rounded hover:bg-blue-600"
        >
          Search Project
        </button>
      )}

      {message && <p className="text-red-500 mt-2">{message}</p>}

      {project && (
        <form className="mt-4 border p-3 rounded">
          <h3 id="project-title" className="font-bold text-lg">
            {project.title}
          </h3>
          <p id="project-desc" className="text-gray-700">
            {project.description}
          </p>
          <p id="project-by" className="text-sm text-gray-500">
            Created by: {project.createdBy}
          </p>
          {session.user.id !== project.userId && (
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 mt-2 rounded hover:bg-green-600"
            >
              Join
            </button>
          )}
        </form>
      )}
    </>
  );
}
