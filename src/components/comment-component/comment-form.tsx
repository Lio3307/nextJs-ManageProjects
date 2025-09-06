import prisma from "@/lib/prisma";
import SubmitForm from "../submit-form";
import CommentCard from "./comment-card";
import { handleComment } from "@/app/actions";

export default async function CommentForm({ reportId }: { reportId: string }) {
  const commentReport = await prisma.comment.findMany({
    where: {
      reportId: reportId,
    },
  });
  return (
    <>
    <div className="w-full">
 <div className="grid gap-4">
   <div className="grid grid-cols-1">
     <div className="flex justify-between">
       <p className="font-bold text-sm">
         Comment{" "}
         <span className="text-xs text-gray-600 mx-2">
           {commentReport.length > 0 ? commentReport.length : "0"}
         </span>{" "}
       </p>
     </div>
   </div>
   
   <div className="h-px bg-gray-300"></div>
   
   <div className="grid grid-cols-1">
     <form action={handleComment}>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
         <div className="">
           <SubmitForm buttonName="Comment" />
         </div>
       </div>
       <div className="grid grid-cols-1 gap-4 mt-4">
         <textarea
         required
           placeholder="Write comments..."
           className="rounded-md text-sm p-3 border border-gray-300 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
           name="comment"
           rows={4}
         />
         <input name="reportId" type="hidden" value={reportId} />
       </div>
     </form>
   </div>
   
   <div className="grid grid-cols-1">
     <CommentCard dataComments={commentReport}/>
   </div>
 </div>
 </div>
</>
  );
}
