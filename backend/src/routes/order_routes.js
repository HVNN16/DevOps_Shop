import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order endpoints (stub)
 */

router.get('/', (req, res) => res.json([]));
export default router;
