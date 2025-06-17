import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobData from '../jobs/JobData'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {

    //hook call for loading all the jobs
    // useGetAllJobs()

    const {allJobs} = useSelector(store=>store.job)
    const dispatch = useDispatch()

    //this is used to clean the buffer memory where user gets new result everytime he visits
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])

  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto my-18'>
            <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    allJobs.map((job) => {
                        return (
                            <JobData key={job._id} job={job} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Browse