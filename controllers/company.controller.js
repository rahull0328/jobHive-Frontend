import { Company } from "../models/company.model.js";

//admin created companies
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required !",
                success: false
            });
        }

        // Finding Company
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company Already Exists !",
                success: false
            });
        }

        // Creating Company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company Registered Successfully !",
            company,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

//Getting All Companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const findCompany = await Company.find({ userId });
        if (!findCompany) {
            return res.status(404).json({
                message: "Company Doesn't Exist !",
                success: false
            });
        }
        res.status(201).json({
            findCompany,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

//Getting Company By Id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company Doesn't Exist !",
                success: false
            });
        }
        return res.status(201).json({
            company,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: "Server Error !" + error
        });
    }
}

export const updateCompanyInfo = async (req, res) => {
    try {
        const { name, website, location, description } = req.body;
        const file = req.file;
        const updateData = { name, website, location, description };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company Doesn't Exist !",
                success: false
            });
        }

        res.status(201).json({
            message: "Company Information Updated Successfully !",
            success: true
        })
    } catch (error) {

    }
}