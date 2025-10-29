"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { handleAddProject } from "@/app/actions/handle-add-project";
import SubmitForm from "../submit-form";
import { EyeOff, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProjectModal({ onClose }: { onClose?: () => void }) {
  const [portal, setPortal] = useState<Element | null>(null);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("Public");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Input field cannot empty");
      return;
    }
    const { success, message } = await handleAddProject(
      title,
      description,
      selectedVisibility
    );
    if (success) {
      toast.success(message as string);
      router.replace("/project-list");
    } else {
      toast.error(message as string);
    }
  };

  useEffect(() => {
    setPortal(document.querySelector("#portals"));
  }, []);

  if (!portal) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-30 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-all duration-200 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <CardHeader className="flex-shrink-0 pb-6 pt-8 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start space-x-4 relative z-10 pr-10">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 ring-4 ring-gray-900/10 dark:ring-gray-100/10">
              <Plus
                className="w-7 h-7 text-white dark:text-gray-900"
                strokeWidth={2.5}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-2 leading-tight">
                Create New Project
              </h2>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Set up your project to get started
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-6 lg:px-8 py-8">
          <form action={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <Label
                    className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide"
                    htmlFor="title"
                  >
                    Project Name
                  </Label>
                  <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                    *
                  </span>
                </div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Enter your project name..."
                  className="h-12 lg:h-14 text-base px-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 transition-all duration-200 rounded-xl shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <Label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Visibility
                  </Label>
                  <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                    *
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                      <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                        Who can see this?
                      </span>
                    </div>
                    <Select
                      value={selectedVisibility}
                      onValueChange={setSelectedVisibility}
                      required
                    >
                      <SelectTrigger className="w-28 sm:w-32 h-10 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 rounded-lg font-semibold text-sm shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 flex-shrink-0">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                        <SelectItem
                          value="Public"
                          className="focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="Private"
                          className="focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                            <span>Private</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    {selectedVisibility === "Public"
                      ? "Anyone can view this project"
                      : selectedVisibility === "Private"
                      ? "Only you and invited members can access"
                      : "Choose project visibility"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                <Label
                  className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide"
                  htmlFor="description"
                >
                  Project Description
                </Label>
                <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                  *
                </span>
              </div>

              <textarea
                id="description"
                name="description"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={5}
                className="w-full min-h-[140px] rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 text-sm lg:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 transition-all duration-200 resize-none shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                placeholder="Describe your project goals, objectives, and key details..."
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Provide clear and detailed information
                  </p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  <p className="text-xs lg:text-sm font-bold text-gray-900 dark:text-gray-100">
                    {description.length} chars
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <SubmitForm buttonName="Create Project" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>,
    portal
  );
}
