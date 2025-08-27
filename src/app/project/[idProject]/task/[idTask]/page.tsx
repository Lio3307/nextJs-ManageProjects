import JSONRender from "@/components/json-content-parse/json-render";
import prisma from "@/lib/prisma"

export default async function DetailTask({params}: {params: Promise<{idTask: string}>}){

    const {idTask} = await params

    const taskData = await prisma.task.findUnique({
        where: {
            id: idTask
        }
    })

    if(!taskData){
        throw new Error("Unknown Task");
    }

    return (
        <>
            <div className="p-4">
            <div className="flex justify-between">
            <p className="text-xs txet-gray-600">Task by: <span className="text-xs txet-black font-bold">{taskData.createdBy}</span></p>
            <p className="text-xs txet-gray-600">Created at: <span className="text-xs txet-black font-bold">{new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(taskData.createdAt)}</span></p>
            </div>

            <JSONRender content={JSON.parse(taskData.content)}/>
            </div>
        </>
    )
}