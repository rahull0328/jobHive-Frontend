import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Button } from '../ui/button';
import { Monitor, Server, Code2, BarChart, Settings2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  { label: "Frontend Developer", icon: <Monitor className="w-5 h-5 mr-2" /> },
  { label: "Backend Developer", icon: <Server className="w-5 h-5 mr-2" /> },
  { label: "Full Stack Developer", icon: <Code2 className="w-5 h-5 mr-2" /> },
  { label: "Data Scientist", icon: <BarChart className="w-5 h-5 mr-2" /> },
  { label: "DevOps Engineer", icon: <Settings2 className="w-5 h-5 mr-2" /> },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h4 className="text-2xl sm:text-3xl font-bold text-center mt-10">Explore Categories</h4>

      <div className="relative max-w-4xl mx-auto my-10">
        <Carousel className="overflow-visible">
          <CarouselContent className="flex gap-4 sm:gap-6 px-1">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="
                  md:basis-1/2
                  flex-none 
                  w-[85%] 
                  sm:w-[45%] 
                  md:w-[10%] 
                  lg:w-[22%] 
                  transition-all
                "
              >
                <Button
                  onClick={() => searchJobHandler(cat.label)}
                  variant="outline"
                  className="w-full h-14 rounded-xl font-medium flex items-center justify-center text-sm sm:text-base transition-transform hover:scale-105 hover:bg-primary hover:text-white"
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows for navigation */}
          <CarouselPrevious className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
