import SubmitForm from "../submit-form";

export default async function CommentForm({
  params,
}: {
  params: Promise<{ idReport: string }>;
}) {
  const { idReport } = await params;

  return (
    <>
      <div className="mt-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <form action="" className="space-y-3">
          <label
            htmlFor="comment"
            className="block text-xs font-medium text-gray-700"
          >
            Comment
          </label>

          <textarea
            id="comment"
            name="comment"
            rows={3}
            placeholder="Write your comment here..."
            className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          />

          <input name="idReport" type="hidden" value={idReport} />

          <div className="flex justify-end">
            <SubmitForm buttonName="Comment" />
          </div>
        </form>
      </div>
    </>
  );
}
