import express from 'express';

import interactions from './interactions/routes';

const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/interactions', interactions);

export default router;
