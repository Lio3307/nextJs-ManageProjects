import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import JSONRender from "@/components/json-content-parse/json-render";
import prisma from "@/lib/prisma"

export default async function DetailTask({params}: {params: Promise<{idTask: string, idProject:string}>}){

    const {idTask, idProject} = await params
    const projectName = await prisma.project.findUnique({
        where: {
            id: idProject
        }
    })

    if(!projectName){   
            return;
    }

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
                <BreadcrumbWithCustomSeparator name={projectName.title} link={`/project/${idProject}`}/>
            <div className="flex justify-between mt-4">
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