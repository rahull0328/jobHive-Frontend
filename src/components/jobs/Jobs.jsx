import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import JobData from "./JobData";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  const getSalaryRange = (label) => {
    switch (label) {
      case "0-40K":
        return [0, 40000];
      case "42K-1lakh":
        return [42000, 100000];
      case "1lakh to 5lakh":
        return [100000, 500000];
      default:
        return [0, Infinity];
    }
  };

  useEffect(() => {
    const { Location, Industry, Salary } = searchedQuery || {};

    const filtered = allJobs.filter((job) => {
      const matchesLocation =
        !Location || job.location?.toLowerCase() === Location.toLowerCase();
      const matchesIndustry =
        !Industry || job.title?.toLowerCase() === Industry.toLowerCase();

      let matchesSalary = true;
      if (Salary) {
        const [min, max] = getSalaryRange(Salary);
        matchesSalary = job.salary >= min && job.salary <= max;
      }

      return matchesLocation && matchesIndustry && matchesSalary;
    });

    setFilteredJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="w-full md:w-3/4 h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredJobs.length === 0 ? (
              <div className="text-center text-gray-600 mt-20 text-lg">
                Jobs Not Found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <JobData job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
