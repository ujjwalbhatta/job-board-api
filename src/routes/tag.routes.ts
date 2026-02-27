import { Router } from 'express';
import { handleGetAllTags, handleCreateTag } from '../controllers/tag.controller';

const router = Router();

router.get('/',  handleGetAllTags);
router.post('/', handleCreateTag);

export default router;