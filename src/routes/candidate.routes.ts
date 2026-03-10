import { Router } from "express";
import {
  handleCreateCandidate,
  handleDeleteCandidate,
  handleGetAllCandidate,
  handleGetCandidateById,
  handleUpdateCandidate,
} from "../controllers/candidate.controller";

const router = Router();

/**
 * @swagger
 * /candidates:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               skills:
 *                 type: string
 *                 description: Comma-separated list of skills
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Candidate created
 */
router.post("/", handleCreateCandidate);

/**
 * @swagger
 * /candidates/{id}:
 *   patch:
 *     summary: Update a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               skills:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Candidate updated
 *       404:
 *         description: Candidate not found
 */
router.patch("/:id", handleUpdateCandidate);

/**
 * @swagger
 * /candidates:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   skills:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/", handleGetAllCandidate);

/**
 * @swagger
 * /candidates/{id}:
 *   get:
 *     summary: Get candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidate found
 *       404:
 *         description: Candidate not found
 */
router.get("/:id", handleGetCandidateById);

/**
 * @swagger
 * /candidates/{id}:
 *   delete:
 *     summary: Delete a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidate deleted
 *       404:
 *         description: Candidate not found
 */
router.delete("/:id", handleDeleteCandidate);

export default router;

