import { Router } from "express";
import { handleCreateCompany } from "../controllers/company.controller";

const router = Router()

router.post('/', handleCreateCompany)

export default router