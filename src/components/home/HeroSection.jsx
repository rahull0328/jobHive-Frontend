import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-16 sm:py-24 bg-white">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#6A38C2] font-medium text-sm sm:text-base">
          Your #1 Destination for Career Success
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Discover, Apply & <br />
          Build Your <span className="text-[#EF88AD]">Dream Career</span>
        </h1>

        <p className="text-sm sm:text-base max-w-xl mx-auto text-gray-700">
          💼 We connect top talent with leading companies across every industry.
          <br className="hidden sm:block" />
          Let us help you find your next opportunity.
        </p>

        {/* Search Input Row */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto mt-6">
          <div className="flex items-center gap-2 px-3 h-12 sm:h-14 border border-gray-200 rounded-full shadow-md bg-white">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search jobs by title"
              className="flex-grow outline-none border-none bg-transparent text-sm sm:text-base"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-full h-10 sm:h-11 px-3 bg-[#EF88AD]"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
