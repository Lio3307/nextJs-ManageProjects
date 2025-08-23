import Tiptap from "@/components/tiptap-editor";
import { Card, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProject(){
    return (
        <>
            <div className="flex justify-center">
                    <Card>
                        <CardHeader>Create Project Manager</CardHeader>
                        <CardDescription>Create your own project note</CardDescription>
                        <CardContent>
                            <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Title</Label>
                                <Input name="title" required type="text"/>
                            </div>
                            <Tiptap/>
                            </form>
                        </CardContent>
                    </Card>
            </div>
        </>
    )
}