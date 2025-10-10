"use client";

import { handleDeleteProject } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePen, Paperclip, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteProject({ idProject, inviteCode }: { idProject: string, inviteCode: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure want to delete this project?");
    if (!confirmDelete) return;
    await handleDeleteProject(idProject);
  };

  const handleCopyInviteCode = () => {
    try {
      navigator.clipboard.writeText(inviteCode)
      alert("Invite code copied to clipboard")
    } catch (error) {
      console.error("Failed to copy the  invite code", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted transition">
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="text-red-600 mr-2 h-4 w-4" />
          Delete Project
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/edit/project/${idProject}`)}
          className="text-sky-600 focus:text-sky-600"
        >
          <FilePen className="text-sky-600 mr-2 h-4 w-4" />
          Update Project
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyInviteCode}
          className="text-sky-600 focus:text-sky-600"
        >
          <Paperclip className="text-sky-600 mr-2 h-4 w-4" />
          Copy invite code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
