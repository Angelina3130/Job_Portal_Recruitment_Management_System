const express = require("express");

const {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
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
router.get(
    "/",
    protect,
    authorize("recruiter"),
    getCompany
);
router.put(
    "/",
    protect,
    authorize("recruiter"),
    updateCompany
);
router.delete(
    "/",
    protect,
    authorize("recruiter"),
    deleteCompany
);

module.exports = router; 