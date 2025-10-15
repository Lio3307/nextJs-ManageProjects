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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join a Project
            </h2>
            <p className="text-gray-600">
              Enter the invite code to join an existing project
            </p>
          </div>

          <form className="w-full mb-6" action={handleSearch}>
            <div className="flex gap-3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter invite code..."
                className="flex-1 border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 placeholder-gray-400"
              />

              {searchValue.trim() !== "" && <SubmitForm buttonName="Search" />}
            </div>
          </form>

          {message && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {project && (
            <div className="mt-8 border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <form action={joinProjectButton}>
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      id="project-title"
                      className="font-bold text-3xl text-gray-900 flex-1"
                    >
                      {project.title}
                    </h3>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Project
                    </div>
                  </div>

                  <p
                    id="project-desc"
                    className="text-gray-700 mb-6 leading-relaxed text-lg"
                  >
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium">
                      Created by:
                    </span>
                    <span
                      id="project-by"
                      className="bg-white px-4 py-1.5 rounded-full text-gray-800 font-semibold shadow-sm"
                    >
                      {project.createdBy}
                    </span>
                  </div>
                </div>

                {session?.user.id !== project.userId && (
                  <div className="p-8 bg-white border-t-2 border-gray-100">
                    <input
                      type="hidden"
                      name="join-id-project"
                      value={project.id}
                    />
                    <input
                      type="hidden"
                      name="project-invite-code"
                      value={project.inviteCode}
                    />
                    <SubmitForm buttonName="Join Project" />
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
