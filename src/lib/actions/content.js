"use server";

import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/admin/auth";
import { clearOverride, saveOverride } from "@/lib/admin/content";

/*
  Lưu và khôi phục nội dung.

  Server action là điểm vào công khai nên tự kiểm tra phiên đăng nhập ở đầu hàm, không
  dựa vào việc trang cha đã chặn.

  Sau khi lưu phải dựng lại trang công khai, nếu không thì sửa xong người xem vẫn thấy
  bản cũ được dựng sẵn từ lúc build. Dùng revalidatePath("/", "layout") — quét cả site —
  vì một cái tên khách hàng xuất hiện ở trang chủ, trang /works, trang khách và cả khối
  "dự án tiếp theo" của bộ ảnh khác. Site chỉ hơn bốn chục trang nên quét hết vẫn nhanh,
  mà không phải nhớ liệt kê đủ từng đường dẫn — thiếu một chỗ là sinh ra bản lệch nhau.
*/

function readPair(formData, field) {
  return {
    vi: String(formData.get(`${field}_vi`) ?? ""),
    en: String(formData.get(`${field}_en`) ?? ""),
  };
}

function readText(formData, field) {
  return String(formData.get(field) ?? "");
}

export async function saveContent(previousState, formData) {
  if (!(await isSignedIn())) return { status: "error", message: "Phiên đăng nhập đã hết." };

  const key = String(formData.get("key") ?? "");
  const pairFields = String(formData.get("pairFields") ?? "").split(",").filter(Boolean);
  const textFields = String(formData.get("textFields") ?? "").split(",").filter(Boolean);

  if (!key) return { status: "error", message: "Thiếu khoá nội dung." };

  const value = {};
  for (const field of pairFields) value[field] = readPair(formData, field);
  for (const field of textFields) value[field] = readText(formData, field);

  try {
    await saveOverride(key, value);
    revalidatePath("/", "layout");
    return { status: "success", message: "Đã lưu và cập nhật lên site." };
  } catch (error) {
    console.error("[DONLY] Lỗi khi lưu nội dung:", error);
    return {
      status: "error",
      message: "Chưa lưu được. Kiểm tra lại kết nối database rồi thử lại.",
    };
  }
}

export async function resetContent(previousState, formData) {
  if (!(await isSignedIn())) return { status: "error", message: "Phiên đăng nhập đã hết." };

  const key = String(formData.get("key") ?? "");
  if (!key) return { status: "error", message: "Thiếu khoá nội dung." };

  try {
    await clearOverride(key);
    revalidatePath("/", "layout");
    return { status: "success", message: "Đã khôi phục nội dung gốc." };
  } catch (error) {
    console.error("[DONLY] Lỗi khi khôi phục nội dung:", error);
    return { status: "error", message: "Chưa khôi phục được. Thử lại sau." };
  }
}
