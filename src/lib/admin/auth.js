import "server-only";

import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/*
  Đăng nhập khu quản trị — một mật khẩu duy nhất, đặt ở biến môi trường ADMIN_PASSWORD.

  Chỉ có một người dùng (chính bạn) nên không dựng bảng tài khoản làm gì. Nhưng phiên
  đăng nhập vẫn phải KÝ, không được lưu kiểu "đã đăng nhập = true" vào cookie: cookie do
  trình duyệt giữ, ai cũng sửa được, ghi phẳng như vậy thì gõ tay một dòng là vào thẳng.

  Cookie ở đây có dạng  <hạn dùng>.<chữ ký>  với chữ ký là HMAC-SHA256 của hạn dùng, khoá
  ký lấy từ chính ADMIN_PASSWORD. Không thêm biến môi trường thứ hai, và đổi mật khẩu là
  mọi phiên cũ mất hiệu lực ngay — đúng thứ người ta mong đợi khi đổi mật khẩu.

  So sánh bằng timingSafeEqual chứ không dùng `===`. So sánh chuỗi thường thoát ra ngay
  tại ký tự đầu khác nhau, thời gian trả lời rò rỉ thông tin về chữ ký đúng.
*/

const COOKIE = "donly_admin";
const MAX_AGE = 60 * 60 * 12; // 12 giờ

export const adminPassword = process.env.ADMIN_PASSWORD ?? "";
export const hasPassword = adminPassword.length > 0;

function sign(value) {
  return createHmac("sha256", adminPassword).update(String(value)).digest("hex");
}

/* So sánh chống rò rỉ thời gian; độ dài lệch nhau thì timingSafeEqual ném lỗi nên chặn trước */
function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkPassword(input) {
  if (!hasPassword) return false;

  /*
    So sánh với một chuỗi ngẫu nhiên cùng độ dài khi input sai độ dài, để thời gian trả
    lời không phụ thuộc vào việc người ta đoán đúng độ dài mật khẩu hay chưa.
  */
  const candidate = typeof input === "string" ? input : "";
  if (candidate.length !== adminPassword.length) {
    safeEqual(randomBytes(32).toString("hex"), randomBytes(32).toString("hex"));
    return false;
  }
  return safeEqual(candidate, adminPassword);
}

export async function createSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const store = await cookies();

  store.set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isSignedIn() {
  if (!hasPassword) return false;

  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;

  const [expires, signature] = raw.split(".");
  if (!expires || !signature) return false;

  // Kiểm hạn dùng trước, chữ ký sau — hết hạn thì không cần tính HMAC làm gì
  if (!Number.isFinite(Number(expires)) || Number(expires) < Date.now()) return false;

  return safeEqual(signature, sign(expires));
}
