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

module.exports = {
    createCompany
};