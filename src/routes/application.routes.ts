import { Router } from "express";
import {
  handleGetAllApplication,
  handleCreateApplication,
  handleDeleteApplication,
  handleGetApplicationById,
  handleUpdateApplication,
} from "../controllers/application.controller";

const router = Router();

router.post("/", handleCreateApplication);
router.patch("/:id", handleUpdateApplication);
router.get("/", handleGetAllApplication);
router.get("/:id", handleGetApplicationById);
router.delete("/:id", handleDeleteApplication);

export default router;
