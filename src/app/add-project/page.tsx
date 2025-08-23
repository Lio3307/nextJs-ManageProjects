import { Card, CardDescription, CardHeader, CardContent } from "@/components/ui/card";

export default function AddProject(){
    return (
        <>
            <div className="flex justify-center">
                    <Card>
                        <CardHeader>Create Project Manager</CardHeader>
                        <CardDescription>Create your own project note</CardDescription>
                        <CardContent>
                            <form className=""></form>
                        </CardContent>
                    </Card>
            </div>
        </>
    )
}