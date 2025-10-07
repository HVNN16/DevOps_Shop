import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints (stub)
 */

router.post('/login', (req, res) => res.json({ token: 'dummy', note: 'stub' }));
export default router;
