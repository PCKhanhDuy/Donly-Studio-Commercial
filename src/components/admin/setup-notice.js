/*
  Màn hình hướng dẫn khi chưa nối database. Hiện ngay trong admin thay vì để trang trống
  không rõ vì sao — người vận hành cần biết đang thiếu gì và đặt ở đâu.
*/
export default function SetupNotice({ className = "" }) {
  return (
    <div className={`border border-rule bg-panel p-6 ${className}`}>
      <p className="font-ui text-sm font-semibold text-fg">Chưa nối database</p>

      <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-fg/60">
        Yêu cầu đặt lịch của khách hiện chưa được lưu lại. Trang liên hệ vẫn hoạt động
        bình thường, nhưng nội dung khách gửi chỉ nằm trong log máy chủ rồi mất.
      </p>

      <ol className="mt-5 space-y-2 font-body text-sm text-fg/70">
        <li>1. Tạo một Postgres miễn phí ở neon.com rồi copy chuỗi kết nối.</li>
        <li>
          2. Đặt biến <code className="text-fg">DATABASE_URL</code> — trên Vercel vào
          Settings → Environment Variables, ở máy thì ghi vào file{" "}
          <code className="text-fg">.env.local</code>.
        </li>
        <li>3. Deploy lại (hoặc khởi động lại máy chủ dev). Bảng sẽ tự được tạo.</li>
      </ol>
    </div>
  );
}
