import { Router } from "express";
import {
  handleCreateCandidate,
  handleDeleteCandidate,
  handleGetAllCandidate,
  handleGetCandidateById,
  handleUpdateCandidate,
} from "../controllers/candidate.controller";

const router = Router();

router.post("/", handleCreateCandidate);
router.patch("/:id", handleUpdateCandidate);
router.get("/", handleGetAllCandidate);
router.get("/:id", handleGetCandidateById);
router.delete("/:id", handleDeleteCandidate);

export default router;
