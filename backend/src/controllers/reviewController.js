import Review from "../models/review_model.js";
import Product from "../models/Product.js";

// 🔹 Hàm phụ: cập nhật averageRating & reviewCount cho product
const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: stats[0].averageRating,
      reviewCount: stats[0].reviewCount,
    });
  } else {
    // nếu xóa hết review
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      reviewCount: 0,
    });
  }
};

// POST /api/reviews/:productId
// Người dùng tạo hoặc cập nhật review cho 1 sản phẩm
export const createOrUpdateReview = async (req, res) => {
  try {
    console.log("=== 🔥 REVIEW CONTROLLER START ===");

    // Debug 1: token decoded user
    console.log("👉 req.user:", req.user);

    const userId = req.user?.id;
    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Debug 2: check input values
    console.log("👉 Received productId:", productId);
    console.log("👉 rating:", rating);
    console.log("👉 comment:", comment);

    if (!userId) {
      console.log("❌ ERROR: userId is missing!");
      return res.status(400).json({ message: "Thiếu userId từ token!" });
    }

    if (!rating) {
      console.log("❌ ERROR: rating is missing!");
      return res.status(400).json({ message: "Rating is required" });
    }

    console.log("🔍 Tạo hoặc cập nhật review...");

    // Create/update review
    const review = await Review.findOneAndUpdate(
      { user: userId, product: productId },
      { rating, comment, user: userId, product: productId },
      { new: true, upsert: true, runValidators: true }
    );

    console.log("✅ Review saved:", review);

    // Lấy toàn bộ review của sản phẩm
    const reviews = await Review.find({ product: productId });
    console.log("📌 reviews count:", reviews.length);

    // Debug 3: show all ratings
    console.log("⭐ Ratings list:", reviews.map(r => r.rating));

    const reviewCount = reviews.length;
    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount || 0;

    console.log("📌 Calculated averageRating:", avg);
    console.log("📌 Calculated reviewCount:", reviewCount);

    // Update product rating
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { averageRating: avg, reviewCount },
      { new: true }
    );

    console.log("🔄 Product updated rating:", updatedProduct);

    console.log("=== ✅ REVIEW CONTROLLER END ===");

    return res.json({
      success: true,
      message: "Review saved",
      averageRating: avg,
      reviewCount,
    });

  } catch (err) {
    console.error("❌ Create/Update Review Error:", err);
    return res.status(500).json({ message: "Lỗi khi tạo review" });
  }
};

// GET /api/reviews/product/:productId
// Lấy danh sách review của 1 sản phẩm
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name") // lấy tên người dùng
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (err) {
    console.error("Get Product Reviews Error:", err);
    return res.status(500).json({ message: "Lỗi server khi lấy đánh giá" });
  }
};
