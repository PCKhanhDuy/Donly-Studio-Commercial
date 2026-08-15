import { t } from "@/i18n/t";

/*
  Nội dung tĩnh: dịch vụ, bảng gói, quy trình, nguyên tắc, FAQ.
  Giá và số liệu dưới đây là placeholder cho bản demo — thay bằng số thật trước khi công bố.
  Chuỗi người dùng đọc được bọc t("tiếng Việt", "English").
*/

export const services = [
  {
    slug: "lookbook",
    index: "01",
    name: t("Lookbook", "Lookbook"),
    tagline: t(
      "Bộ sưu tập, đúng phom, đúng chất liệu.",
      "The collection — true fit, true fabric.",
    ),
    description: t(
      "Bộ ảnh trình bày trọn vẹn một bộ sưu tập. Mỗi look được chụp ở trạng thái đứng tĩnh và cận cảnh chất liệu, để khách hàng của bạn đọc được phom dáng và chất vải trước khi chạm vào sản phẩm.",
      "A set that presents a collection in full. Every look is captured standing still and again close on the fabric, so your customer can read the cut and the cloth before ever touching the garment.",
    ),
    ratio: t(
      "4:5 (dọc) — chuẩn cho website gallery và Instagram",
      "4:5 (portrait) — the standard for gallery pages and Instagram",
    ),
    // Nhãn ngắn hiện ở thanh meta của thẻ dịch vụ
    ratioShort: "4:5",
    image: {
      src: "/project/ameliee_official/Calista/A-01.jpg",
      ratio: "4:5",
      alt: t("Khung lookbook 4:5 — AMELIEE, bộ Calista", "A 4:5 lookbook frame — AMELIEE, Calista"),
    },
    deliverables: [
      t("20–40 frame chính, chỉnh sửa hoàn thiện", "20–40 finished main frames"),
      t("Ảnh cận cảnh chất liệu cho mỗi look", "A fabric close-up for every look"),
      t("File JPG cho web và TIFF cho in ấn", "JPG for web and TIFF for print"),
      t("Bản crop sẵn 4:5, 1:1 và 9:16", "Ready-made 4:5, 1:1 and 9:16 crops"),
    ],
    bestFor: t(
      "Thương hiệu thời trang ra bộ sưu tập theo mùa",
      "Fashion brands releasing seasonal collections",
    ),
  },
  {
    slug: "campaign",
    index: "02",
    name: t("Campaign", "Campaign"),
    tagline: t(
      "Một hình ảnh, chạy được ở mọi kênh.",
      "One image, running everywhere.",
    ),
    description: t(
      "Key visual cho chiến dịch ra mắt. Chúng tôi bố cục với khoảng âm đủ rộng để một frame cắt được sang billboard ngang, banner web và story dọc mà không mất chủ thể và không cần chụp lại.",
      "The key visual for a launch. We compose with enough negative space that a single frame crops to a wide billboard, a web banner and a vertical story without losing the subject and without a reshoot.",
    ),
    ratio: t(
      "16:9 hoặc 3:2 (ngang) — cho banner và hero section",
      "16:9 or 3:2 (landscape) — for banners and hero sections",
    ),
    ratioShort: "16:9",
    image: {
      src: "/project/dirtycoins/DirtyCoins%20Soccer/A-01.jpg",
      ratio: "16:9",
      alt: t("Khung campaign 16:9 — DIRTYCOINS, bộ Soccer", "A 16:9 campaign frame — DIRTYCOINS, Soccer"),
    },
    deliverables: [
      t("1–3 key visual chính", "1–3 primary key visuals"),
      t("8–15 frame phụ trợ cho social", "8–15 supporting frames for social"),
      t(
        "Bản cắt sẵn cho mọi tỷ lệ kênh truyền thông",
        "Ready-made crops for every channel ratio",
      ),
      t("File độ phân giải in khổ lớn", "Large-format print resolution files"),
    ],
    bestFor: t(
      "Chiến dịch ra mắt sản phẩm, bộ sưu tập hoặc tái định vị",
      "Product launches, collection drops and repositioning campaigns",
    ),
  },
  {
    slug: "product",
    index: "03",
    name: t("Product", "Product"),
    tagline: t("Nhất quán qua từng SKU.", "Consistent across every SKU."),
    description: t(
      "Ảnh sản phẩm cho thương mại điện tử và catalogue. Vị trí máy, chiều cao và hướng sáng được khoá cứng suốt buổi chụp, để hàng trăm SKU đứng cạnh nhau trên trang danh mục vẫn thành một bộ.",
      "Product photography for e-commerce and catalogue. Camera position, height and light direction stay locked for the whole shoot, so hundreds of SKUs sitting side by side on a category page still read as one set.",
    ),
    ratio: t(
      "1:1 (vuông) — chuẩn cho catalogue và sàn thương mại điện tử",
      "1:1 (square) — the standard for catalogues and marketplaces",
    ),
    ratioShort: "1:1",
    image: {
      src: "/project/fiftysix/Bunny/A-01.jpg",
      ratio: "1:1",
      alt: t("Khung sản phẩm 1:1 — FIFTYSIX, bộ SpeedBunny", "A 1:1 product frame — FIFTYSIX, SpeedBunny"),
    },
    deliverables: [
      t("3 góc chụp cho mỗi SKU", "Three angles per SKU"),
      t(
        "File nền trong (cut-out) và file nền off-white",
        "Transparent cut-outs and off-white versions",
      ),
      t(
        "Cân bằng trắng đo bằng thẻ xám, màu đúng sản phẩm thật",
        "White balance read off a grey card — colour true to the real product",
      ),
      t("Đặt tên file theo mã SKU của bạn", "Files named to your SKU codes"),
    ],
    bestFor: t(
      "Thương hiệu bán online cần hệ ảnh danh mục đồng nhất",
      "Online brands that need a uniform catalogue system",
    ),
  },
];

export const packages = [
  {
    name: "Essential",
    price: "12.000.000₫",
    unit: t("buổi nửa ngày", "half-day session"),
    summary: t(
      "Đủ cho một dòng sản phẩm nhỏ hoặc một đợt bổ sung ảnh.",
      "Enough for a small product line or a top-up round of images.",
    ),
    includes: [
      t("4 giờ chụp tại studio", "4 hours of studio time"),
      t("Tối đa 15 frame hoàn thiện", "Up to 15 finished frames"),
      t("1 vòng chỉnh sửa", "One round of revisions"),
      t("Bàn giao trong 5 ngày làm việc", "Delivery in 5 working days"),
    ],
  },
  {
    name: "Standard",
    price: "28.000.000₫",
    unit: t("buổi trọn ngày", "full-day session"),
    summary: t(
      "Gói được chọn nhiều nhất cho lookbook theo mùa.",
      "The package most often chosen for a seasonal lookbook.",
    ),
    includes: [
      t("8 giờ chụp tại studio", "8 hours of studio time"),
      t("Tối đa 40 frame hoàn thiện", "Up to 40 finished frames"),
      t("2 vòng chỉnh sửa", "Two rounds of revisions"),
      t("Bản crop đa tỷ lệ cho mọi kênh", "Multi-ratio crops for every channel"),
      t("Bàn giao trong 7 ngày làm việc", "Delivery in 7 working days"),
    ],
    featured: true,
  },
  {
    name: "Production",
    price: t("Từ 60.000.000₫", "From 60,000,000₫"),
    unit: t("báo giá theo dự án", "quoted per project"),
    summary: t(
      "Cho campaign nhiều ngày, có ngoại cảnh và ê-kíp mở rộng.",
      "For multi-day campaigns with location work and an extended crew.",
    ),
    includes: [
      t(
        "Nhiều ngày chụp, studio và ngoại cảnh",
        "Multiple shoot days, studio and location",
      ),
      t("Số frame theo thoả thuận", "Frame count agreed up front"),
      t(
        "Điều phối casting, styling, set design",
        "Casting, styling and set design coordinated",
      ),
      t(
        "Chỉnh sửa không giới hạn vòng trong phạm vi brief",
        "Unlimited revision rounds within the agreed brief",
      ),
      t(
        "Lịch bàn giao theo kế hoạch chiến dịch",
        "Delivery scheduled around the campaign plan",
      ),
    ],
  },
];

export const addOns = [
  {
    name: t("Người mẫu & casting", "Models & casting"),
    note: t("Báo giá theo hồ sơ", "Quoted per profile"),
  },
  {
    name: t("Stylist & trợ lý stylist", "Stylist & assistant"),
    note: t("Từ 4.000.000₫ / buổi", "From 4,000,000₫ / session"),
  },
  {
    name: t("Set design và đạo cụ", "Set design & props"),
    note: t("Từ 6.000.000₫ / buổi", "From 6,000,000₫ / session"),
  },
  {
    name: t("Video hậu trường", "Behind-the-scenes video"),
    note: t("Từ 8.000.000₫ / buổi", "From 8,000,000₫ / session"),
  },
  {
    name: t("Chụp ngoại cảnh ngoài TP.HCM", "Location work outside Ho Chi Minh City"),
    note: t("Phí di chuyển tính riêng", "Travel billed separately"),
  },
  {
    name: t("Bàn giao gấp trong 48 giờ", "Rush delivery in 48 hours"),
    note: t("Phụ thu 30%", "30% surcharge"),
  },
];

export const process = [
  {
    step: "01",
    name: t("Brief & báo giá", "Brief & quote"),
    body: t(
      "Bạn gửi mô tả sản phẩm, số lượng SKU hoặc số look, và mục đích sử dụng ảnh. Chúng tôi phản hồi báo giá trong vòng 24 giờ làm việc.",
      "You send the product, the number of SKUs or looks, and where the images will run. We come back with a quote within 24 working hours.",
    ),
  },
  {
    step: "02",
    name: t("Tiền kỳ", "Pre-production"),
    body: t(
      "Chốt moodboard, danh sách frame, lịch chụp và ê-kíp. Mọi thứ được duyệt trên giấy trước khi máy ảnh được bật.",
      "Moodboard, frame list, schedule and crew are locked. Everything is signed off on paper before a camera is switched on.",
    ),
  },
  {
    step: "03",
    name: t("Buổi chụp", "The shoot"),
    body: t(
      "Chụp theo đúng danh sách frame đã duyệt. Bạn có thể theo dõi trực tiếp trên màn hình tại studio hoặc từ xa.",
      "We shoot to the approved frame list. You can watch live on the studio monitor or remotely.",
    ),
  },
  {
    step: "04",
    name: t("Hậu kỳ", "Post-production"),
    body: t(
      "Chọn ảnh, chỉnh sáng và màu. Không áp filter làm lệch tông màu sản phẩm — màu trên ảnh là màu thật.",
      "Selection, exposure and colour. No filters that shift the product's tone — the colour on screen is the real colour.",
    ),
  },
  {
    step: "05",
    name: t("Bàn giao", "Delivery"),
    body: t(
      "Giao file theo đúng định dạng và quy tắc đặt tên bạn cần, kèm bản crop sẵn cho từng kênh.",
      "Files delivered in the formats and naming convention you need, with per-channel crops included.",
    ),
  },
];

export const principles = [
  {
    name: t("Tối giản", "Minimal"),
    body: t(
      "Loại bỏ mọi chi tiết không phục vụ sản phẩm. Nếu một đạo cụ không giúp bán hàng, nó không có mặt trong khung hình.",
      "Everything that doesn't serve the product comes out. If a prop doesn't help sell, it isn't in the frame.",
    ),
  },
  {
    name: t("Tinh tế", "Refined"),
    body: t(
      "Chỉn chu ở những chỗ ít ai để ý: nếp gấp cổ áo, vệt bụi trên men gốm, độ lệch nửa độ của nhãn dán.",
      "Care in the places nobody looks: the fold of a collar, dust on a glaze, a label half a degree off true.",
    ),
  },
  {
    name: t("Chuyên nghiệp", "Professional"),
    body: t(
      "Đúng deadline, đúng brief, đúng cam kết. Lịch bàn giao được chốt cùng lúc với báo giá.",
      "On deadline, on brief, on what was promised. The delivery date is fixed at the same time as the quote.",
    ),
  },
  {
    name: t("Điềm tĩnh", "Composed"),
    body: t(
      "Không phô trương trong cách làm việc và trong hình ảnh. Chúng tôi để hình ảnh tự lên tiếng.",
      "No showmanship in how we work or in what we make. We let the image speak.",
    ),
  },
  {
    name: t("Đương đại", "Contemporary"),
    body: t(
      "Cập nhật ngôn ngữ thị giác hiện tại, nhưng không chạy theo trào lưu sẽ cũ sau một mùa.",
      "Current in visual language, without chasing a trend that dates in a season.",
    ),
  },
];

export const faqs = [
  {
    q: t("Một buổi chụp mất bao lâu?", "How long is a shoot?"),
    a: t(
      "Gói nửa ngày là 4 giờ, gói trọn ngày là 8 giờ tại studio. Campaign nhiều ngày được lên lịch riêng theo kế hoạch chiến dịch.",
      "Half-day is four hours, full-day is eight hours in the studio. Multi-day campaigns are scheduled around the campaign plan.",
    ),
  },
  {
    q: t("Bao lâu thì nhận được ảnh?", "When do I get the images?"),
    a: t(
      "5 ngày làm việc với gói Essential, 7 ngày với gói Standard. Cần gấp hơn thì có tuỳ chọn bàn giao trong 48 giờ.",
      "Five working days on Essential, seven on Standard. If you need it faster, there is a 48-hour rush option.",
    ),
  },
  {
    q: t(
      "Studio có lo người mẫu và stylist không?",
      "Do you arrange models and stylists?",
    ),
    a: t(
      "Có. Casting, styling và set design là dịch vụ bổ sung, báo giá riêng theo yêu cầu của từng dự án.",
      "Yes. Casting, styling and set design are add-ons, quoted separately for each project.",
    ),
  },
  {
    q: t(
      "Tôi có được xem ảnh ngay trong buổi chụp không?",
      "Can I see the images during the shoot?",
    ),
    a: t(
      "Có. Ảnh hiện trực tiếp lên màn hình lớn tại studio để duyệt tại chỗ. Nếu bạn không có mặt, chúng tôi gửi bản xem trước theo từng nhóm frame.",
      "Yes. Frames appear live on a large monitor in the studio for approval on the spot. If you can't attend, we send previews group by group.",
    ),
  },
  {
    q: t("Bản quyền ảnh thuộc về ai?", "Who owns the images?"),
    a: t(
      "Bạn được toàn quyền sử dụng thương mại không giới hạn thời gian trên mọi kênh. DONLY giữ quyền đăng ảnh trong portfolio, trừ khi hai bên thoả thuận khác.",
      "You get unlimited commercial rights, in perpetuity, across every channel. DONLY retains the right to show the work in its portfolio unless agreed otherwise.",
    ),
  },
  {
    q: t("Studio có chụp ngoại cảnh không?", "Do you shoot on location?"),
    a: t(
      "Có. Ngoại cảnh trong TP.HCM đã bao gồm trong gói. Ngoài thành phố tính thêm chi phí di chuyển và lưu trú cho ê-kíp.",
      "Yes. Location work inside Ho Chi Minh City is included. Outside the city, crew travel and accommodation are billed on top.",
    ),
  },
];

export const stats = [
  { value: "6", label: t("Năm hoạt động", "Years running") },
  { value: "180+", label: t("Dự án đã giao", "Projects delivered") },
  { value: "40+", label: t("Thương hiệu đồng hành", "Brands worked with") },
  { value: "24h", label: t("Thời gian phản hồi báo giá", "Quote turnaround") },
];

export const positioning = [
  {
    term: t("Ngành", "Industry"),
    detail: t(
      "Nhiếp ảnh thương mại (Commercial Photography)",
      "Commercial photography",
    ),
  },
  {
    term: t("Chuyên môn", "Specialism"),
    detail: t(
      "Lookbook, Campaign, Product Photography",
      "Lookbook, campaign and product photography",
    ),
  },
  {
    term: t("Khách hàng", "Clients"),
    detail: t(
      "Thương hiệu thời trang, lifestyle, F&B và tiêu dùng",
      "Fashion, lifestyle, F&B and consumer brands",
    ),
  },
  {
    term: t("Điểm khác biệt", "What sets us apart"),
    detail: t(
      "Tối giản, black & white, ánh sáng tự nhiên và bố cục sạch — đối lập với phong cách rực rỡ, nhiều màu của số đông",
      "Minimal, black and white, natural light and clean composition — the opposite of the loud, saturated look most studios run",
    ),
  },
];

/*
  Ba khung lấy từ ba bộ khác nhau, dùng cho phần cuối trang About.

  Trước đây chỗ này là ba khung giữ chỗ trống mang nhãn "hậu trường". Studio chưa có ảnh
  hậu trường thật, mà ba ô xám trống cạnh nhau thì đọc ra như trang chưa dựng xong.
  Nên chỗ này đổi thành ba khung THẬT từ ba khách hàng khác nhau, và nhãn phần đó
  (about.btsLabel) cũng đổi theo cho đúng với thứ đang hiện — không gọi ảnh chụp
  sản phẩm là ảnh hậu trường.
*/
export const btsImages = [
  {
    src: "/project/stressmama/summer26-drop-01/A-02.jpg",
    ratio: "3:2",
    alt: t("Khung từ bộ Summer 26 — STRESSMAMA", "A frame from Summer 26 — STRESSMAMA"),
  },
  {
    src: "/project/dirtycoins/The%20Rolling%20Stones%2002/A-02.jpg",
    ratio: "3:2",
    alt: t(
      "Khung từ bộ The Rolling Stones — DIRTYCOINS",
      "A frame from The Rolling Stones — DIRTYCOINS",
    ),
  },
  {
    src: "/project/fiftysix/Racing/A-02.jpg",
    ratio: "3:2",
    alt: t("Khung từ bộ Racing — FIFTYSIX", "A frame from Racing — FIFTYSIX"),
  },
];

export const studioImage = {
  src: "/project/ameliee_official/Emberly/A-02.jpg",
  ratio: "4:5",
  alt: t("Khung từ bộ Emberly — AMELIEE", "A frame from Emberly — AMELIEE"),
};

export const mapImage = {
  ratio: "16:9",
  tone: 1,
  alt: t(
    "Bản đồ vị trí studio DONLY tại Quận 1, TP. Hồ Chí Minh",
    "Map showing the DONLY studio in District 1, Ho Chi Minh City",
  ),
};

// Dùng cho dải logo khách hàng — hiện là tên minh hoạ, thay bằng khách hàng thật khi có.
export const clients = [
  "AURE",
  "MASS.",
  "NGUYÊN",
  "BÊN",
  "LINH LAM",
  "VELA",
  "OSMANT",
  "TÀN",
];
