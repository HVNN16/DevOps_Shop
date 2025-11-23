// src/routes/payment.js
import express from "express";
import moment from "moment";
import "moment-timezone";
import dotenv from "dotenv";
import { buildVnpUrl, sortObject } from "../utils/vnpay_helper.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import qs from "qs";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

router.post("/create_payment_url", async (req, res) => {
  try {
    const { amount, bankCode, orderDescription, orderId } = req.body;

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection.socket?.remoteAddress ||
      "127.0.0.1";

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURNURL;

    // Thời gian VN
    const createDate = moment().tz("Asia/Ho_Chi_Minh").format("YYYYMMDDHHmmss");

    const orderRef = orderId || moment().format("YYYYMMDDHHmmss");

    const locale = "vn";
    const currCode = "VND";

    let vnpParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderRef,
      vnp_OrderInfo: orderDescription || `Thanh toan don hang ${orderRef}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnpParams["vnp_BankCode"] = bankCode;
    }

    const paymentUrl = buildVnpUrl(vnpParams, secretKey, vnpUrl);

    return res.json({ paymentUrl });
  } catch (error) {
    console.error("Error create_payment_url:", error);
    res
      .status(500)
      .json({ message: "Lỗi tạo URL thanh toán VNPay", error: error.message });
  }
});

router.get("/vnpay_return", async (req, res) => {
  try {
    let vnpParams = req.query;

    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const secretKey = process.env.VNP_HASHSECRET;

    Object.keys(vnpParams).forEach((key) => {
      vnpParams[key] = encodeURIComponent(vnpParams[key]).replace(/%20/g, "+");
    });

    vnpParams = sortObject(vnpParams);

    const signData = qs.stringify(vnpParams, { encode: false });

    const checkHash = crypto
      .createHmac("sha512", secretKey)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    if (secureHash !== checkHash) {
      return res.json({
        code: "97",
        message: "Chữ ký không hợp lệ!",
      });
    }

    const responseCode = vnpParams["vnp_ResponseCode"];
    const orderId = vnpParams["vnp_TxnRef"];

    const order = await Order.findById(orderId);

    if (!order) {
      return res.json({
        code: "01",
        message: "Không tìm thấy đơn hàng",
      });
    }

    if (responseCode === "00") {
      await Order.findByIdAndUpdate(orderId, {
        status: "paid",
        paymentStatus: "success",
      });

      await Cart.deleteOne({ userId: order.userId });
    } 
    else {
      await Order.findByIdAndUpdate(orderId, {
        status: "failed",
        paymentStatus: "failed",
      });
    }

    return res.json({
      code: "00",
      message: "Xác minh hợp lệ",
      orderId,
      responseCode,
    });

  } catch (error) {
    console.error("VNPay Return Error:", error);
    return res.status(500).json({ message: "Lỗi xử lý VNPay Return" });
  }
});


export default router;
