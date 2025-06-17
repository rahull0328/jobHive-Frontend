import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyInfo from "./CompanyInfo";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //filtering the data by name of company
  const [input, setInput] = useState("")
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <div className="min-h-screen my-18">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>

        {/* Company Table */}
        <div className="overflow-x-auto">
          <CompanyInfo />
        </div>
      </div>
    </div>
  );
};

export default Companies;
