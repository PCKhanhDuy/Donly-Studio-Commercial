/*
  Dải tên khách hàng chạy ngang liên tục.

  Chạy bằng CSS keyframes chứ không phải JavaScript: trình duyệt xử lý trên compositor nên
  không tốn main thread, và tự dừng khi tab chạy nền.

  Cách lặp: render danh sách HAI lần rồi dịch track đi đúng -50% — tới cuối vòng, nửa sau
  đang nằm đúng vị trí nửa đầu lúc bắt đầu, nên điểm nối không nhìn thấy được.
  Bản sao thứ hai đặt aria-hidden để trình đọc màn hình không đọc lặp.

  Mặt nạ mờ hai mép để chữ tan dần thay vì bị cắt cụt ở rìa màn hình.
*/
export default function Marquee({ items, duration = 42, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
              >
                <span className="font-display text-3xl font-bold tracking-tight whitespace-nowrap text-fg/30 md:text-5xl">
                  {item}
                </span>
                <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-fg/25" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
