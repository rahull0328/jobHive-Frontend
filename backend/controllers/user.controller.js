import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    //getting data from the user
    const { fullname, email, phoneNumber, password, role } = req.body;

    //checking if any field is missing
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields !",
        success: false,
      });
    }

    //checking if the email exists beforehand or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with particular Email Already Exists",
        success: false,
      });
    }

    //user creation process
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //checking if any field is missing
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields !",
        success: false,
      });
    }

    //checking if the email for the user exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User with particular email doesn't exist",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //checking the role of the user
    if (role != user.role) {
      return res.status(400).json({
        message: "User doesn't match with the particular role",
        success: false,
      });
    }

    //token generation
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    //cloudinary setup
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto", // allows PDF, images, etc.
      type: "upload", // ensures it's a public upload
      folder: "resumes", // optional: organize in a folder
      use_filename: true, // keeps the original filename
      unique_filename: false, // optional: keeps original name if needed
    });

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //updating the user data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    //resume
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //saving the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //saving the original file name
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
