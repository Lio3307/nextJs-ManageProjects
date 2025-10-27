"use client";

import { handleDeleteTask } from "@/app/actions/handle-delete-task";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ActionTask({ idTask }: { idTask: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure want to delete this Task?");
    if (!confirmDelete) return;
    const { success, message } = await handleDeleteTask(idTask);
    if (success) {
      toast.success(message as string);
    } else {
      toast.error(message as string);
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
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="text-red-600 mr-2 h-4 w-4" />
          Delete Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/edit/task/${idTask}`)}
          className="text-sky-600 focus:text-sky-600"
        >
          <FilePen className="text-sky-600 mr-2 h-4 w-4" />
          Edit Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
