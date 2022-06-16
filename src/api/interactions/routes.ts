import express from 'express';

import postInteraction from './controllers/postInteraction.controller';

const router = express.Router();

router.post('/', postInteraction);

export default router;
