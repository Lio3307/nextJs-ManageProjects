"use client";

import { handleDeleteReport } from "@/app/actions/handle-delete-report";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AcitonReport({ idReport }: { idReport: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure want to delete this report?");
    if (!confirmDelete) return;
    const { success, massage } = await handleDeleteReport(idReport);
    if (success) {
      toast.success(massage as string);
    } else {
      toast.error(massage as string);
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
          Delete Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
