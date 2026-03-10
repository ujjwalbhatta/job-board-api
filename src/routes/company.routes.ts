import { Router } from "express";
import {
  handleCreateCompany,
  handleDeleteCompany,
  handleGetAllCompanies,
  handleGetCompanyById,
  handleUpdateCompany,
} from "../controllers/company.controller";

const router = Router();

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               size:
 *                 type: integer
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Company created
 */
router.post("/", handleCreateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     summary: Update a company
 *     tags: [Companies]
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
 *               industry:
 *                 type: string
 *               size:
 *                 type: integer
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.patch("/:id", handleUpdateCompany);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
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
 *                   industry:
 *                     type: string
 *                   size:
 *                     type: integer
 *                   location:
 *                     type: string
 *                   website:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/", handleGetAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 */
router.get("/:id", handleGetCompanyById);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */
router.delete("/:id", handleDeleteCompany);

export default router;

