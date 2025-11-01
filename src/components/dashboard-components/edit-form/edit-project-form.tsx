"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import SubmitForm from "../submit-form";
import { buttonVariants } from "../../ui/button";
import { ArrowLeftFromLine, Eye, Lock } from "lucide-react";
import Link from "next/link";
import { handleUpdateProject } from "@/app/actions/handle-update-project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
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
      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
        <div className="px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 lg:w-7 lg:h-7 text-gray-900 dark:text-neutral-50"
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-neutral-50">
                Edit Project
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-neutral-200 mt-1">
                Update your project details
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <form action={handleSubmit} className="space-y-8">
            <div className="hidden md:flex justify-end gap-3 lg:gap-4">
              <SubmitForm buttonName="Update" />
              <Link
                href={`/dashboard/project/${selectedData.id}`}
                className={buttonVariants({
                  variant: "secondary",
                  className:
                    "font-semibold border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-900 transition-all duration-200",
                })}
              >
                <ArrowLeftFromLine /> Back
              </Link>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-900 dark:text-neutral-50 flex items-center gap-1">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                name="newTitle"
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                placeholder="Enter project title..."
                className="w-full h-12 lg:h-14 text-base border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-gray-900 dark:text-neutral-50 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-neutral-50"
                required
              />
              {newTitle && (
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800">
                  <p className="text-xs text-gray-600 dark:text-neutral-200">
                    Character count
                  </p>
                  <p className="text-xs font-bold text-gray-900 dark:text-neutral-50">
                    {newTitle.length} chars
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-900 dark:text-neutral-50 flex items-center gap-1">
                Project Visibility <span className="text-red-500">*</span>
              </Label>
              <Select
                value={newVisibilityType}
                onValueChange={setNewVisibilityType}
                required
              >
                <SelectTrigger className="w-full h-12 lg:h-14 text-base border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-semibold rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-neutral-50">
                  <SelectValue placeholder="Choose project visibility..." />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-950 border border-gray-300 dark:border-neutral-800">
                  <SelectItem
                    value="Public"
                    className="hover:bg-gray-100 dark:hover:bg-neutral-900"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Public - Anyone can view
                  </SelectItem>
                  <SelectItem
                    value="Private"
                    className="hover:bg-gray-100 dark:hover:bg-neutral-900"
                  >
                    <Lock className="w-4 h-4 mr-2" /> Private - Only members can
                    view
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-neutral-200 p-3 border rounded-lg bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
                {newVisibilityType === "Public"
                  ? "This project will be visible to everyone"
                  : "Only project members can access this project"}
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-900 dark:text-neutral-50">
                Project Description
              </Label>
              <textarea
                name="newDesc"
                onChange={(e) => setNewDesc(e.target.value)}
                value={newDesc}
                placeholder="Describe your project..."
                className="w-full min-h-[160px] rounded-xl border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 text-sm lg:text-base focus:ring-2 focus:ring-gray-900 dark:focus:ring-neutral-50"
                rows={6}
              />
              {newDesc && (
                <div className="text-right text-xs font-bold text-gray-900 dark:text-neutral-50">
                  {newDesc.length}
                </div>
              )}
            </div>

            <div className="flex flex-col md:hidden gap-3 pt-6 border-t border-gray-200 dark:border-neutral-800">
              <SubmitForm buttonName="Update Project" />
              <Link
                href={`/dashboard/project/${selectedData.id}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full h-12 border font-semibold",
                })}
              >
                <ArrowLeftFromLine className="mr-2 h-4 w-4" /> Cancel & Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
