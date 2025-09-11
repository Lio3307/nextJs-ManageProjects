"use client";

import JSONRender from "../json-content-parse/json-render";
import type { Task } from "@prisma/client";

export default function DetailedTask({ detailedTask }: { detailedTask: Task }) {
  return (
    <>

      <div className="flex justify-between mt-4">
        <p className="text-xs txet-gray-600">
          Task by:{" "}
          <span className="text-xs txet-black font-bold">
            {detailedTask.createdBy}
          </span>
        </p>
        <p className="text-xs txet-gray-600">
          Created at:{" "}
          <span className="text-xs txet-black font-bold">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(detailedTask.createdAt)}
          </span>
        </p>
      </div>

        <p className="p-2 text-sm my-2 txet-gray-600">
          Task :{" "}
          <span className="text-sm txet-black font-bold">
            {detailedTask.title}
          </span>
        </p>

      <JSONRender content={JSON.parse(detailedTask.content)} />
    </>
  );
}
