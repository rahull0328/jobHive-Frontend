import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#EF88AD]">Hive</span>
          </h1>
        </Link>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            {user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#EF88AD] hover:bg-[#A53860] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow">
          <ul className="flex flex-col font-medium gap-4">
            {user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={toggleMenu}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></li>
                <li><Link to="/browse" onClick={toggleMenu}>Browse</Link></li>
              </>
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="bg-[#EF88AD] hover:bg-[#A53860] w-full text-white">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <Link to="/profile" onClick={toggleMenu}>
                    <Button variant="ghost" className="w-full flex justify-start">
                      <User2 className="mr-2" /> View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    logoutHandler();
                    toggleMenu();
                  }}
                  className="w-full flex justify-start"
                >
                  <LogOut className="mr-2" /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
  