import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import AdminJobsInfo from './AdminJobsInfo'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-26'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>Post New Job</Button>
        </div>
        <AdminJobsInfo />
      </div>
    </div>
  )
}

export default AdminJobs