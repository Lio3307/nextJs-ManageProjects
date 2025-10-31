"use client"

import { kickUser } from "@/app/actions/handle-kick-user"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightFromLine, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

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
       const {success, message} = await kickUser(idUser, idMemberList, idProject)
       if(success){
        toast.success(message)
       } else {
        toast.error(message)
       }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="p-2 rounded-md hover:bg-muted transition"
          aria-label="Member actions"
        >
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
