import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-4xl mx-auto my-20 space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 rounded-full border-2 border-pink-400">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="font-semibold text-2xl text-gray-900 dark:text-gray-100">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-md">
                  {user?.profile?.bio || "No bio provided"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="self-start sm:self-center"
              variant="outline"
              aria-label="Edit Profile"
            >
              <Pen />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <Mail className="text-pink-500" />
              <span>{user?.email || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-pink-500" />
              <span>{user?.phoneNumber || "Not Provided"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge key={idx} className="bg-pink-100 text-pink-700 dark:bg-pink-700 dark:text-pink-100">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400">No skills listed</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8 max-w-sm">
            <Label className="text-md font-bold mb-1 block text-gray-800 dark:text-gray-200">Resume</Label>
            {isResume && user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-pink-600 dark:text-pink-400 hover:underline break-words"
              >
                {user.profile.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">No resume uploaded</span>
            )}
          </div>
        </section>

        {/* Applied Jobs Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            My Job Applications
          </h2>
          <AppliedJobsTable />
        </section>
      </main>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
