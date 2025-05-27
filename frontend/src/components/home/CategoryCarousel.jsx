import React, { useState } from 'react'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '../ui/carousel'
import { Button } from '../ui/button'
import { Monitor, Server, Code2, BarChart, Settings2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  { label: "Frontend Developer", icon: <Monitor className="w-4 h-4 mr-2" /> },
  { label: "Backend Developer", icon: <Server className="w-4 h-4 mr-2" /> },
  { label: "Fullstack Developer", icon: <Code2 className="w-4 h-4 mr-2" /> },
  { label: "Data Scientist", icon: <BarChart className="w-4 h-4 mr-2" /> },
  { label: "DevOps Engineer", icon: <Settings2 className="w-4 h-4 mr-2" /> },
]

const CategoryCarousel = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))   
    navigate("/browse")
  }

  return (
    <div className="">
      <h4 className="text-2xl font-bold text-center">Explore Categories</h4>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem 
                key={index} 
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline" 
                  className="rounded-full w-full py-4 text-sm font-medium transition-all hover:bg-primary hover:text-white"
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
