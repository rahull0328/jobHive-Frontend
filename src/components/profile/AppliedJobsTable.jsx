import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
        <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
        <p className="max-w-xs">
          You haven’t applied to any jobs yet. Start exploring opportunities and apply to your favorite jobs!
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {allAppliedJobs.map((appliedJob) => (
          <div
            key={appliedJob._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400 min-w-[100px]">
                {appliedJob?.createdAt?.split("T")[0]}
              </div>
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {appliedJob.job?.title}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-0">
                {appliedJob.job?.company?.name}
              </div>
            </div>
            <div>
              <Badge
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
                  appliedJob.status === "rejected"
                    ? "bg-red-600 text-white"
                    : appliedJob.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {appliedJob.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsTable;
