const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        skills: {
            type: [String],
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        experienceLevel: {
            type: String,
            required: true,
            enum: ["fresher", "junior", "mid", "senior"]
        },

        salaryRange: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            }
        },

        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);