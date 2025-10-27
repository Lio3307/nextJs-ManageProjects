"use client";

import { joinPublicProject } from "@/app/actions/handle-join-public-project";
import SubmitForm from "../submit-form";
import { toast } from "sonner";

export default function JoinPublicProjectButton({
  userId,
  idProject,
}: {
  userId: string;
  idProject: string;
}) {
  const handleJoinPublic = async (formData: FormData) => {
    const { success, message } = await joinPublicProject(formData);
    if (success) {
      toast.success(message as string);
    } else {
      toast.error(message as string);
    }
  };
  return (
    <form action={handleJoinPublic}>
      <input type="hidden" name="user-id" value={userId} />
      <input type="hidden" name="id-project" value={idProject} />
      <SubmitForm buttonName="Join Project" />
    </form>
  );
}
