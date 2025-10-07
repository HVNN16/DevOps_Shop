import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart endpoints (stub)
 */

router.get('/', (req, res) => res.json({ items: [] }));
export default router;
