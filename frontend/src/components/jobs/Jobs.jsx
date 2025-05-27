import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import FilterCard from './FilterCard';
import JobData from './JobData';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
const Jobs = () => {

  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs)

  //filtering logic
  useEffect(() => {
    if(searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || 
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

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
            {
              allJobs.length <= 0 ? (
                <div className="text-center text-gray-600 mt-20 text-lg">Jobs Not Found</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{opacity:0, x:100}}
                        animate={{opacity:1, x:0}}
                        exit={{opacity:0, x:-100}}
                        transition={{duration:0.5}}
                        key={job?._id}
                      >
                        <JobData job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
