import { Router } from 'express';
import {
  handleGetAllJobs,
  handleGetJobById,
  handleGetJobsByCompany,
  handleCreateJob,
  handleUpdateJob,
  handleDeleteJob
} from '../controllers/job.controller';

const router = Router();

router.get('/', handleGetAllJobs);
router.get('/:id', handleGetJobById);
router.get('/company/:companyId', handleGetJobsByCompany);
router.post('/', handleCreateJob);
router.patch('/:id', handleUpdateJob);
router.delete('/:id', handleDeleteJob);

export default router;