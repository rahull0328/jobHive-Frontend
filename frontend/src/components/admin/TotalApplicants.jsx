import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import ApplicantsInfo from "./ApplicantsInfo";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const TotalApplicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <Navbar />
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <h1 className="font-bold text-2xl mb-6">
            Applicants ({applicants?.applications?.length || 0})
          </h1>
          <ApplicantsInfo />
        </div>
      </div>
    </div>
  );
};

export default TotalApplicants;
