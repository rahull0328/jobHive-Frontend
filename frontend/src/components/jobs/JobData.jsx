import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobData = () => {
  const navigate = useNavigate()
  const jobId = "asdarfassfafa"
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 Days Ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://tse3.mm.bing.net/th?id=OIP.0jl9haemnq0P4eYzzrfNOgHaGw&pid=Api&P=0&h=180" />
          </Avatar>
        </Button>
        <div>
          <h1>Company Name</h1>
          <p>India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">Job Description</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          jobType
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          Salary LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#EF88AD] hover:bg-[#A53860]">Save For Later</Button>
      </div>
    </div>
  );
};

export default JobData;
