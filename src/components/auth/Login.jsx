import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  })

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-8 px-2 py-30">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-xl rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Welcome Back 👋</h1>

          <div className="mb-4">
            <Label className="mb-1 block">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="john@gmail.com"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label className="mb-1 block">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="w-full"
            />
          </div>

          <div className="mb-5">
            <Label className="block mb-2">Role</Label>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full bg-gray-500 cursor-not-allowed">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#EF88AD] to-[#FF5C8D] hover:opacity-90 transition"
            >
              Login
            </Button>
          )}

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#EF88AD] hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
