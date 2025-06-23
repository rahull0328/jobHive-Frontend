import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobsCards = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/description/${job._id}`)}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto ms-2 p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-gray-800">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.company?.location}</p>
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-900">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <Badge className="text-blue-700 font-medium bg-blue-100" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 font-medium bg-red-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-medium bg-purple-100" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
