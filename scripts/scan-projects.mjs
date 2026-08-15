/*
  Quét public/project/ rồi sinh ra src/lib/generated/shoots.json

  QUY ƯỚC THƯ MỤC — chỉ cần nhớ đúng một điều:

      public/project/<khách-hàng>/<tên-buổi-chụp>/*.jpg

  QUY ƯỚC TÊN FILE:

      A-00.jpg          ảnh main / thumb của collection — bản có watermark
      A-01, A-02, …     các khung còn lại

  Ảnh bìa = file số 00 (A-00). Đây là ảnh CHỦ Ý có watermark "DONLY STUDIO COMMERCIAL"
  in ngang đáy khung, dùng làm mặt của collection ở mọi danh sách. Vì watermark nằm sát
  đáy nên chỗ nào hiện ảnh bìa cũng phải hiện TRỌN chiều cao — xén đáy là cắt mất chữ.

  Không tìm thấy file 00 thì lấy file đầu theo thứ tự tên, để thư mục chưa kịp đổi tên
  vẫn dựng được. Kích thước thật của từng ảnh đọc từ header file và ghi vào manifest.

  Thêm một bộ ảnh mới = thả thư mục vào rồi chạy `npm run scan:images`.
  Không phải sửa một dòng code nào.

  Chạy tự động trước mỗi lần `npm run build` (xem script "prebuild" trong package.json).
*/

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PROJECT_DIR = join(ROOT, "public", "project");
const OUT_FILE = join(ROOT, "src", "lib", "generated", "shoots.json");

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

/* ---------- đọc kích thước ảnh từ header, không cần thư viện ---------- */

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    const isSOF =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(buf) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readSize(path) {
  const buf = readFileSync(path);
  if (buf[0] === 0x89 && buf[1] === 0x50) return pngSize(buf);
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  return null;
}

/* ---------- tiện ích ---------- */

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Đường dẫn public có dấu cách và chữ hoa → mã hoá từng đoạn cho URL hợp lệ
const toUrl = (...segments) =>
  "/" + segments.map((s) => s.split("/").map(encodeURIComponent).join("/")).join("/");

const dirs = (path) =>
  readdirSync(path).filter((name) => statSync(join(path, name)).isDirectory());

/* ---------- quét ---------- */

const shoots = [];
let skipped = 0;

for (const client of dirs(PROJECT_DIR)) {
  const clientDir = join(PROJECT_DIR, client);

  for (const shoot of dirs(clientDir)) {
    const shootDir = join(clientDir, shoot);
    const files = readdirSync(shootDir).filter((f) => IMAGE_RE.test(f)).sort();

    if (files.length === 0) {
      skipped++;
      console.log(`  bỏ qua (thư mục trống): ${client}/${shoot}`);
      continue;
    }

    const images = files
      .map((file) => {
        const size = readSize(join(shootDir, file));
        if (!size) return null;
        return {
          src: toUrl("project", client, shoot, file),
          file,
          width: size.width,
          height: size.height,
        };
      })
      .filter(Boolean);

    if (images.length === 0) {
      skipped++;
      continue;
    }

    /*
      Ảnh bìa = file số 00 theo quy ước (A-00.jpg).
      Bắt cả mấy kiểu đặt tên cũ chưa kịp đổi: 00.jpg, A00.jpg, 00-main.jpg.
      Không khớp cái nào thì lấy file đầu theo thứ tự tên.
    */
    const coverIndex = Math.max(
      0,
      images.findIndex((image) => /^[a-z]?-?00\b/i.test(image.file)),
    );

    /*
      Hai slug tách riêng để dựng URL ba cấp:
        /works                      → danh sách khách hàng
        /works/dirtycoins           → các collection của khách đó
        /works/dirtycoins/soccer    → ảnh của collection
    */
    shoots.push({
      clientSlug: slugify(client),
      shootSlug: slugify(shoot),
      clientFolder: client,
      shootFolder: shoot,
      coverIndex,
      images,
    });
  }
}

shoots.sort((a, b) =>
  `${a.clientSlug}/${a.shootSlug}`.localeCompare(`${b.clientSlug}/${b.shootSlug}`),
);

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify({ shoots }, null, 2)}\n`, "utf8");

const total = shoots.reduce((sum, s) => sum + s.images.length, 0);
console.log(`\n${shoots.length} bộ ảnh · ${total} tấm · bỏ qua ${skipped} thư mục trống`);
for (const shoot of shoots) {
  const path = `${shoot.clientSlug}/${shoot.shootSlug}`;
  const cover = shoot.images[shoot.coverIndex].file;
  console.log(
    `  ${path.padEnd(42)} ${String(shoot.images.length).padStart(3)} tấm   bìa: ${cover}`,
  );
}

/*
  Bộ nào chưa có A-00 thì trình quét đang lấy tạm tấm đầu làm bìa. Vẫn dựng được, nhưng
  đó không phải bản có watermark nên mặt của collection sẽ trống thương hiệu. In ra đây
  để biết còn bộ nào cần xuất thêm ảnh thumb.
*/
const missingCover = shoots.filter((s) => !/^A-00\./i.test(s.images[s.coverIndex].file));
if (missingCover.length > 0) {
  console.log(`\n⚠ ${missingCover.length} bộ chưa có ảnh thumb A-00 (đang lấy tạm tấm đầu):`);
  for (const shoot of missingCover) {
    console.log(`  ${shoot.clientSlug}/${shoot.shootSlug}`);
  }
}
console.log(`\nĐã ghi: ${OUT_FILE.replace(ROOT, ".")}`);
