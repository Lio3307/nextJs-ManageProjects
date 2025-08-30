"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Report } from "@prisma/client";
import SubmitForm from "../submit-form";

export default function ReportList({ reportData }: { reportData: Report[] }) {
  return (
    <>
      <div className="p-6 mb-4">
        <div className="shadow-md px-4 py-2">
          <form action="">
            <div className="my-2 flex justify-end">
            <SubmitForm buttonName="Report"/>
            </div>
            <div className=" flex flex-col">
              <Label className="text-xs my-2 text-gray-600">Title</Label>
              <Input type="text" required />
            </div>
            <div className=" flex flex-col">
              <Label className="text-xs my-2 text-gray-600">Report</Label>
              <textarea required />
            </div>
            
          </form>
        </div>
        <div className="my-4">
          {!reportData || reportData.length === 0 ? (
            <p className="text-gray-600 text-sm text-center mt-6">
              No reports yet
            </p>
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
