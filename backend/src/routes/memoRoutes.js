import express from "express";
import { getAllMemos } from "../controllers/memosController.js";
import { createMemo } from "../controllers/memosController.js";
import { editMemo } from "../controllers/memosController.js";
import { deleteMemo } from "../controllers/memosController.js";
import { getMemoById } from "../controllers/memosController.js";

const router = express.Router();

router.get("/", getAllMemos);
router.get("/:id", getMemoById);
router.post("/", createMemo);
router.put("/:id", editMemo);
router.delete("/:id", deleteMemo);

export default router;
