import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoutes from "./routes/user.route.js"

dotenv.config({})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

//api routes
app.use("/api/user", userRoutes)

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server Connected on ${PORT} !`)
})