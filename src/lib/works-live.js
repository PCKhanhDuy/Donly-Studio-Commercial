import "server-only";

import { clients as fileClients } from "@/lib/works";
import { clientKey, collectionKey, getOverrides } from "@/lib/admin/content";

/*
  Ghép nội dung: file nguồn là bản gốc, phần bạn sửa trong admin phủ lên trên.

  VÌ SAO TÁCH RA KHỎI works.js thay vì sửa thẳng vào đó:

  · works.js phải chạy ĐƯỢC MÀ KHÔNG CẦN DATABASE. generateStaticParams và sitemap gọi
    nó để liệt kê đường dẫn; danh sách đường dẫn do THƯ MỤC ẢNH quyết định, không phải
    do chữ nghĩa. Sửa tiêu đề một bộ ảnh không được phép làm đổi URL của nó.

  · Nhờ đó, database sập cũng không mất trang nào. Cùng lắm là hiện nội dung gốc.

  Các trang gọi hàm ở file này để lấy bản đã ghép. Chúng vẫn được dựng sẵn lúc build;
  khi bạn bấm Lưu trong admin, server action gọi revalidatePath để dựng lại đúng những
  trang liên quan — xem src/lib/actions/content.js.
*/

/* Chỉ lấy những khoá có giá trị thật, để ô để trống trong admin không xoá mất bản gốc */
function merge(base, patch, fields) {
  if (!patch) return base;

  const next = { ...base };
  for (const field of fields) {
    const value = patch[field];
    if (value === undefined || value === null) continue;

    // Ô song ngữ: cho phép sửa một bên, bên còn lại giữ nguyên bản gốc
    if (typeof value === "object" && !Array.isArray(value)) {
      const vi = value.vi?.trim?.() ?? "";
      const en = value.en?.trim?.() ?? "";
      if (!vi && !en) continue;
      next[field] = {
        vi: vi || base[field]?.vi || "",
        en: en || base[field]?.en || vi || "",
      };
      continue;
    }

    if (typeof value === "string" && !value.trim()) continue;
    next[field] = value;
  }
  return next;
}

export const CLIENT_FIELDS = ["name", "industry", "since", "summary"];
export const COLLECTION_FIELDS = [
  "title",
  "year",
  "location",
  "summary",
  "brief",
  "approach",
  "result",
];

function buildClient(client, overrides) {
  const collections = client.collections.map((collection) =>
    merge(
      collection,
      overrides.get(collectionKey(client.slug, collection.slug)),
      COLLECTION_FIELDS,
    ),
  );

  const merged = merge(client, overrides.get(clientKey(client.slug)), CLIENT_FIELDS);
  return { ...merged, collections };
}

export async function getLiveClients() {
  const overrides = await getOverrides();
  return fileClients.map((client) => buildClient(client, overrides));
}

export async function getLiveCollections() {
  const clients = await getLiveClients();
  return clients.flatMap((client) => client.collections);
}

export async function getLiveClient(slug) {
  const clients = await getLiveClients();
  return clients.find((client) => client.slug === slug);
}

export async function getLiveCollection(clientSlug, collectionSlug) {
  const client = await getLiveClient(clientSlug);
  return client?.collections.find((collection) => collection.slug === collectionSlug);
}

/*
  Bộ ảnh đứng ngay sau bộ hiện tại trong danh sách phẳng, quay vòng về đầu khi hết.
  Tính trên bản đã ghép để khối "dự án tiếp theo" hiện đúng tiêu đề bạn vừa sửa.
*/
export async function getLiveAdjacent(clientSlug, collectionSlug) {
  const all = await getLiveCollections();
  const index = all.findIndex(
    (c) => c.clientSlug === clientSlug && c.slug === collectionSlug,
  );
  if (index === -1) return null;
  return all[(index + 1) % all.length];
}

export async function getLiveFeatured() {
  const all = await getLiveCollections();
  return all.find((c) => c.featured) ?? all[0];
}
