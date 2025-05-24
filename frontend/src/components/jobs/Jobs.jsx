import React from 'react';
import Navbar from '../shared/Navbar';
import FilterCard from './FilterCard';
import JobData from './JobData';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);

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
                    allJobs.map((job) => (
                      <div key={job?._id}>
                        <JobData job={job} />
                      </div>
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
