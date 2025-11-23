// src/utils/vnpay_helper.js
import qs from "qs";
import crypto from "crypto";

// Sort object theo key ASCII
export function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const k of keys) {
    sorted[k] = obj[k];
  }
  return sorted;
}

export function buildVnpUrl(rawParams, vnpHashSecret, vnpUrl) {
  let vnpParams = { ...rawParams };

  delete vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHashType;

  Object.keys(vnpParams).forEach((key) => {
    if (vnpParams[key] !== undefined && vnpParams[key] !== null) {
      vnpParams[key] = encodeURIComponent(vnpParams[key]).replace(/%20/g, "+");
    }
  });

  vnpParams = sortObject(vnpParams);
  const signData = qs.stringify(vnpParams, { encode: false });

  const hmac = crypto.createHmac("sha512", vnpHashSecret);
  const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnpParams.vnp_SecureHash = secureHash;
  vnpParams.vnp_SecureHashType = "SHA512";

  const paymentUrl =
    vnpUrl + "?" + qs.stringify(vnpParams, { encode: false });

  return paymentUrl;
}
