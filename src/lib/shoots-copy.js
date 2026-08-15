import { t } from "@/i18n/t";

/*
  Phần CHỮ của từng bộ ảnh, tra theo slug mà trình quét sinh ra.

  Ảnh và chữ được tách hẳn:
    · ảnh   → scripts/scan-projects.mjs tự đọc từ thư mục
    · chữ   → file này, sửa tay

  Thêm bộ ảnh mới mà chưa kịp viết chữ thì vẫn hiện lên bình thường, chỉ dùng nội dung
  mặc định — không bao giờ vỡ trang.

  ⚠️ CẦN BẠN SỬA LẠI: phần `summary` mô tả đúng những gì nhìn thấy trong ảnh, nhưng
  `brief` / `approach` / `result` là chữ mồi. Tôi không biết brief thật, deadline thật
  hay kết quả kinh doanh thật của từng dự án — những chỗ đó bạn điền vào mới chính xác.
  Riêng số frame trong `result` là số đếm thật từ thư mục ảnh.
*/

/*
  Phần chữ ở cấp KHÁCH HÀNG. Mỗi khách hàng gom nhiều collection chụp khác nhau,
  nên khách hàng mới là đơn vị hiển thị ở trang /works, không phải từng buổi chụp.
  Khoá = tên thư mục cấp một trong public/project/.
*/
export const clientsCopy = {
  stressmama: {
    name: "STRESSMAMA",
    industry: t("Streetwear", "Streetwear"),
    since: "2026",
    summary: t(
      "Thương hiệu streetwear phom rộng. Chúng tôi chụp lookbook theo từng đợt ra hàng, toàn bộ ngoài đường bằng ánh sáng ban ngày.",
      "An oversized streetwear label. We shoot their lookbooks drop by drop, entirely on the street in daylight.",
    ),
  },
  dirtycoins: {
    name: "DIRTYCOINS",
    industry: t("Thời trang đường phố", "Streetwear"),
    since: "2025",
    summary: t(
      "Khách hàng dài hạn với nhiều bộ sưu tập ra liên tiếp. Mỗi bộ giữ chung một hệ khung hình để xếp cạnh nhau trên trang danh mục vẫn thành một mạch.",
      "A long-running client with collections shipping back to back. Every set keeps the same framing system so they read as one line on a category page.",
    ),
  },
  "ameliee-official": {
    name: "AMELIEE",
    industry: t("Thời trang nữ", "Womenswear"),
    since: "2026",
    summary: t(
      "Thương hiệu nữ theo hướng nhẹ nhàng, tối giản. Mỗi collection chụp ngoại cảnh ban ngày, một look một bối cảnh, không đạo cụ.",
      "A soft, pared-back womenswear label. Each collection is shot outdoors in daylight — one look, one setting, no props.",
    ),
  },
  fiftysix: {
    name: "FIFTYSIX",
    industry: t("Thời trang đường phố", "Streetwear"),
    since: "2025",
    summary: t(
      "Các capsule lấy chủ đề đua xe, chụp ban đêm trong garage với đạo cụ thật thay vì phông dựng.",
      "Racing-themed capsules shot at night in a garage, with real props instead of a built set.",
    ),
  },
};

export const shootsCopy = {
  "stressmama-summer26-drop-01": {
    client: "STRESSMAMA",
    title: t("Summer 26 — Drop 01", "Summer 26 — Drop 01"),
    category: "lookbook",
    year: "2026",
    featured: true,
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [
      t("Chỉ đạo hình ảnh", "Art direction"),
      t("Lookbook", "Lookbook"),
      t("Hậu kỳ", "Retouching"),
    ],
    summary: t(
      "Lookbook streetwear chụp ngoài đường giữa ban ngày, giữ nguyên bối cảnh đô thị thật thay vì dựng phông studio.",
      "A streetwear lookbook shot on the street in daylight, keeping the real urban context instead of a studio backdrop.",
    ),
    brief: t(
      "STRESSMAMA bán phom rộng, và phom rộng chỉ đọc được khi người mặc đang đi lại. Bộ ảnh cần cho thấy quần áo trông ra sao trên vỉa hè thật — nơi khách hàng của họ thực sự mặc nó.",
      "STRESSMAMA sells oversized cuts, and an oversized cut only reads when the wearer is moving. The set had to show the clothes on a real pavement — where their customers actually wear them.",
    ),
    approach: t(
      "Chụp toàn bộ ngoài đường bằng ánh sáng ban ngày, không đèn. Mỗi look lấy trọn người ở tỷ lệ 4:5 để thấy được độ rủ của quần và độ trễ vai của áo. Bối cảnh đô thị được giữ trong khung nhưng luôn nằm ngoài vùng nét.",
      "Shot entirely on the street in available daylight, no flash. Each look captured full-length at 4:5 so the drape of the trousers and the drop of the shoulder both read. The urban context stays in frame but always out of focus.",
    ),
    result: t(
      "Tỷ lệ 4:5 dùng thẳng cho feed Instagram và trang sản phẩm mà không phải cắt lại.",
      "The 4:5 ratio dropped straight into the Instagram feed and the product pages with no re-cropping.",
    ),
    quote: t(
      "Phom rộng chỉ đọc được khi người mặc đang đi lại.",
      "An oversized cut only reads when the wearer is moving.",
    ),
  },

  "dirtycoins-dirtycoins-soccer": {
    client: "DIRTYCOINS",
    title: t("Soccer", "Soccer"),
    category: "campaign",
    year: "2025",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [
      t("Chỉ đạo hình ảnh", "Art direction"),
      t("Campaign", "Campaign"),
      t("Hậu kỳ", "Retouching"),
    ],
    summary: t(
      "Capsule lấy cảm hứng bóng đá, chụp ngoài trời dưới nắng gắt với góc máy thấp và nền trời xanh đậm.",
      "A football-inspired capsule shot outdoors in hard sunlight, with low camera angles against a deep blue sky.",
    ),
    brief: t(
      "Capsule mang tinh thần sân cỏ và văn hoá cổ vũ. Bộ ảnh cần năng lượng và chuyển động, không phải kiểu chụp đứng yên trên phông.",
      "A capsule built on football and terrace culture. The set needed energy and motion, not stand-still frames on a sweep.",
    ),
    approach: t(
      "Đặt máy thấp hơn tầm mắt để nhân vật nổi lên trên nền trời, lấy nắng trực tiếp làm nguồn sáng chính. Màu được giữ nguyên độ rực của áo đấu thay vì kéo về tông trung tính.",
      "The camera sat below eye level so the subject rises against the sky, with direct sun as the key light. Colour was kept at the full saturation of the jerseys rather than pulled toward neutral.",
    ),
    result: t(
      "Bộ ảnh chạy cho ra mắt capsule trên social và trang sản phẩm.",
      "The set carried the capsule launch across social and the product pages.",
    ),
  },

  "dirtycoins-the-rolling-stones-01": {
    client: "DIRTYCOINS",
    title: t("The Rolling Stones — 01", "The Rolling Stones — 01"),
    category: "lookbook",
    year: "2025",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Phần đầu của bộ sưu tập hợp tác, chụp toàn thân tỷ lệ 4:5 với nhịp khung thống nhất.",
      "The opening chapter of a collaboration collection, shot full-length at 4:5 with a consistent frame rhythm.",
    ),
    brief: t(
      "Bộ sưu tập ra theo nhiều phần, nên phần đầu phải đặt ra chuẩn khung hình cho những phần sau bám theo.",
      "The collection releases in chapters, so the first one had to set the framing standard the later chapters would follow.",
    ),
    approach: t(
      "Khoá cùng một chiều cao máy và cùng một khoảng cách cho mọi look, để khi xếp cạnh nhau trên trang danh mục thì nhịp khung đều tăm tắp.",
      "The same camera height and the same subject distance were locked for every look, so the frames sit together evenly on a category page.",
    ),
    result: t(
      "Bộ khung này được dùng lại làm chuẩn cho các phần tiếp theo của bộ sưu tập.",
      "This framing became the reference for the following chapters of the collection.",
    ),
  },

  "dirtycoins-the-rolling-stones-02": {
    client: "DIRTYCOINS",
    title: t("The Rolling Stones — 02", "The Rolling Stones — 02"),
    category: "lookbook",
    year: "2025",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Phần hai của bộ sưu tập, giữ nguyên hệ khung hình đã đặt ở phần đầu.",
      "The second chapter, keeping the framing system established in the first.",
    ),
    brief: t(
      "Phần hai ra sau vài tuần. Yêu cầu là ảnh phải đứng cạnh phần một mà không lệch tông, dù chụp ở buổi khác.",
      "Chapter two shipped a few weeks later. The requirement was that it sit beside chapter one without a tonal jump, despite being a separate shoot.",
    ),
    approach: t(
      "Dựng lại đúng thông số của buổi chụp trước — chiều cao máy, khoảng cách, hướng nắng — và đối chiếu trực tiếp với ảnh phần một ngay tại hiện trường.",
      "The previous session's parameters were rebuilt exactly — camera height, distance, sun direction — and checked against chapter one on set.",
    ),
    result: t(
      "Hai phần xếp chung một trang mà không nhận ra là hai buổi chụp khác nhau.",
      "Both chapters sit on one page without reading as two separate shoots.",
    ),
  },

  "dirtycoins-the-rolling-stones-summer": {
    client: "DIRTYCOINS",
    title: t("The Rolling Stones — Summer", "The Rolling Stones — Summer"),
    category: "lookbook",
    year: "2025",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Bản mùa hè của bộ sưu tập, chụp ở độ phân giải cao hơn cho nhu cầu in ấn.",
      "The summer edition of the collection, shot at higher resolution for print use.",
    ),
    brief: t(
      "Bản mùa hè cần dùng được cả cho ấn phẩm in, nên độ phân giải và chi tiết phải cao hơn hai phần trước.",
      "The summer edition also had to work in print, so resolution and detail had to exceed the previous two chapters.",
    ),
    approach: t(
      "Chụp ở khổ file lớn hơn và giữ chi tiết vùng sáng của vải, để ảnh phóng khổ lớn vẫn không bị bệt.",
      "Captured at a larger file size with highlight detail held in the fabric, so the frames hold up when scaled for print.",
    ),
    result: t(
      "Cùng một bộ ảnh dùng được cho cả social lẫn ấn phẩm in.",
      "One set covering both social and print.",
    ),
  },

  "fiftysix-bunny": {
    client: "FIFTYSIX",
    title: t("SpeedBunny", "SpeedBunny"),
    category: "campaign",
    year: "2025",
    location: t("Garage — TP.HCM", "Garage — Ho Chi Minh City"),
    scope: [
      t("Chỉ đạo hình ảnh", "Art direction"),
      t("Campaign", "Campaign"),
      t("Hậu kỳ", "Retouching"),
    ],
    summary: t(
      "Capsule chủ đề đua xe, chụp ban đêm trong garage với mũ bảo hiểm và xe làm đạo cụ thật.",
      "A racing-themed capsule shot at night in a garage, with helmets and bikes as real props.",
    ),
    brief: t(
      "Capsule mang tinh thần đua xe đường phố. Bối cảnh phải là garage thật chứ không phải phông dựng, để đạo cụ và quần áo cùng thuộc về một thế giới.",
      "A capsule built on street-racing culture. The setting had to be a real garage rather than a built set, so the props and the clothes belong to the same world.",
    ),
    approach: t(
      "Chụp ban đêm, dùng nguồn sáng cứng đặt gần để tạo tương phản mạnh và giữ nền garage chìm trong tối. Đạo cụ là xe và mũ thật của tiệm.",
      "Shot at night with a hard light placed close for strong contrast, letting the garage fall away into darkness. The props are the shop's own bikes and helmets.",
    ),
    result: t(
      "Bộ ảnh dùng cho ra mắt capsule và cho ấn phẩm tại điểm bán.",
      "The set ran for the capsule launch and for point-of-sale print.",
    ),
    quote: t(
      "Đạo cụ thật thì không cần diễn.",
      "Real props don't need acting.",
    ),
  },

  "fiftysix-racing": {
    client: "FIFTYSIX",
    title: t("Racing", "Racing"),
    category: "lookbook",
    year: "2025",
    location: t("Garage — TP.HCM", "Garage — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Phần lookbook của dòng racing, tập trung vào chi tiết áo và cách phối lớp.",
      "The lookbook half of the racing line, focused on garment detail and layering.",
    ),
    brief: t(
      "Dòng racing có nhiều chi tiết in và patch nhỏ. Bộ ảnh cần đủ gần để đọc được những chi tiết đó.",
      "The racing line carries a lot of small prints and patches. The set had to get close enough to read them.",
    ),
    approach: t(
      "Xen kẽ frame toàn thân và frame cận, giữ chung một nguồn sáng để hai loại khung đứng cạnh nhau không lệch tông.",
      "Full-length frames alternate with close frames, lit from the same source so the two types sit together without a tonal jump.",
    ),
    result: t(
      "Đủ khung cho cả trang sản phẩm lẫn feed social.",
      "Enough frames for both the product pages and the social feed.",
    ),
  },

  "ameliee-official-calista": {
    client: "AMELIEE",
    title: t("Calista", "Calista"),
    category: "lookbook",
    year: "2026",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Bộ ren và lụa chụp trước mảng đá và cửa gỗ sẫm, để chất liệu sáng nổi lên trên nền trầm.",
      "Lace and silk shot against stone and dark timber, so the light fabrics lift off a heavy background.",
    ),
  },

  "ameliee-official-emberly": {
    client: "AMELIEE",
    title: t("Emberly", "Emberly"),
    category: "lookbook",
    year: "2026",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook"), t("Hậu kỳ", "Retouching")],
    summary: t(
      "Váy hai dây chụp giữa ban ngày ngoài phố, người mẫu đang bước để thấy độ rủ của vải.",
      "Slip dresses shot on the street in daylight, the model mid-stride so the fabric's fall reads.",
    ),
  },

  "ameliee-official-orion": {
    client: "AMELIEE",
    title: t("Orion", "Orion"),
    category: "lookbook",
    year: "2026",
    location: t("Ngoại cảnh — TP.HCM", "On location — Ho Chi Minh City"),
    scope: [t("Lookbook", "Lookbook")],
    summary: t(
      "Một khung duy nhất cho look mở màn, chụp cạnh hàng rào sắt trong nắng chiều.",
      "A single frame for the opening look, shot beside iron railings in late afternoon light.",
    ),
  },
};

/* Nội dung mặc định cho bộ ảnh chưa kịp viết chữ — trang vẫn dựng được bình thường */
export const fallbackCopy = {
  category: "lookbook",
  year: "",
  location: t("TP.HCM", "Ho Chi Minh City"),
  scope: [t("Lookbook", "Lookbook")],
  summary: t(
    "Bộ ảnh thương mại do DONLY Studio Commercial thực hiện.",
    "Commercial photography by DONLY Studio Commercial.",
  ),
  brief: t("Đang cập nhật nội dung.", "Write-up coming soon."),
  approach: t("Đang cập nhật nội dung.", "Write-up coming soon."),
  result: t("Đang cập nhật nội dung.", "Write-up coming soon."),
};
