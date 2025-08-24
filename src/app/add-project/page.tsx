import Tiptap from "@/components/tiptap-editor";


export default function AddProject() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900 p-6 md:p-12">
      <div className="mx-auto w-full max-w-7xl rounded-2xl shadow-lg bg-white dark:bg-zinc-900 p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-3">Create Project Manager</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Create your own project note
        </p>

          <Tiptap />
      </div>
    </div>
  );
}
