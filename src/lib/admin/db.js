import "server-only";

import postgres from "postgres";

/*
  Kết nối cơ sở dữ liệu cho khu quản trị.

  VÌ SAO PHẢI CÓ DATABASE: Vercel chạy trên filesystem tạm, ghi file xuống đĩa thì lần
  deploy sau mất sạch. Mọi thứ cần giữ lại — yêu cầu đặt lịch của khách, nội dung bạn sửa
  trong admin — đều phải nằm ở nơi khác. Do đó dùng Postgres bên ngoài (Neon, Supabase,
  Vercel Postgres... đều được, chỉ cần chuỗi kết nối chuẩn `postgresql://`).

  CHƯA CÓ DATABASE_URL THÌ SITE VẪN CHẠY BÌNH THƯỜNG. Mọi hàm dưới đây trả về null hoặc
  mảng rỗng thay vì ném lỗi, và khu admin hiện màn hình hướng dẫn cài đặt. Cách này để
  việc thiếu biến môi trường không bao giờ làm sập trang công khai của khách.

  `prepare: false` là bắt buộc khi đi qua cổng pooled của Neon/Supabase — cổng đó dùng
  chung một kết nối cho nhiều request nên không giữ được prepared statement.
*/

const CONNECTION = process.env.DATABASE_URL ?? "";

export const hasDatabase = Boolean(CONNECTION);

/*
  Giữ một instance duy nhất trên globalThis. Ở chế độ dev, Next nạp lại module mỗi lần
  sửa file; không neo vào globalThis thì mỗi lần sửa lại mở thêm một pool kết nối mới
  cho tới khi database từ chối vì quá số kết nối cho phép.
*/
const globalForDb = globalThis;

export const sql = hasDatabase
  ? (globalForDb.__donlySql ??= postgres(CONNECTION, {
      prepare: false,
      idle_timeout: 20,
      max: 5,
      onnotice: () => {},
    }))
  : null;

/*
  Tạo bảng nếu chưa có. Gọi trước mỗi thao tác đọc/ghi đầu tiên trong một request.
  Dự án chỉ có hai bảng và không có bước migrate riêng, nên cách này đơn giản hơn hẳn
  việc dựng cả một hệ thống migration; Postgres bỏ qua lệnh nếu bảng đã tồn tại.
*/
let ready = null;

export async function ensureSchema() {
  if (!sql) return false;

  ready ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id          bigserial PRIMARY KEY,
        created_at  timestamptz NOT NULL DEFAULT now(),
        locale      text        NOT NULL DEFAULT 'vi',
        name        text        NOT NULL,
        brand       text        NOT NULL,
        email       text        NOT NULL,
        phone       text,
        service     text        NOT NULL,
        shoot_date  text,
        budget      text,
        message     text        NOT NULL,
        status      text        NOT NULL DEFAULT 'new'
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS bookings_status_idx  ON bookings (status)`;
    return true;
  })();

  return ready;
}
