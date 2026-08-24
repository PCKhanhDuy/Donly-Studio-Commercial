import { updateBookingStatus } from "@/lib/actions/admin";

/*
  Một yêu cầu đặt lịch.

  Mở sẵn hay gập lại dùng <details> của HTML chứ không dùng state React: hàng nào cũng
  chỉ đóng/mở độc lập, trình duyệt làm sẵn việc đó, và như vậy nó vẫn hoạt động kể cả khi
  JavaScript chưa kịp tải. Các nút đổi trạng thái là form gửi thẳng lên server, cùng lý do.
*/

const SERVICE_LABELS = {
  lookbook: "Lookbook",
  campaign: "Campaign",
  product: "Product",
  khac: "Khác / chưa rõ",
};

const BUDGET_LABELS = {
  "duoi-15": "Dưới 15 triệu",
  "15-30": "15 – 30 triệu",
  "30-60": "30 – 60 triệu",
  "tren-60": "Trên 60 triệu",
};

/* Ngày giờ ép về múi giờ Việt Nam, không phụ thuộc máy chủ đang đặt ở đâu */
const formatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Asia/Ho_Chi_Minh",
});

function StatusButton({ id, status, children }) {
  return (
    <form action={updateBookingStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="border border-rule px-3 py-1.5 font-ui text-xs tracking-wide text-fg/70 transition-colors duration-300 ease-soft hover:border-fg hover:text-fg"
      >
        {children}
      </button>
    </form>
  );
}

export default function BookingRow({ booking }) {
  const service = SERVICE_LABELS[booking.service] ?? booking.service;
  const budget = BUDGET_LABELS[booking.budget] ?? booking.budget;

  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 py-4 marker:content-none">
          {booking.status === "new" ? (
            <span aria-label="Chưa đọc" className="size-1.5 shrink-0 self-center bg-fg" />
          ) : (
            <span aria-hidden="true" className="size-1.5 shrink-0" />
          )}

          <span className="font-ui text-sm font-semibold text-fg">{booking.brand}</span>
          <span className="font-body text-sm text-fg/55">{booking.name}</span>
          <span className="label text-fg-mute">{service}</span>

          <span className="label ml-auto shrink-0 text-fg-mute tabular-nums">
            {formatter.format(new Date(booking.created_at))}
          </span>
        </summary>

        <div className="pb-6 pl-6">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="label text-fg-mute">Email</dt>
              <dd className="mt-1 font-body text-sm">
                <a href={`mailto:${booking.email}`} className="underline-draw">
                  {booking.email}
                </a>
              </dd>
            </div>

            {booking.phone ? (
              <div>
                <dt className="label text-fg-mute">Điện thoại</dt>
                <dd className="mt-1 font-body text-sm">
                  <a href={`tel:${booking.phone}`} className="underline-draw">
                    {booking.phone}
                  </a>
                </dd>
              </div>
            ) : null}

            {booking.shoot_date ? (
              <div>
                <dt className="label text-fg-mute">Ngày chụp mong muốn</dt>
                <dd className="mt-1 font-body text-sm text-fg/75">{booking.shoot_date}</dd>
              </div>
            ) : null}

            {budget ? (
              <div>
                <dt className="label text-fg-mute">Ngân sách</dt>
                <dd className="mt-1 font-body text-sm text-fg/75">{budget}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-5">
            <p className="label text-fg-mute">Mô tả dự án</p>
            {/* whitespace-pre-line để giữ lại cách xuống dòng khách đã gõ trong ô mô tả */}
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed whitespace-pre-line text-fg/75">
              {booking.message}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {booking.status !== "read" ? (
              <StatusButton id={booking.id} status="read">
                Đánh dấu đã đọc
              </StatusButton>
            ) : null}
            {booking.status !== "archived" ? (
              <StatusButton id={booking.id} status="archived">
                Lưu trữ
              </StatusButton>
            ) : (
              <StatusButton id={booking.id} status="new">
                Đưa lại vào mục Mới
              </StatusButton>
            )}
          </div>
        </div>
      </details>
    </li>
  );
}
