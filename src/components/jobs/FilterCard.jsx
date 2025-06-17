import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Remote"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42K-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Industry: "",
    Salary: "",
  });

  const dispatch = useDispatch();

  const handleFilterChange = (type, value) => {
    const updated = { ...selectedFilters, [type]: value };
    setSelectedFilters(updated);
    dispatch(setSearchedQuery(updated));
  };

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-md mt-4">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id-${index}-${idx}`;
            return (
              <div className="flex items-center space-x-2 my-2" key={itemId}>
                <RadioGroup>

                <RadioGroupItem
                  id={itemId}
                  value={item}
                  checked={selectedFilters[data.filterType] === item}
                  onClick={() => handleFilterChange(data.filterType, item)}
                />
                </RadioGroup>
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
