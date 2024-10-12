import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const registerApplication = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "No Jobs Found !",
                success: false
            });
        }

        //check if user has applied before or not 
        const existingApplicant = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplicant) {
            return res.status(400).json({
                message: "Already Applied For the Job !",
                success: false
            });
        }

        //check if the job exists or not 
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "No Particular Job Exists !",
                success: false
            });
        }

        //creating new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Applied Successfully !",
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}
//finding all the people who have applied for this job 
export const getAppliedApplication = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!applications) {
            return res.status(404).json({
                message: "No Application Found !",
                success: false
            });
        }

        return res.status(201).json({
            applications,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

//for admin to view that how many users have applied for this job
export const getApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobs = await Job.findById(jobId).populate({
            path: 'application',//job model 
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'//application model
            }
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Job Not Found !",
                success: false
            });
        }

        return res.status(201).json({
            jobs,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const applicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Please Change the Status of Application !",
                success: false
            });
        }

        //finding applicant by Application ID
        const application = await Application.findOne({_id: applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application Not Found !",
                success: false
            });
        }

        //updating the status of application 
        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json({
            message: "Application Status Updated !",
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}