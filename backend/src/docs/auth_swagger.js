/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyen Thi Minh Nguyet
 *               email:
 *                 type: string
 *                 example: nguyet@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: nguyet@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token JWT
 *       400:
 *         description: Email hoặc mật khẩu sai
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       401:
 *         description: Token không hợp lệ hoặc không có quyền
 */
