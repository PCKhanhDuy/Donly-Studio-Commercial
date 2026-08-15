/*
  Chuỗi giao diện tiếng Việt.
  Nội dung dài (mô tả dự án, dịch vụ, FAQ) không nằm ở đây mà nằm cạnh dữ liệu
  trong src/lib/*.js dưới dạng t("vi", "en") — xem src/i18n/t.js.

  File này và en.js phải luôn có CÙNG bộ khoá.
*/
const vi = {
  common: {
    skipNav: "Bỏ qua điều hướng",
    homeAria: "về trang chủ",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    scroll: "Cuộn",
    view: "Xem",
    previous: "Ảnh trước",
    next: "Ảnh sau",
    contact: "Liên hệ",
    viewWork: "Xem dự án",
    viewAll: "Xem toàn bộ",
    details: "Chi tiết",
    getQuote: "Nhận báo giá",
    bookShoot: "Đặt lịch chụp",
    languageLabel: "Ngôn ngữ",
    switchLanguage: "Switch to English",
    studioCommercial: "Studio Commercial",
  },

  cta: {
    label: "Bắt đầu dự án",
    title: "Kể tôi nghe bạn cần chụp gì.",
    lead: "Gửi mô tả sản phẩm, số lượng SKU hoặc số look và mục đích sử dụng ảnh. Chúng tôi phản hồi báo giá trong vòng 24 giờ làm việc.",
  },

  home: {
    metaTitle: "Studio Commercial",
    statementLabel: "Studio",
    statement:
      "Chúng tôi sản xuất hình ảnh thương mại cho thương hiệu thời trang, lifestyle và tiêu dùng. Hình ảnh không cần cầu kỳ để tạo hiệu ứng — nó cần chính xác, có chủ đích, và phục vụ đúng mục tiêu bán hàng của bạn.",
    aboutLink: "Về DONLY",
    servicesLabel: "Dịch vụ",
    servicesTitle: "Ba việc, làm cho tới.",
    servicesLead:
      "Mỗi loại hình có một tỷ lệ khung, một cách đánh sáng và một tiêu chuẩn bàn giao riêng. Chúng tôi không gộp chung.",
    bannerAlt:
      "Tuyển tập ảnh lookbook DONLY Studio Commercial: sáu khung hình thời trang chụp ngoại cảnh",
    featuredLabel: "Dự án nổi bật",
    galleryLabel: "Thư viện",
    galleryTitle: "Kéo để xem.",
    worksLabel: "Dự án",
    worksTitle: "Một vài việc gần đây.",
    quoteNote:
      "Mỗi frame trong buổi chụp đều có lý do tồn tại, được duyệt trên giấy trước khi máy ảnh được bật. Không có frame nào chụp cho vui.",
    processLabel: "Quy trình",
    processTitle: "Năm bước, không bước nào bị bỏ qua.",
    clientsLabel: "Thương hiệu đã đồng hành",
  },

  works: {
    metaTitle: "Works",
    metaDescription:
      "Tuyển tập dự án lookbook, campaign và ảnh sản phẩm DONLY Studio Commercial đã thực hiện cho các thương hiệu thời trang, lifestyle và tiêu dùng.",
    title: "Việc chúng tôi đã làm.",
    lead: "Mỗi dự án bên dưới có một bài toán thương mại cụ thể phía sau. Mở ra để xem brief, cách xử lý và kết quả bàn giao.",
    projectsCount: "dự án",
    clientsCount: "khách hàng",
    collections: "collection",
    frames: "khung",
    industry: "Ngành hàng",
    year: "Năm",
    clientCol: "Khách hàng",
    allCollections: "Tất cả collection",
    backToClients: "Tất cả khách hàng",
    filterAria: "Lọc theo loại hình",
    viewAria: "Chọn cách xem",
    viewList: "Danh sách",
    viewGrid: "Lưới",
    ctaLabel: "Dự án tiếp theo",
    ctaTitle: "Bộ ảnh sắp tới của bạn có thể nằm ở đây.",
  },

  work: {
    client: "Client",
    type: "Loại hình",
    year: "Năm",
    location: "Địa điểm",
    brief: "Bài toán",
    approach: "Cách chúng tôi làm",
    result: "Kết quả",
    bts: "Hậu trường",
    credits: "Credits",
    nextProject: "Dự án tiếp theo",
    notFoundTitle: "Không tìm thấy dự án",
    ctaLabel: "Dự án của bạn",
    ctaTitle: "Bạn cần một bộ ảnh như thế này?",
  },

  services: {
    metaTitle: "Services",
    metaDescription:
      "Dịch vụ chụp Lookbook, Campaign và Product của DONLY Studio Commercial — phạm vi bàn giao, bảng gói và quy trình làm việc.",
    label: "Dịch vụ",
    lead: "Ba loại hình, ba tiêu chuẩn bàn giao khác nhau. Chọn đúng loại hình là bước đầu tiên để bộ ảnh dùng được đúng chỗ bạn cần.",
    deliverables: "Bàn giao",
    bestFor: "Phù hợp với:",
    pricingLabel: "Báo giá",
    pricingTitle: "Ba gói, giá minh bạch.",
    pricingLead:
      "Giá dưới đây đã bao gồm studio, thiết bị, ê-kíp chụp và hậu kỳ. Chưa bao gồm người mẫu, stylist và đạo cụ.",
    popular: "Phổ biến",
    addOns: "Dịch vụ bổ sung",
    processLabel: "Quy trình",
    processTitle: "Từ brief tới file bàn giao.",
    faqLabel: "Câu hỏi thường gặp",
    faqTitle: "Những điều khách hay hỏi.",
    ctaLabel: "Báo giá",
    ctaTitle: "Gửi brief, nhận báo giá trong 24 giờ.",
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "DONLY Studio Commercial — studio nhiếp ảnh thương mại tối giản, làm việc bằng ánh sáng tự nhiên, bố cục sạch và màu đúng thật.",
    label: "Về studio",
    lead: "DONLY ra đời từ mong muốn đơn giản hoá quá trình sản xuất hình ảnh thương mại. Tên gọi mang đúng tinh thần đó: chỉ giữ lại những gì cần thiết — ánh sáng đúng, bố cục đúng, thông điệp đúng.",
    storyLabel: "Câu chuyện",
    storyLead:
      "Phần lớn ảnh thương mại hỏng không phải vì thiếu ý tưởng, mà vì thừa thứ không cần thiết.",
    storyBody: [
      "Chúng tôi bắt đầu với một quan sát đơn giản: khách hàng của các thương hiệu không mua hiệu ứng, họ mua sản phẩm. Một bộ ảnh nhiều lớp filter và đạo cụ có thể đẹp trên feed, nhưng lại làm người mua khó hình dung món hàng thật trông ra sao.",
      "Vì vậy DONLY chọn cách làm ngược lại: ánh sáng tự nhiên hoặc mô phỏng tự nhiên, tương phản vừa phải, màu đúng thật, bố cục nhiều khoảng âm. Trang phục và sản phẩm là thứ duy nhất được phép có màu trong khung hình.",
      "Cách làm này khiến bộ ảnh của bạn sống lâu hơn một mùa, dùng được đồng thời trên website, social và ấn phẩm in, và quan trọng nhất — bán được hàng.",
    ],
    studioCaption: "AMELIEE — bộ Emberly",
    viewWorks: "Xem dự án đã làm",
    missionLabel: "Sứ mệnh",
    missionText:
      "Giúp thương hiệu kể câu chuyện sản phẩm bằng hình ảnh sắc nét, nhất quán và có sức ảnh hưởng thương mại thực sự.",
    missionNote:
      "Không chỉ đẹp về thẩm mỹ, mà còn hiệu quả về mặt bán hàng và truyền thông.",
    visionLabel: "Tầm nhìn",
    visionText:
      "Trở thành studio được các thương hiệu tin tưởng chọn đầu tiên khi cần một bộ ảnh thương mại nhất quán.",
    visionNote:
      "Nhất quán ở đây là dùng được trên mọi nền tảng: website, social và in ấn, không cần chụp lại cho từng kênh.",
    principlesLabel: "Nguyên tắc",
    principlesTitle: "Năm điều chúng tôi không thoả hiệp.",
    positioningLabel: "Định vị",
    positioningTitle: "Chúng tôi đứng ở đâu.",
    btsLabel: "Một vài khung",
    ctaLabel: "Làm việc cùng nhau",
    ctaTitle: "Chúng tôi nhận dự án cho mùa tới.",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Đặt lịch chụp lookbook, campaign hoặc ảnh sản phẩm cùng DONLY Studio Commercial. Phản hồi báo giá trong 24 giờ làm việc.",
    label: "Liên hệ",
    title: "Đặt lịch chụp.",
    lead: "Điền form bên dưới hoặc gửi email trực tiếp. Càng mô tả rõ, báo giá càng sát — chúng tôi không gửi báo giá chung chung.",
    directLabel: "Liên hệ trực tiếp",
    studioLabel: "Studio",
    followLabel: "Theo dõi",
    checklistLabel: "Để báo giá nhanh, gửi kèm",
    checklist: [
      "Loại hình cần chụp: lookbook, campaign hay product",
      "Số lượng: bao nhiêu SKU hoặc bao nhiêu look",
      "Ảnh dùng cho kênh nào: website, social, in ấn",
      "Mốc thời gian cần nhận file",
    ],
    pricingLink: "Xem bảng gói và giá",
    mapLabel: "Đường tới studio",
    mapNote: "Chỗ giữ bản đồ — gắn Google Maps embed hoặc ảnh chụp bản đồ tại đây.",
  },

  form: {
    name: "Tên bạn *",
    brand: "Thương hiệu *",
    email: "Email *",
    phone: "Số điện thoại",
    service: "Loại hình chụp *",
    servicePlaceholder: "Chọn loại hình",
    date: "Ngày chụp mong muốn",
    budget: "Ngân sách dự kiến",
    message: "Mô tả dự án *",
    messagePlaceholder:
      "Bạn cần chụp gì, bao nhiêu SKU hoặc bao nhiêu look, ảnh dùng cho kênh nào?",
    serviceOptions: {
      lookbook: "Lookbook",
      campaign: "Campaign",
      product: "Product",
      khac: "Khác / chưa rõ",
    },
    budgetOptions: {
      "": "Chưa xác định",
      "duoi-15": "Dưới 15 triệu",
      "15-30": "15 – 30 triệu",
      "30-60": "30 – 60 triệu",
      "tren-60": "Trên 60 triệu",
    },
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi…",
    responseNote: "Phản hồi trong 24 giờ làm việc.",
    sentLabel: "Đã gửi",
    sentTitle: "Cảm ơn bạn.",
    successMessage:
      "Đã nhận yêu cầu. Chúng tôi phản hồi báo giá trong vòng 24 giờ làm việc.",
    errors: {
      name: "Vui lòng nhập tên của bạn.",
      brand: "Vui lòng nhập tên thương hiệu.",
      emailRequired: "Vui lòng nhập email.",
      emailInvalid: "Email chưa đúng định dạng.",
      service: "Vui lòng chọn loại hình chụp.",
      messageShort: "Mô tả cần ít nhất 20 ký tự để chúng tôi báo giá chính xác.",
      summary: "Còn vài chỗ cần bổ sung.",
    },
  },

  footer: {
    quoteLabel: "Nhận báo giá",
    navigation: "Điều hướng",
    services: "Dịch vụ",
    studio: "Studio",
    follow: "Theo dõi",
    rights: "Bảo lưu mọi quyền.",
  },

  notFound: {
    metaTitle: "Không tìm thấy trang",
    label: "Lỗi 404",
    title: "Trang này không tồn tại.",
    body: "Có thể đường dẫn đã đổi hoặc dự án bạn tìm đã được gỡ khỏi portfolio.",
    home: "Về trang chủ",
    works: "Xem dự án",
  },
};

export default vi;
