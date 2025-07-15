import express from "express";
import { getCustomerDue } from "../controllers/dueController.js";

const router = express.Router();
router.get("/:customerName", getCustomerDue);

export default router;


