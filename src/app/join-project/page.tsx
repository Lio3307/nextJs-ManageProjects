"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { joinProjectButton, searchProject } from "../actions";
import { authClient } from "@/lib/auth-client";
import SubmitForm from "@/components/submit-form";

export default function JoinProject() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<string>("");
  const { data: session } = authClient.useSession();


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
    <div className="full-w p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Join a Project
        </h2>

        <div className="flex gap-3 mb-4">
          <form className="full-w" action={handleSearch}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Input invite code..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {searchValue.trim() !== "" && (
            <SubmitForm buttonName="Search"/>
          )}
          </form>
        </div>

        {message && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {project && (
          <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <form action={joinProjectButton}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <h3
                id="project-title"
                className="font-bold text-2xl text-gray-800 mb-2"
              >
                {project.title}
              </h3>
              <p
                id="project-desc"
                className="text-gray-600 mb-3 leading-relaxed"
              >
                {project.description}
              </p>
              <p
                id="project-by"
                className="text-sm text-gray-500 flex items-center gap-2"
              >
                <span className="font-medium">Created by:</span>
                <span className="bg-white px-3 py-1 rounded-full text-xs">
                  {project.createdBy}
                </span>
              </p>
            </div>

            {session?.user.id !== project.userId && (
              <div className="p-6 bg-white">
                <input type="hidden" name="join-id-project" value={project.id}/>
                <input type="hidden" name="project-invite-code" value={project.inviteCode}/>
                <SubmitForm buttonName="Join Project" />
              </div>
            )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
