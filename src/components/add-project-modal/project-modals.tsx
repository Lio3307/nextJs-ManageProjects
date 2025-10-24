"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { handleAddProject } from "@/app/actions/handle-add-project"; 
import SubmitForm from "../submit-form";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ProjectModal({ onClose }: { onClose?: () => void }) {
  const [portal, setPortal] = useState<Element | null>(null);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("Public");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Input field cannot empty");
      return;
    }
    try {
      await handleAddProject(title, description, selectedVisibility);
    } catch (error) {
      throw new Error(`Error adding new data : ${error}`);
    }
  };

  useEffect(() => {
    setPortal(document.querySelector("#portals"));
  }, []);

  if (!portal) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-lg mx-auto rounded-2xl shadow-2xl border-0 bg-white transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-all duration-200"
        >
          <X className="cursor-pointer" size={20} />
        </button>

        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Create New Project
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Set up your project to get started
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form action={handleSubmit} className="space-y-4"> 
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 w-full">
                <Label
                  className="text-sm font-semibold text-gray-900"
                  htmlFor="title"
                >
                  Project Name
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Enter your project name..."
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 w-full">
                <Label className="text-sm font-semibold text-gray-900">
                  Project Visibility
                </Label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Who can see this project?
                    </span>
                  </div>
                  <Select
                    value={selectedVisibility}
                    onValueChange={setSelectedVisibility}
                    required
                  >
                    <SelectTrigger className="w-32 h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public" className="flex items-center">
                        Public
                      </SelectItem>
                      <SelectItem value="Private" className="flex items-center">
                        Private
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">
                  {selectedVisibility === "Public"
                    ? "Anyone can view this project"
                    : selectedVisibility === "Private"
                    ? "Only you and invited members can access"
                    : "Choose project visibility"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                className="text-sm font-semibold text-gray-900"
                htmlFor="description"
              >
                Project Description
              </Label>
              <textarea
                id="description"
                name="description"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={3}
                className="w-full min-h-[100px] rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                placeholder="Describe your project goals, objectives, and key details..."
              />
              <p className="text-xs text-gray-500">
                {description.length} characters
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <SubmitForm buttonName="Create Project" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>,
    portal
  );
}
