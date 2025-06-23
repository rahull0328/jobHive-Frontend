import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 my-16 sm:my-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        <span className="text-[#EF88AD]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
