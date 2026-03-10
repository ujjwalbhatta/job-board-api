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

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search jobs by title
 *
 *       - in: query
 *         name: remote
 *         schema:
 *           type: boolean
 *         description: Filter remote jobs
 *
 *       - in: query
 *         name: job_type
 *         schema:
 *           type: string
 *           enum: [full-time, part-time, contract, internship]
 *         description: Job type filter
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, closed, draft]
 *         description: Job status filter
 *
 *       - in: query
 *         name: salary_min
 *         schema:
 *           type: integer
 *         description: Minimum salary filter
 *
 *       - in: query
 *         name: salary_max
 *         schema:
 *           type: integer
 *         description: Maximum salary filter
 *
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filter by tags (multiple allowed)
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for offset pagination
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: Cursor for cursor-based pagination
 *
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/", handleGetAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 */
router.get("/:id", handleGetJobById);

/**
 * @swagger
 * /jobs/company/{companyId}:
 *   get:
 *     summary: Get jobs by company
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of jobs for the company
 *       404:
 *         description: Company not found
 */
router.get("/company/:companyId", handleGetJobsByCompany);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [company_id, title]
 *             properties:
 *               company_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salary_min:
 *                 type: integer
 *               salary_max:
 *                 type: integer
 *               job_type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, internship]
 *               remote:
 *                 type: boolean
 *               status:
 *                 type: string
 *                 enum: [open, closed, draft]
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *               seats:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Job created
 *       404:
 *         description: Company not found
 */
router.post("/", handleCreateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salary_min:
 *                 type: integer
 *               salary_max:
 *                 type: integer
 *               job_type:
 *                 type: string
 *               remote:
 *                 type: boolean
 *               status:
 *                 type: string
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *               seats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Job updated
 *       404:
 *         description: Job not found
 */
router.patch("/:id", handleUpdateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted
 *       404:
 *         description: Job not found
 */
router.delete("/:id", handleDeleteJob);

/**
 * @swagger
 * /jobs/{id}/tags/{tagId}:
 *   post:
 *     summary: Add a tag to a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tag added to job
 */
router.post("/:id/tags/:tagId", handleAddTagToJob);

/**
 * @swagger
 * /jobs/{id}/tags/{tagId}:
 *   delete:
 *     summary: Remove a tag from a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tag removed from job
 */
router.delete("/:id/tags/:tagId", handleRemoveTagFromJob);

export default router;

