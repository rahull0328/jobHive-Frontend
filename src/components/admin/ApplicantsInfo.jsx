import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Users } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

// Sample status array
const shortlistingStatus = ["Accepted", "Pending", "Rejected"];

const ApplicantsInfo = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const hasApplicants = applicants?.applications?.length > 0;

  return (
    <div className="w-full min-h-[60vh] flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-6xl overflow-x-auto rounded-lg shadow-md bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasApplicants ? (
              applicants.applications.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-[#EF88AD] underline"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-400">NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt?.split("T")[0] || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="p-1 rounded hover:bg-gray-200">
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 bg-white shadow-lg rounded-md border">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer rounded"
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Users className="w-10 h-10 mb-2" />
                    <p className="text-base font-medium">
                      No applicants have applied for this job yet.
                    </p>
                    <p className="text-sm text-gray-400">
                      Once users apply, their info will show up here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsInfo;
