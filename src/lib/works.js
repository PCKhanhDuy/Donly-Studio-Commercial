import { t } from "@/i18n/t";
import manifest from "@/lib/generated/shoots.json";
import { clientsCopy, fallbackCopy, shootsCopy } from "@/lib/shoots-copy";

/*
  CẤU TRÚC BA CẤP — KHÁCH HÀNG → COLLECTION → ẢNH

      /works                     danh sách khách hàng
      /works/dirtycoins          các collection của khách đó
      /works/dirtycoins/soccer   ảnh của một collection

  Trước đây mọi buổi chụp bị dàn phẳng thành "dự án" riêng, nên danh sách hiện ra
  DIRTYCOINS bốn lần liền nhau — không đọc được ai là khách hàng, ai là bộ ảnh.
  Khách hàng mới là đơn vị hiển thị; collection nằm bên trong.

  Ảnh do scripts/scan-projects.mjs quét từ thư mục; chữ nằm ở src/lib/shoots-copy.js.
*/

export const categories = [
  { slug: "all", label: t("Tất cả", "All") },
  { slug: "lookbook", label: t("Lookbook", "Lookbook") },
  { slug: "campaign", label: t("Campaign", "Campaign") },
  { slug: "product", label: t("Product", "Product") },
];

export const categoryLabel = {
  lookbook: t("Lookbook", "Lookbook"),
  campaign: t("Campaign", "Campaign"),
  product: t("Product", "Product"),
};

/*
  TỶ LỆ CHUNG CHO LƯỚI ẢNH — 3:4, lấy theo bộ chuẩn ameliee_official.

  Trong LƯỚI mọi tấm phải cùng một tỷ lệ thì các hàng mới thẳng; để mỗi tấm giữ tỷ lệ gốc
  thì hàng cao thấp so le, nhìn như lỗi dàn trang. Câu hỏi chỉ là chọn tỷ lệ nào.

  Chọn 3:4 (0.750) vì hai lẽ:

  · Đó là tỷ lệ của bộ chuẩn: toàn bộ ảnh ameliee_official đúng 0.750, và MỌI ảnh A-00
    (ảnh thumb có watermark) đều là 1800×2400 = 0.750.

  · Watermark nằm sát ĐÁY khung. Khung 0.750 hẹp hơn phần lớn ảnh còn lại trong thư viện
    (0.800), nên khi xén, nó cắt bớt hai BÊN và giữ trọn chiều cao — dòng watermark còn
    nguyên. Nếu chọn 4:5 thì ngược lại: ảnh 0.750 bị cắt đáy, tức cắt ngang watermark.

  Riêng lightbox và dải cuộn ngang vẫn dùng tỷ lệ gốc, vì ở đó ảnh đứng một mình.
*/
const GRID_RATIO = "3:4";

function toImage(entry, client, index) {
  return {
    src: entry.src,
    width: entry.width,
    height: entry.height,
    ratio: GRID_RATIO,
    alt: t(`${client} — khung ${index + 1}`, `${client} — frame ${index + 1}`),
  };
}

/*
  Chia ảnh thành các hàng ĐỀU NHAU: mỗi hàng ba khung.
  Trước đây tôi luân phiên 3 rồi 2 cho "đỡ đơn điệu", nhưng với ảnh dọc thì nhịp đều mới
  ra dáng contact sheet; nhịp đổi liên tục chỉ làm trang trông lộn xộn.
  Hàng cuối thiếu ảnh thì vẫn giữ nguyên lưới ba cột, ô trống để trống.
*/
function buildRows(images, quote) {
  const blocks = [];
  const PER_ROW = 3;

  for (let i = 0; i < images.length; i += PER_ROW) {
    blocks.push({ type: "row", images: images.slice(i, i + PER_ROW) });

    // Câu trích chèn sau hàng thứ hai, nếu bộ ảnh đủ dài để không bị dồn cục
    if (quote && blocks.filter((b) => b.type === "row").length === 2 && images.length > 8) {
      blocks.push({ type: "quote", text: quote });
    }
  }

  return blocks;
}

function buildCollection(shoot) {
  const key = `${shoot.clientSlug}-${shoot.shootSlug}`;
  const copy = shootsCopy[key] ?? {};
  const clientName = clientsCopy[shoot.clientSlug]?.name ?? shoot.clientFolder;

  const images = shoot.images.map((entry, index) => toImage(entry, clientName, index));

  /*
    Bìa = ảnh A-00, do trình quét chỉ ra. Đây là bản CÓ WATERMARK, cố ý, dùng làm mặt của
    collection ở mọi danh sách. Vì watermark nằm sát đáy khung nên bìa phải luôn hiện
    trọn chiều cao — xem chú thích GRID_RATIO ở trên.
  */
  const coverIndex = shoot.coverIndex;
  const cover = images[coverIndex] ?? images[0];

  // Ảnh hero: một tấm duy nhất, không ghép nhiều tấm cạnh nhau
  const hero = cover;

  // Ảnh bìa không lặp lại xuống lưới bên dưới
  const gallery = images.filter((_, i) => i !== coverIndex);

  /*
    Khung KHÔNG watermark đầu tiên của bộ. Dùng cho những chỗ xén rất mạnh — hero trang
    chủ cắt ảnh dọc thành khung tràn màn hình, giữ lại chưa tới một nửa chiều cao. Đưa
    ảnh bìa vào đó thì watermark bị cắt còn một nửa, đọc ra như lỗi. Chỗ nào xén mạnh thì
    dùng khung thường, chỗ nào hiện trọn khung mới dùng bìa.
  */
  const plate = gallery[0] ?? cover;

  return {
    slug: shoot.shootSlug,
    clientSlug: shoot.clientSlug,
    href: `/works/${shoot.clientSlug}/${shoot.shootSlug}`,
    client: clientName,
    title: copy.title ?? t(shoot.shootFolder, shoot.shootFolder),
    category: copy.category ?? fallbackCopy.category,
    year: copy.year ?? fallbackCopy.year,
    location: copy.location ?? fallbackCopy.location,
    featured: copy.featured ?? false,
    frameCount: images.length,
    scope: copy.scope ?? fallbackCopy.scope,
    summary: copy.summary ?? fallbackCopy.summary,
    brief: copy.brief ?? fallbackCopy.brief,
    approach: copy.approach ?? fallbackCopy.approach,
    result: copy.result ?? fallbackCopy.result,
    credits: copy.credits ?? [
      { role: t("Nhiếp ảnh", "Photography"), name: "DONLY Studio" },
      { role: t("Hậu kỳ", "Retouching"), name: "DONLY Studio" },
    ],
    cover,
    plate,
    hero,
    images,
    blocks: buildRows(gallery, copy.quote),
  };
}

/* Gom collection theo khách hàng */
function buildClients() {
  const grouped = new Map();

  for (const shoot of manifest.shoots) {
    const collection = buildCollection(shoot);
    if (!grouped.has(shoot.clientSlug)) grouped.set(shoot.clientSlug, []);
    grouped.get(shoot.clientSlug).push(collection);
  }

  return [...grouped.entries()].map(([slug, collections]) => {
    const copy = clientsCopy[slug] ?? {};
    const featured = collections.some((c) => c.featured);

    return {
      slug,
      href: `/works/${slug}`,
      name: copy.name ?? collections[0].client,
      industry: copy.industry ?? t("Thời trang", "Fashion"),
      since: copy.since ?? collections[0].year,
      summary: copy.summary ?? fallbackCopy.summary,
      featured,
      collections,
      collectionCount: collections.length,
      frameCount: collections.reduce((sum, c) => sum + c.frameCount, 0),
      // Ảnh đại diện khách hàng: bìa của collection nổi bật, không có thì bìa collection đầu
      cover: (collections.find((c) => c.featured) ?? collections[0]).cover,
      // Vài khung tiêu biểu, mỗi collection góp một tấm
      highlights: collections.map((c) => c.cover),
    };
  });
}

const realClients = buildClients();

export const clients = [
  ...realClients.filter((c) => c.featured),
  ...realClients.filter((c) => !c.featured),
];

/* Danh sách phẳng tất cả collection — dùng cho sitemap và generateStaticParams */
export const allCollections = clients.flatMap((client) => client.collections);

export function getClient(slug) {
  return clients.find((client) => client.slug === slug);
}

export function getCollection(clientSlug, collectionSlug) {
  return getClient(clientSlug)?.collections.find((c) => c.slug === collectionSlug);
}

export function getAdjacentCollection(clientSlug, collectionSlug) {
  const index = allCollections.findIndex(
    (c) => c.clientSlug === clientSlug && c.slug === collectionSlug,
  );
  if (index === -1) return null;
  return allCollections[(index + 1) % allCollections.length];
}

export function getFeaturedCollection() {
  return allCollections.find((c) => c.featured) ?? allCollections[0];
}
