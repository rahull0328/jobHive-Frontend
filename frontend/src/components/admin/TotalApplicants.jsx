import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import ApplicantsInfo from "./ApplicantsInfo";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const TotalApplicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials: true})
                if(res.data.success) {
                    
                }
            } catch (error) {
                
            }
        }
    })
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsInfo />
      </div>
    </div>
  );
};

export default TotalApplicants;
