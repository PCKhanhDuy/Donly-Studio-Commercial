import Image from "next/image";

/*
  <Frame> — khung ảnh giữ đúng tỷ lệ chuẩn của guideline.

  Khi object ảnh chưa có `src`, component vẽ một KHUNG SPEC thay vì một khối xám trống:
  bốn dấu crop mark ở góc (đúng kiểu dấu xén của nhà in), một crosshair mảnh ở tâm,
  và kích thước pixel thật của khung. Cách này biến chỗ giữ ảnh thành một chi tiết
  có chủ đích — vừa cho biết ảnh cần giao đúng bao nhiêu pixel, vừa hợp với tính cách
  "chính xác, có chủ đích" của thương hiệu.

  Thêm `src` vào dữ liệu là ảnh thật tự thay vào, không phải sửa gì ở giao diện.
*/

const RATIOS = {
  "3:4": "aspect-3/4",
  "4:5": "aspect-4/5",
  "16:9": "aspect-video",
  "3:2": "aspect-3/2",
  "1:1": "aspect-square",
};

/*
  Kích thước giao file khuyến nghị cho từng tỷ lệ. Con số này hiện ngay trên khung
  placeholder nên nhìn vào là biết cần chuẩn bị ảnh bao nhiêu pixel.
*/
export const RATIO_PIXELS = {
  "3:4": { w: 1800, h: 2400 },
  "4:5": { w: 1200, h: 1500 },
  "16:9": { w: 1920, h: 1080 },
  "3:2": { w: 1800, h: 1200 },
  "1:1": { w: 1400, h: 1400 },
};

/*
  Thang 5 sắc độ cho nền TỐI: mỗi bậc là một lớp Pure White mờ phủ lên nền.
  Không thêm màu nào ngoài bảng, và trên nền tối thì khung giữ chỗ đọc ra như một
  ô phim chưa tráng — có chủ đích, thay vì một mảng trắng trống.
*/
const TONES = {
  1: { bg: "bg-paper/4", fg: "text-fg/70", line: "border-paper/25" },
  2: { bg: "bg-paper/7", fg: "text-fg/75", line: "border-paper/30" },
  3: { bg: "bg-paper/11", fg: "text-fg/80", line: "border-paper/35" },
  4: { bg: "bg-paper/16", fg: "text-fg/85", line: "border-paper/40" },
  5: { bg: "bg-paper/[0.02]", fg: "text-fg/60", line: "border-paper/20" },
};

/* Dấu xén ở bốn góc — hai nét vuông góc, không khép kín thành khung */
function CropMarks({ line }) {
  const corners = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];

  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute size-5 ${position} ${line}`}
        />
      ))}
    </>
  );
}

/*
  Xuất ra ngoài để các khối có chiều cao cố định (hero case study, dải nổi bật) dùng lại
  được đúng khung spec này mà không phải phụ thuộc vào tỷ lệ khung của <Frame>.
*/
export function SpecPlaceholder({ ratio, tone, label }) {
  const { bg, fg, line } = TONES[tone] ?? TONES[1];
  const px = RATIO_PIXELS[ratio] ?? RATIO_PIXELS["4:5"];

  return (
    <div className={`absolute inset-0 ${bg} ${fg}`}>
      <CropMarks line={line} />

      {/* Crosshair ở tâm khung */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-current opacity-20"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-current opacity-20"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-ui text-sm font-semibold tracking-[0.2em] tabular-nums opacity-70 sm:text-base">
          {px.w} × {px.h}
        </span>
        <span className="label opacity-40">{ratio.replace(":", " : ")}</span>
      </div>

      {label ? (
        <span className="label absolute bottom-4 left-4 max-w-[70%] truncate opacity-45">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default function Frame({
  image,
  className = "",
  sizes = "100vw",
  // Next 16 đã bỏ prop `priority` của next/image, thay bằng `preload`
  preload = false,
  zoom = false,
  label,
  children,
}) {
  const ratio = image?.ratio ?? "4:5";

  /*
    THỨ TỰ ƯU TIÊN: `ratio` chỉ định trước, kích thước pixel thật sau.

    Trong LƯỚI, mọi ô phải cùng một tỷ lệ thì các hàng mới thẳng — nên tầng dữ liệu gán
    sẵn ratio "4:5" cho ảnh trong lưới và <Frame> phải nghe theo. Trước đây kích thước
    thật được ưu tiên, nên ảnh 2:3 lẫn trong bộ 4:5 làm cả hàng cao thấp so le,
    nhìn như lỗi dàn trang.

    Ảnh không được gán ratio (ví dụ ảnh đơn đứng một mình) thì mới dùng tỷ lệ gốc.
    Lightbox và dải cuộn ngang không đi qua <Frame> nên vẫn luôn hiện đúng tỷ lệ gốc.
  */
  const hasRatio = Boolean(image?.ratio);
  const exact = !hasRatio && image?.width && image?.height;
  const ratioClass = exact ? "" : (RATIOS[ratio] ?? RATIOS["4:5"]);
  const exactStyle = exact
    ? { aspectRatio: `${image.width} / ${image.height}` }
    : undefined;

  // Hover phóng nhẹ 1.04 trong 500ms theo guideline mục 5 — dùng easing mềm, không dùng expo
  const motion = zoom
    ? "transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
    : "";

  return (
    <figure
      style={exactStyle}
      className={`relative overflow-hidden ${ratioClass} ${className}`}
    >
      {image?.src ? (
        <Image
          src={image.src}
          alt={image.alt ?? ""}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover ${motion}`}
        />
      ) : (
        <div className={`absolute inset-0 ${motion}`}>
          <SpecPlaceholder
            ratio={ratio}
            tone={image?.tone ?? 1}
            label={label ?? image?.label}
          />
          <span className="sr-only">{image?.alt}</span>
        </div>
      )}
      {children}
    </figure>
  );
}
