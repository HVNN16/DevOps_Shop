/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy danh sách sản phẩm (tìm kiếm, lọc, phân trang)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang muốn xem
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Số sản phẩm mỗi trang
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Lọc theo thương hiệu
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm sản phẩm theo tên (text index)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Trường để sắp xếp
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Thứ tự sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm trả về thành công
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm theo ID hoặc slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID hoặc slug sản phẩm
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Thêm mới sản phẩm (chỉ admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro Max"
 *               price:
 *                 type: number
 *                 example: 35000000
 *               brand:
 *                 type: string
 *                 example: "Apple"
 *               description:
 *                 type: string
 *                 example: "Điện thoại cao cấp"
 *               image:
 *                 type: string
 *                 example: "https://example.com/iphone15.jpg"
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm (chỉ admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               brand:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       400:
 *         description: Dữ liệu cập nhật không hợp lệ
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm (chỉ admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi server
 */
