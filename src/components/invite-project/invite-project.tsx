"use client";

import { MemberList, Project, RequestJoin } from "@prisma/client";
import { useState } from "react";
import { joinProjectByCode } from "@/app/actions/handle-join-project";
import { searchProject } from "@/app/actions/handle-search-project";
import SubmitForm from "@/components/submit-form";
import { User, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function InviteProject({ userId }: { userId: string }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<string>("");
  const [member, setMember] = useState<MemberList | null>(null);
  const [alreadySendRequest, setAlreadySendRequest] =
    useState<RequestJoin | null>(null);

  const router = useRouter();

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
    const { success, message } = await joinProjectByCode(formData);
    if (success) {
      toast.success(message as string);
      router.replace("/join-status");
    } else {
      toast.error(message as string);
    }
  };

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-4 lg:p-6 transition-colors duration-300">
  <div className="max-w-3xl mx-auto">
    <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
      <div className="relative overflow-hidden bg-gray-900 dark:bg-gray-100 p-8 lg:p-10 border-b-2 border-gray-700 dark:border-gray-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/20 dark:ring-black/20 flex-shrink-0">
            <svg
              className="w-6 h-6 text-white dark:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-white dark:text-gray-900 mb-2 tracking-tight">
              Join a Project
            </h2>
            <p className="text-base text-gray-200 dark:text-gray-700 leading-relaxed">
              Enter the invite code to join an existing project
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <form className="w-full mb-8" action={handleSearch}>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-1 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                <label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Invite Code
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter invite code..."
                className="flex-1 h-14 border-2 border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 focus:border-gray-900 dark:focus:border-gray-100 transition-all duration-200 shadow-sm hover:border-gray-300 dark:hover:border-neutral-800 font-medium text-base"
              />
              {searchValue.trim() !== "" && (
                <div className="sm:w-auto w-full">
                  <SubmitForm buttonName="Search" />
                </div>
              )}
            </div>
          </div>
        </form>

        {message && (
          <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800/50 rounded-xl p-5 mb-8 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500/10 dark:bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircle
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm lg:text-base text-red-800 dark:text-red-300 font-medium leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}

        {project && (
          <div className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <form action={handleJoin}>
              <div className="relative overflow-hidden bg-gray-50 dark:bg-neutral-950 p-6 lg:p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="h-16 w-1.5 bg-gray-900 dark:bg-gray-100 rounded-full flex-shrink-0"></div>
                      <h3
                        id="project-title"
                        className="font-extrabold text-2xl lg:text-3xl text-gray-900 dark:text-gray-100 leading-tight tracking-tight flex-1"
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full text-xs font-bold uppercase tracking-wide shadow-md flex-shrink-0">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      Project
                    </div>
                  </div>

                  <div className="pl-6">
                    <p
                      id="project-desc"
                      className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-950 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <div className="w-10 h-10 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-neutral-800 flex-shrink-0">
                      <User
                        className="w-5 h-5 text-white dark:text-gray-900"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Created by:
                      </span>
                      <span
                        id="project-by"
                        className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full text-sm text-gray-900 dark:text-gray-100 font-bold shadow-sm border border-gray-200 dark:border-neutral-700"
                      >
                        {project.createdBy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {userId !== member?.memberIdList &&
              userId !== alreadySendRequest?.userId ? (
                <div className="p-6 lg:p-8 bg-white dark:bg-neutral-950 border-t-2 border-gray-200 dark:border-neutral-800">
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

    {!project && !message && (
      <div className="mt-6 lg:mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 dark:bg-neutral-950 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

        <div className="relative p-5 border-2 border-gray-200 dark:border-neutral-800 rounded-2xl transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg
                className="w-5 h-5 text-white dark:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base lg:text-md font-bold text-gray-900 dark:text-gray-100 mb-3">
                How to Join
              </h4>
              <ul className="space-y-2.5 text-sm lg:text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Get an invite code from a project owner or member</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Enter the code in the field above and click Search</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Review the project details and click Join Project</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
}
