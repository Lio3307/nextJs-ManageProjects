"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SubmitForm from "../submit-form";
import { buttonVariants } from "../ui/button";
import { ArrowLeftFromLine, Eye, Lock } from "lucide-react";
import Link from "next/link";
import { handleUpdateProject } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

  const handleSubmit = async () => {
    try {
      await handleUpdateProject(
        newTitle,
        newDesc,
        selectedData.id,
        newVisibilityType
      );
    } catch (error) {
      throw new Error(`Something error ${error}`);
    } finally {
      alert("Successfully updated the project");
    }
  };

  return (
    <div className="p-4 w-full ">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Edit Project
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Update your project details
          </p>
        </div>

        <div className="p-6">
          <form action={handleSubmit} className="space-y-8">
            <div className="md:flex hidden  md:flex-col sm:flex-row justify-end gap-3">
              
              <SubmitForm buttonName="Update" />
              <Link
                href={`/project/${selectedData.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                <ArrowLeftFromLine className="mr-2 h-4 w-4" />
                Back
              </Link>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Label className="text-sm font-semibold text-gray-900">
                    Project Title
                  </Label>
                  <span className="text-red-500 text-sm">*</span>
                </div>
                <Input
                  name="newTitle"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="Enter project title..."
                  className="w-full h-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
                {newTitle && (
                  <p className="text-xs text-gray-500">
                    {newTitle.length}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Label
                    htmlFor="visibility-select"
                    className="text-sm font-semibold text-gray-900"
                  >
                    Project Visibility
                  </Label>
                  <span className="text-red-500 text-sm">*</span>
                </div>
                <Select
                  value={newVisibilityType}
                  onValueChange={setNewVisibilityType}
                  required
                >
                  <SelectTrigger className="w-full h-12 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                    <SelectValue placeholder="Choose project visibility..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">
                      <div className="flex items-center space-x-2">
                        <Eye />
                        <span>Public - Anyone can view</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Private">
                      <Lock />
                        <span>Private - Only members can view</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {newVisibilityType === "Public"
                    ? "This project will be visible to everyone"
                    : "Only project members can access this project"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <Label className="text-sm font-semibold text-gray-900">
                    Project Description
                  </Label>
                </div>
                <div className="relative">
                  <textarea
                    name="newDesc"
                    onChange={(e) => setNewDesc(e.target.value)}
                    value={newDesc}
                    placeholder="Describe your project goals, objectives, and key details..."
                    className="w-full min-h-[140px] lg:min-h-[160px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y transition-all duration-200"
                    rows={6}
                  />
                  {newDesc && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                      {newDesc.length}/500
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Provide a clear description to help team members understand
                  the project
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:hidden gap-3 pt-6 border-t border-gray-200">
              <SubmitForm buttonName="Update Project" />
              <Link
                href={`/project/${selectedData.id}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                <ArrowLeftFromLine className="mr-2 h-4 w-4" />
                Cancel & Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Tips for better projects
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>
                • Use clear, descriptive titles that explain the project purpose
              </li>
              <li>• Set visibility based on your teams collaboration needs</li>
              <li>• Include key objectives and deadlines in the description</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
