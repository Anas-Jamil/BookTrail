import { Router } from "express";
import { updateBook, createBook, deleteBook, getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();

router.get("/", getDashboardMetrics);
router.post("/", createBook);

// Update route should include the ID in the URL
router.put("/:id", updateBook);

router.delete("/:id", deleteBook)
export default router;
