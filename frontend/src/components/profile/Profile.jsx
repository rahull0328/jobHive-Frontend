import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfile from "./UpdateProfile";

const skills = ["HTML", "CSS", "JS", "React", "Node", "Express"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Fullname</h1>
              <p>Bio</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>Email</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>Phone Number</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {
              skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : (<span>NA</span>)
            }
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href='http://www.github.com/rahull0328'
              className="text-[#EF88AD] w-full hover:underline cursor-pointer"
            >
              resume original name
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Job Table   */}
        <AppliedJobsTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
