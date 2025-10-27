"use client";

import { MemberList, Project, RequestJoin } from "@prisma/client";
import { useState } from "react";
import { joinProjectByCode } from "@/app/actions/handle-join-project";
import { searchProject } from "@/app/actions/handle-search-project";
import SubmitForm from "@/components/submit-form";
import { User, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function InviteProject({ userId }: { userId: string }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<string>("");
  const [member, setMember] = useState<MemberList | null>(null);
  const [alreadySendRequest, setAlreadySendRequest] =
    useState<RequestJoin | null>(null);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    const {
      project: projectData,
      memberList,
      requestJoin,
    } = await searchProject(searchValue, userId);

    if (projectData) {
      setProject(projectData);
      setMember(memberList);
      setAlreadySendRequest(requestJoin);
      setMessage("");
    } else {
      setProject(null);
      setMessage("Project not found, please check the invite code");
    }
  };

  const handleJoin = async (formData: FormData) => {
    const {success, message} = await joinProjectByCode(formData)
    if(success) {
      toast.success(message as string)
    } else {
      toast.error(message as string)
    }
  }

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
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" />
              <span>{message}</span>
            </div>
          )}

          {project && (
            <div className="mt-8 border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <form action={handleJoin}>
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
                    <User className="w-5 h-5 text-gray-400" />
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

                {userId !== member?.memberIdList &&
                userId !== alreadySendRequest?.userId ? (
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
                ) : null}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
