import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv"

export const register = async (req, res) => {
    try {
        const { name, email, contactNumber, password, role } = req.body;
        if (!name || !email || !contactNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the fields !",
                success: false
            });
        };

        //profile photo upload
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists !",
                success: false,
            })
        }

        const hasedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name,
            email,
            contactNumber,
            password: hasedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "Successfully Registered !",
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields !",
                success: false
            });
        }

        //finding user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "user Doesn't Exist !",
                success: false
            });
        }

        //password matching
        const passwordMatching = await bcryptjs.compare(password, user.password);
        if (!passwordMatching) {
            return res.status(400).json({
                message: "Password Doesn't Match !",
                success: false
            });
        }

        //check for role
        if (role != user.role) {
            return res.status(400).json({
                message: "Role Doesn't Match Accout !",
                success: false
            });
        }

        //token generation
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.secretKey, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Hello ${user.name} !`,
            user,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Successfully Logged Out"
        });
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email, contactNumber, bio, skills } = req.body;
        const file = req.file;
        //opening resume on cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        //converting skills string into array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.json(400).json({
                message: "User not found !",
                success: false
            })
        }

        //updating data
        if (name) user.name = name
        if (email) user.email = email
        if (contactNumber) user.contactNumber = contactNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray
        
        //resume
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // saving the cloudinary url
            user.profile.resumeOriginalName = file.originalname // displaying the original name of resume on profile page
        }
        await user.save();

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully !",
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}