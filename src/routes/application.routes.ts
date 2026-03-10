import { Router } from "express";
import {
  handleGetAllApplication,
  handleDeleteApplication,
  handleGetApplicationById,
  handleUpdateApplication,
} from "../controllers/application.controller";

const router = Router();

/**
 * @swagger
 * /applications/{id}:
 *   patch:
 *     summary: Update an application
 *     tags: [Applications]
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
 *               job_id:
 *                 type: integer
 *               candidate_id:
 *                 type: integer
 *               status:
 *                 type: string
 *               cover_letter:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated
 *       404:
 *         description: Application not found
 */
router.patch("/:id", handleUpdateApplication);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   job_id:
 *                     type: integer
 *                   candidate_id:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   cover_letter:
 *                     type: string
 *                   applied_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/", handleGetAllApplication);

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application found
 *       404:
 *         description: Application not found
 */
router.get("/:id", handleGetApplicationById);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application deleted
 *       404:
 *         description: Application not found
 */
router.delete("/:id", handleDeleteApplication);

export default router;

