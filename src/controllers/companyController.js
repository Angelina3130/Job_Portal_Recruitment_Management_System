const Company = require("../models/Company");

const createCompany = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            });
        }

        const company = await Company.create({
            name,
            description,
            recruiterIds: [req.user.userId]
        });

        res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create company",
            error: error.message
        });
    }
};


const getCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            recruiterIds: req.user.userId
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            data: company
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch company",
            error: error.message
        });
    }
};

const updateCompany = async (req, res) => {
    try {
        const { name, description } = req.body;

        const company = await Company.findOne({
            recruiterIds: req.user.userId
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        if (name) {
            company.name = name;
        }

        if (description !== undefined) {
            company.description = description;
        }

        await company.save();

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update company",
            error: error.message
        });
    }
};
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            recruiterIds: req.user.userId
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        await Company.deleteOne({
            _id: company._id
        });

        res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete company",
            error: error.message
        });
    }
};

module.exports = {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
};