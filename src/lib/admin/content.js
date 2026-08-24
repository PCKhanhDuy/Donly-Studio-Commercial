import "server-only";

import { ensureSchema, hasDatabase, sql } from "@/lib/admin/db";

/*
  Nội dung bạn sửa trong admin, phủ lên nội dung mặc định trong file nguồn.

  KHÔNG BAO GIỜ ĐƯỢC NÉM LỖI. Hàm đọc dưới đây chạy lúc dựng trang: database sập, biến
  môi trường sai, mạng chập chờn — bất cứ cái nào ném lỗi ra ngoài đều làm hỏng cả lần
  build, tức là hỏng toàn bộ trang công khai. Nên mọi lỗi được bắt lại, ghi log, rồi trả
  về rỗng; trang rơi về nội dung gốc trong file và vẫn dựng bình thường.

  Khoá đặt theo dạng:
      client:<slug-khách-hàng>
      collection:<slug-khách-hàng>/<slug-bộ-ảnh>
*/

export const clientKey = (slug) => `client:${slug}`;
export const collectionKey = (clientSlug, slug) => `collection:${clientSlug}/${slug}`;

/* Đọc toàn bộ phần đã sửa về một Map. Một truy vấn cho cả trang, không hỏi lẻ từng mục. */
export async function getOverrides() {
  if (!hasDatabase) return new Map();

  try {
    await ensureSchema();
    const rows = await sql`SELECT key, value FROM content_overrides`;
    return new Map(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    console.error("[DONLY] Không đọc được nội dung đã sửa, dùng bản gốc trong file:", error);
    return new Map();
  }
}

export async function getOverride(key) {
  const all = await getOverrides();
  return all.get(key) ?? null;
}

/*
  Ghi phần đã sửa. Khác với lúc đọc, ở đây lỗi được NÉM RA — người đang bấm nút Lưu cần
  biết là chưa lưu được, không thể im lặng báo thành công rồi mất nội dung họ vừa gõ.
*/
export async function saveOverride(key, value) {
  if (!hasDatabase) throw new Error("Chưa nối database.");
  await ensureSchema();

  await sql`
    INSERT INTO content_overrides (key, value, updated_at)
    VALUES (${key}, ${sql.json(value)}, now())
    ON CONFLICT (key) DO UPDATE SET value = ${sql.json(value)}, updated_at = now()
  `;
}

/* Xoá phần đã sửa để nội dung quay lại đúng bản gốc trong file nguồn */
export async function clearOverride(key) {
  if (!hasDatabase) throw new Error("Chưa nối database.");
  await ensureSchema();
  await sql`DELETE FROM content_overrides WHERE key = ${key}`;
}
