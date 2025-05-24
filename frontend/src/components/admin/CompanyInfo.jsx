import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanyInfo = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector((store) => store.company);

  //filtering the data by name of the company
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if(!searchCompanyByText) {
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Registered Companies
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="text-gray-700">
              Company Name
            </TableHead>
            <TableHead className="text-gray-700">Registration Date</TableHead>
            <TableHead className="text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Building2 className="w-10 h-10 mb-2" />
                  <p className="text-base">
                    You haven't registered any company yet
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell colSpan={2}>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>
                        {company.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800">
                      {company.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 shadow-md rounded-md">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyInfo;
