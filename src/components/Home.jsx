import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './home/HeroSection'
import CategoryCarousel from './home/CategoryCarousel'
import LatestJobs from './home/LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  
  //routing admin after login
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  },[])

  return (
    <div> 
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home