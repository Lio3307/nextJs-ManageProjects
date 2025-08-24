import { Card, CardContent, CardTitle } from "../ui/card";

type ProjectProps = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdBy: string;
};

export default function ProjectCard({ data }: { data: ProjectProps }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-wrap gap-3">
        <Card className="max-w-xl w-full p-4">
          <CardTitle className="mb-2 text-lg font-semibold">
            {data.title}
          </CardTitle>
          <CardContent>
            <div
              className="prose prose-sm max-w-none mb-3"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <p className="text-gray-600 text-xs">
              By : <span className="text-xs font-medium">{data.createdBy}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
