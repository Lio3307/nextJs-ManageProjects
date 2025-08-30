"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Report } from "@prisma/client";

export default function ReportList({ reportData }: { reportData: Report[] }) {
  return (
    <>
      <div className="p-4">
        <div>
          <form action="">
            <div className=" flex flex-col">
              <Label>Title</Label>
              <Input type="text" required />
            </div>
            <div className=" flex flex-col">
              <Label>Report</Label>
              <textarea required />
            </div>
          </form>
        </div>
        <div>
          {!reportData || reportData.length === 0 ? (
            <p className="text-gray-600 text-sm text-center">No report </p>
          ) : (
            reportData.map((data) => (
              <div key={data.id} className="m-4 shadow-md">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600">
                    Report By: <span className="text-xs">{data.createdBy}</span>{" "}
                  </p>
                  <p className="text-xs text-gray-600">
                    Created At:{" "}
                    <span className="text-xs">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(data.createdAt)}
                    </span>{" "}
                  </p>
                </div>

                <div className="my-2">
                  <h1 className="text-2xl my-2">{data.title}</h1>
                  <p className="text-gray-600 text-xs my-2">
                    {data.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
