import { Router } from "express";
import {
  handleGetAllJobs,
  handleGetJobById,
  handleGetJobsByCompany,
  handleCreateJob,
  handleUpdateJob,
  handleDeleteJob,
  handleRemoveTagFromJob,
  handleAddTagToJob,
} from "../controllers/job.controller";

const router = Router();

router.get("/", handleGetAllJobs);
router.get("/:id", handleGetJobById);
router.get("/company/:companyId", handleGetJobsByCompany);
router.post("/", handleCreateJob);
router.patch("/:id", handleUpdateJob);
router.delete("/:id", handleDeleteJob);

router.post("/:id/tags/:tagId", handleAddTagToJob);
router.delete("/:id/tags/:tagId", handleRemoveTagFromJob);

export default router;
