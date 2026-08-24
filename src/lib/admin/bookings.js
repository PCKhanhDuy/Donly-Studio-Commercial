import "server-only";

import { ensureSchema, hasDatabase, sql } from "@/lib/admin/db";

/*
  Truy vấn cho hộp thư đặt lịch.

  Mọi hàm đều tự chịu được trường hợp CHƯA CÓ DATABASE: trả về mảng rỗng hoặc false thay
  vì ném lỗi. Nhờ vậy form liên hệ ngoài trang công khai không bao giờ hỏng chỉ vì biến
  môi trường chưa đặt — xem thêm chú thích ở db.js.
*/

export const STATUSES = ["new", "read", "archived"];

export async function saveBooking(data) {
  if (!hasDatabase) return false;
  await ensureSchema();

  await sql`
    INSERT INTO bookings (locale, name, brand, email, phone, service, shoot_date, budget, message)
    VALUES (
      ${data.locale}, ${data.name}, ${data.brand}, ${data.email}, ${data.phone || null},
      ${data.service}, ${data.date || null}, ${data.budget || null}, ${data.message}
    )
  `;
  return true;
}

export async function listBookings(status = "new") {
  if (!hasDatabase) return [];
  await ensureSchema();

  // Postgres không cho tham số hoá tên cột/mệnh đề, nên tách hẳn hai truy vấn
  // thay vì ghép chuỗi — ghép chuỗi ở chỗ này là cửa ngõ của SQL injection.
  const rows =
    status === "all"
      ? await sql`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200`
      : await sql`SELECT * FROM bookings WHERE status = ${status} ORDER BY created_at DESC LIMIT 200`;

  return rows;
}

export async function countByStatus() {
  if (!hasDatabase) return { new: 0, read: 0, archived: 0, all: 0 };
  await ensureSchema();

  const rows = await sql`SELECT status, count(*)::int AS n FROM bookings GROUP BY status`;
  const counts = { new: 0, read: 0, archived: 0, all: 0 };

  for (const row of rows) {
    if (row.status in counts) counts[row.status] = row.n;
    counts.all += row.n;
  }
  return counts;
}

export async function setStatus(id, status) {
  if (!hasDatabase) return false;
  if (!STATUSES.includes(status)) return false;
  await ensureSchema();

  await sql`UPDATE bookings SET status = ${status} WHERE id = ${id}`;
  return true;
}
