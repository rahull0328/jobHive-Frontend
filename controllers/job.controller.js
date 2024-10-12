import { Job } from "../models/job.model.js";

//admin posts jobs
export const createJob = async (req, res) => {
    try {
        //validation
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Please Fill Out All The Fields !",
                success: false
            });
        }

        //creating job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experience: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New Job Cretaed !",
            job,
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        //search filter
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const allJobs = await Job.find(query).populate({path: "company"}).sort({createdAt: -1});
        if (!allJobs) {
            return res.status(400).json({
                message: "No Match Found For Such Jobs !",
                success: false
            });
        }

        return res.status(201).json({
            allJobs,
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const getJob = await Job.findById(jobId);
        if (!getJob) {
            return res.status(404).json({
                message: "No Particular Jobs Found !",
                success: false
            });
        }
        return res.status(201).json({
            getJob,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

//admin creates jobs
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "No Jobs Found !",
                success: false
            });
        }
        return res.status(201).json({
            jobs,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}