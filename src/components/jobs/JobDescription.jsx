import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import Navbar from "../shared/Navbar";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import store from "@/redux/store";
import { ArrowLeft } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <Button
            onClick={() => navigate("/jobs")}
            variant="outline"
            className="mb-4 sm:mb-0 flex items-center gap-2 text-sm font-semibold text-gray-600"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Button>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`transition-colors duration-300 px-6 py-2 rounded-lg text-white text-sm font-semibold shadow-md ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-blue-100 text-blue-800">{singleJob?.position} Positions</Badge>
            <Badge className="bg-red-100 text-red-700">{singleJob?.jobType}</Badge>
            <Badge className="bg-purple-100 text-purple-700">{singleJob?.salary} LPA</Badge>
          </div>

          <hr className="my-4" />

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Role</p>
              <p className="text-gray-700">{singleJob?.title}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-700">{singleJob?.location}</p>
            </div>
            <div>
              <p className="font-semibold">Experience</p>
              <p className="text-gray-700">{singleJob?.experience} Years</p>
            </div>
            <div>
              <p className="font-semibold">Salary</p>
              <p className="text-gray-700">{singleJob?.salary} LPA</p>
            </div>
            <div>
              <p className="font-semibold">Total Applicants</p>
              <p className="text-gray-700">{singleJob?.applications?.length}</p>
            </div>
            <div>
              <p className="font-semibold">Posted On</p>
              <p className="text-gray-700">
                {new Date(singleJob?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-1">Job Description</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {singleJob?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;