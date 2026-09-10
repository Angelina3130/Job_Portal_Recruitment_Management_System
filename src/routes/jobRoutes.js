const express = require("express");

const {
    createJob,
    getJobs,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorize("recruiter"), createJob);

router.get("/", protect, authorize("recruiter"), getJobs);

router.put("/:id", protect, authorize("recruiter"), updateJob);

router.delete("/:id", protect, authorize("recruiter"), deleteJob);

module.exports = router;