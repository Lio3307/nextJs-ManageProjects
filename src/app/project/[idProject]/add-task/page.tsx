import Tiptap from "@/components/tiptap-editor";

export default async function AddTask({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  return (
    <>
      <div className="p-6">
        <Tiptap idProject={idProject} />
      </div>
    </>
  );
}
