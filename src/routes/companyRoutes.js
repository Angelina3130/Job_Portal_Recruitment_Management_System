const express = require("express");

const {
    createCompany
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("recruiter"),
    createCompany
);

module.exports = router; 