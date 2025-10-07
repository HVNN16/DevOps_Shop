/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API quản lý giỏ hàng của người dùng
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng hiện tại
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm trong giỏ hàng
 *       401:
 *         description: Token không hợp lệ hoặc chưa đăng nhập
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - variant
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "66e5058ff215b46372950e8c"
 *               variant:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     example: "Black"
 *                   storage:
 *                     type: string
 *                     example: "128GB"
 *                   ram:
 *                     type: string
 *                     example: "8GB"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Thêm sản phẩm vào giỏ hàng thành công
 *       400:
 *         description: Biến thể không tồn tại hoặc không đủ tồn kho
 *       401:
 *         description: Token không hợp lệ
 */

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - variant
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "66e5058ff215b46372950e8c"
 *               variant:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     example: "Black"
 *                   storage:
 *                     type: string
 *                     example: "128GB"
 *                   ram:
 *                     type: string
 *                     example: "8GB"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm trong giỏ
 *       401:
 *         description: Chưa đăng nhập hoặc token sai
 */

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - variant
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "66e5058ff215b46372950e8c"
 *               variant:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     example: "Black"
 *                   storage:
 *                     type: string
 *                     example: "128GB"
 *                   ram:
 *                     type: string
 *                     example: "8GB"
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm trong giỏ
 *       401:
 *         description: Token không hợp lệ
 */
