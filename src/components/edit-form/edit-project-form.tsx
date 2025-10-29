"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SubmitForm from "../submit-form";
import { buttonVariants } from "../ui/button";
import { ArrowLeftFromLine, Eye, Info, Lock } from "lucide-react";
import Link from "next/link";
import { handleUpdateProject } from "@/app/actions/handle-update-project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditFormProject({
  selectedData,
}: {
  selectedData: Project;
}) {
  const [newTitle, setNewTitle] = useState<string>(selectedData.title);
  const [newDesc, setNewDesc] = useState<string>(selectedData.description);
  const [newVisibilityType, setNewVisibilityType] = useState<string>(
    selectedData.visibility
  );

  const router = useRouter();

  const handleSubmit = async () => {
    const { success, message } = await handleUpdateProject(
      newTitle,
      newDesc,
      selectedData.id,
      newVisibilityType
    );

    if (success) {
      toast.success(message as string);
      router.replace(`project/${selectedData.id}`);
    } else {
      toast.error(message as string);
    }
  };

  return (
    <div className="p-4 lg:p-6 w-full">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 border-b-2 border-gray-700 dark:border-gray-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 dark:bg-black/5 rounded-full blur-2xl"></div>

          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-black/20 flex-shrink-0">
              <svg
                className="w-6 h-6 lg:w-7 lg:h-7 text-white dark:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-extrabold text-white dark:text-gray-900 tracking-tight">
                Edit Project
              </h2>
              <p className="text-sm lg:text-base text-gray-200 dark:text-gray-700 mt-1">
                Update your project details
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <form action={handleSubmit} className="space-y-8">
            <div className="hidden md:flex flex-col sm:flex-row justify-end gap-3 lg:gap-4">
              <SubmitForm buttonName="Update" />
              <Link
                href={`/project/${selectedData.id}`}
                className={buttonVariants({
                  variant: "secondary",
                  className:
                    "font-semibold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                })}
              >
                <ArrowLeftFromLine />
                Back
              </Link>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                    <Label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Project Title
                    </Label>
                    <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                      *
                    </span>
                  </div>
                </div>
                <Input
                  name="newTitle"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="Enter project title..."
                  className="w-full h-12 lg:h-14 text-base border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 transition-all duration-200 rounded-xl shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                  required
                />
                {newTitle && (
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-3 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Character count
                      </p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {newTitle.length} chars
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                    <Label
                      htmlFor="visibility-select"
                      className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide"
                    >
                      Project Visibility
                    </Label>
                    <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                      *
                    </span>
                  </div>
                </div>
                <Select
                  value={newVisibilityType}
                  onValueChange={setNewVisibilityType}
                  required
                >
                  <SelectTrigger className="w-full h-12 lg:h-14 text-base border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 transition-all duration-200 rounded-xl shadow-sm hover:border-gray-300 dark:hover:border-gray-600 font-semibold">
                    <SelectValue placeholder="Choose project visibility..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                    <SelectItem
                      value="Public"
                      className="focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Public - Anyone can view</span>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="Private"
                      className="focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Private - Only members can view</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {newVisibilityType === "Public"
                      ? "This project will be visible to everyone"
                      : "Only project members can access this project"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                    <Label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Project Description
                    </Label>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    name="newDesc"
                    onChange={(e) => setNewDesc(e.target.value)}
                    value={newDesc}
                    placeholder="Describe your project goals, objectives, and key details..."
                    className="w-full min-h-[160px] lg:min-h-[180px] rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 text-sm lg:text-base text-gray-900 dark:text-gray-100 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 focus:border-gray-900 dark:focus:border-gray-100 resize-y transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                    rows={6}
                  />
                  {newDesc && (
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {newDesc.length}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Provide a clear description to help team members understand
                    the project
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:hidden gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <SubmitForm buttonName="Update Project" />
              <Link
                href={`/project/${selectedData.id}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full h-12 border-2 font-semibold",
                })}
              >
                <ArrowLeftFromLine className="mr-2 h-4 w-4" />
                Cancel & Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 lg:mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

        <div className="relative p-5 lg:p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Info
                className="w-5 h-5 text-white dark:text-gray-900"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                Tips for better projects
              </h4>
              <ul className="space-y-2.5 text-sm lg:text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Use clear, descriptive titles that explain the project
                    purpose
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Set visibility based on your teams collaboration needs
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Include key objectives and deadlines in the description
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
