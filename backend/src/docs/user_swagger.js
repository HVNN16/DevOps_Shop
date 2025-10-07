/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý tài khoản người dùng
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách người dùng (chỉ admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng trả về thành công
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Lấy thông tin tài khoản của người dùng hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin user hiện tại
 *       401:
 *         description: Token không hợp lệ hoặc đã hết hạn
 */

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Cập nhật thông tin cá nhân
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Thị Minh Nguyệt
 *               email:
 *                 type: string
 *                 example: nguyet@example.com
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Xóa tài khoản của chính mình
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa tài khoản thành công
 *       401:
 *         description: Không có quyền
 */
