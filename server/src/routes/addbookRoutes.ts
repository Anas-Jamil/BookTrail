import { Router } from "express";
import { createBook } from "../controllers/addbookConroller";

const router = Router();

router.post("/", createBook);

export default router;