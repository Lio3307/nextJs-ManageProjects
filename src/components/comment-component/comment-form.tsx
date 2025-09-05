import SubmitForm from "../submit-form";

export default async function CommentForm({ reportId }: { reportId: string }) {
  return (
    <>
      <div className="w-full">
        <div></div>
        <form action="">
          <div className="flex justify-between flex-1">
            <label className="text-xs py-2 text-gray-600">Comment input</label>
            <SubmitForm buttonName="Comment" />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Write comments..."
              className="rounded-md text-sm p-2 border-1 w-full placeholder-gray-400"
              name="comment"
            />
            <input name="reportId" type="hidden" value={reportId} />
          </div>
        </form>
      </div>
    </>
  );
}
