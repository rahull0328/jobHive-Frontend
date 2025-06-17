import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))   
    navigate("/browse")
  }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-26">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#6A38C2] font-medium">
          Your #1 Destination for Career Success
        </span>
        <h1 className="text-5xl font-bold">
          Discover, Apply & <br /> Build Your{" "}
          <span className="text-[#EF88AD]">Dream Career</span>
        </h1>
        <p>
          💼 We connect top talent with leading companies across every industry.{" "}
          <br /> Let us help you find your next opportunity.
        </p>
        <div className="flex w-[40%] shadow-lg border mt-6 border-gray-200 pl-3 h-11 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search jobs by title"
            className="outline-none border-none w-full"
          />
          <Button 
            onClick={searchJobHandler}
            className="rounded-r-full h-11 bg-[#EF88AD]"
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
