const Job = require("../models/Job");
const Company = require("../models/Company");

// Create a job
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            skills,
            location,
            experienceLevel,
            salaryRange
        } = req.body;

        if (
            !title ||
            !description ||
            !skills ||
            !location ||
            !experienceLevel ||
            !salaryRange
        ) {
            return res.status(400).json({
                success: false,
                message: "All job fields are required"
            });
        }

        const company = await Company.findOne({
            recruiterIds: req.user.userId
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found. Create a company profile first."
            });
        }

        if (
            salaryRange.min === undefined ||
            salaryRange.max === undefined ||
            salaryRange.min < 0 ||
            salaryRange.max < salaryRange.min
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid salary range"
            });
        }

        const job = await Job.create({
            companyId: company._id,
            recruiterId: req.user.userId,
            title,
            description,
            skills,
            location,
            experienceLevel,
            salaryRange
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create job",
            error: error.message
        });
    }
};

// Get all jobs created by logged-in recruiter
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            recruiterId: req.user.userId
        }).populate("companyId", "name");

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
};

// Update a job
const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            recruiterId: req.user.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const {
            title,
            description,
            skills,
            location,
            experienceLevel,
            salaryRange,
            status
        } = req.body;

        if (title !== undefined) job.title = title;
        if (description !== undefined) job.description = description;
        if (skills !== undefined) job.skills = skills;
        if (location !== undefined) job.location = location;
        if (experienceLevel !== undefined) {
            job.experienceLevel = experienceLevel;
        }
        if (salaryRange !== undefined) {
            if (
                salaryRange.min === undefined ||
                salaryRange.max === undefined ||
                salaryRange.min < 0 ||
                salaryRange.max < salaryRange.min
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid salary range"
                });
            }

            job.salaryRange = salaryRange;
        }

        if (status !== undefined) job.status = status;

        await job.save();

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update job",
            error: error.message
        });
    }
};

// Delete a job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            recruiterId: req.user.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        await Job.deleteOne({ _id: job._id });

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete job",
            error: error.message
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};