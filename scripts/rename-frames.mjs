/*
  Đổi tên ảnh trong public/project/ về đúng quy ước đặt tên.

      A-00.<ext>       ảnh main / thumb của collection — bản có watermark
      A-01, A-02, …    các khung của nhóm A
      B-01, C-01, …    nhóm tiếp theo, mỗi chữ là một nhóm

  QUY TẮC: GIỮ NGUYÊN chữ và số đang có, chỉ chuẩn hoá về dạng `<CHỮ>-<SỐ 2 chữ số>`.

  Không tự đánh số lại. Đánh số lại thì B01 của bộ Soccer sẽ thành A-03 — xoá mất cách
  bạn đã chia nhóm. Số cũng giữ nguyên, nên chỗ nào đang khuyết (Rolling Stones 01 không
  có A01) thì sau khi đổi tên vẫn khuyết đúng chỗ đó.

  File không có chữ đứng đầu thì mặc định vào nhóm A:
      00-main.jpg     → A-00.jpg
      10.jpg          → A-10.jpg
      SUMMER26-003.jpg→ A-03.jpg   (lấy cụm số cuối cùng)

  Đổi tên qua HAI LƯỢT, đi vòng qua tên tạm. Đổi thẳng một lượt thì tấm đang tên A-01.jpg
  có thể bị tấm khác ghi đè trước khi nó kịp được đổi — mất file thật.

  Chạy thử (chỉ in ra, không đụng file):   node scripts/rename-frames.mjs
  Chạy thật:                               node scripts/rename-frames.mjs --apply
  Sau khi chạy thật:                       npm run scan:images
*/

import { readdirSync, statSync, renameSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(HERE, "..", "public", "project");

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const APPLY = process.argv.includes("--apply");

const dirs = (path) =>
  readdirSync(path).filter((name) => statSync(join(path, name)).isDirectory());

/* Tách tên file thành nhóm + số theo quy tắc ở đầu file */
function parse(file) {
  const stem = basename(file, extname(file));

  // Dạng chuẩn hoặc gần chuẩn: một chữ cái, dấu gạch tuỳ chọn, rồi số  (A00, B-01, C1)
  const grouped = stem.match(/^([A-Za-z])-?(\d+)/);
  if (grouped) return { group: grouped[1].toUpperCase(), num: Number(grouped[2]) };

  // Còn lại: vào nhóm A, lấy cụm số CUỐI trong tên (SUMMER26-003 → 3, chứ không phải 26)
  const runs = stem.match(/\d+/g);
  return { group: "A", num: runs ? Number(runs[runs.length - 1]) : 0 };
}

let renamed = 0;
let already = 0;
let problems = 0;

for (const client of dirs(PROJECT_DIR)) {
  for (const shoot of dirs(join(PROJECT_DIR, client))) {
    const shootDir = join(PROJECT_DIR, client, shoot);
    const files = readdirSync(shootDir)
      .filter((f) => IMAGE_RE.test(f))
      .sort();

    if (files.length === 0) {
      console.log(`\n${client}/${shoot}  — thư mục trống, bỏ qua`);
      continue;
    }

    const plan = files.map((file) => {
      const { group, num } = parse(file);
      return {
        from: file,
        to: `${group}-${String(num).padStart(2, "0")}${extname(file).toLowerCase()}`,
      };
    });

    // Hai file cùng đích là dấu hiệu quy tắc đọc sai tên — dừng bộ đó lại, không đoán bừa
    const seen = new Map();
    const clashes = [];
    for (const p of plan) {
      if (seen.has(p.to)) clashes.push(`${seen.get(p.to)} + ${p.from} → ${p.to}`);
      seen.set(p.to, p.from);
    }

    console.log(`\n${client}/${shoot}  (${files.length} tấm)`);

    if (clashes.length > 0) {
      problems++;
      console.log("  !! TRÙNG TÊN ĐÍCH — bỏ qua cả bộ này:");
      for (const c of clashes) console.log(`     ${c}`);
      continue;
    }

    const changes = plan.filter((p) => p.from !== p.to);
    already += plan.length - changes.length;

    for (const p of plan) {
      console.log(`  ${p.from === p.to ? "=" : "→"} ${p.from.padEnd(24)} ${p.to}`);
    }

    if (!APPLY || changes.length === 0) continue;

    // Lượt 1: mọi file cần đổi → tên tạm, để không tấm nào ghi đè tấm nào
    changes.forEach((p, i) => {
      renameSync(join(shootDir, p.from), join(shootDir, `__tmp-${i}${extname(p.from)}`));
    });
    // Lượt 2: tên tạm → tên đích
    changes.forEach((p, i) => {
      renameSync(join(shootDir, `__tmp-${i}${extname(p.from)}`), join(shootDir, p.to));
    });

    renamed += changes.length;
  }
}

console.log(
  APPLY
    ? `\nĐã đổi tên ${renamed} file · ${already} file vốn đã đúng · ${problems} bộ bị bỏ qua vì trùng tên.\nChạy tiếp: npm run scan:images`
    : `\nCHẠY THỬ — chưa đụng vào file nào. Thêm --apply để đổi thật.`,
);
