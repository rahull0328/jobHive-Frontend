import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './home/HeroSection'
import CategoryCarousel from './home/CategoryCarousel'
import LatestJobs from './home/LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs()
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