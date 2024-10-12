import jwt from "jsonwebtoken"
import express from "express"

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access !",
                success: false
            });
        }
        const decode = await jwt.verify(token, process.env.secretKey);
        if(!decode){
            return res.status(401).json({
                message: "Invalid Token !",
                success: false
            });
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export default isAuthenticated;