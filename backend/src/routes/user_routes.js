import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User endpoints (stub)
 */

router.get('/me', (req, res) => res.json({ me: null, note: 'stub' }));
export default router;
