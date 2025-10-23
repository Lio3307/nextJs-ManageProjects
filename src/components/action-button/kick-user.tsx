"use client"

import { kickUser } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightFromLine, EllipsisVertical } from "lucide-react";

export default function KickMember({
  idUser,
  idMemberList,
  idProject,
}: {
  idUser: string;
  idMemberList: string;
  idProject: string;
}) {
  const handleKick = async () => {
    const confirmKick = confirm("Are you sure want to kick this member?");
    if (!confirmKick) return;
    try {
        await kickUser(idUser, idMemberList, idProject)
        alert('Successfully kick member')
    } catch (error) {
        throw new Error(`Cannot kick member : ${error}`)
    }
  };

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
          onClick={handleKick}
          className="text-red-600 focus:text-red-600"
        >
          <ArrowRightFromLine className="text-red-600 mr-2 h-4 w-4" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
