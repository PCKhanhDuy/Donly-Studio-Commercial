# DONLY Studio Commercial

Website giới thiệu studio nhiếp ảnh thương mại — lookbook, campaign, ảnh sản phẩm.
Hai ngôn ngữ Việt / Anh, nền tối, ảnh dẫn dắt.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · JavaScript

## Chạy ở máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000 — nó tự chuyển sang `/vi`.

## Thêm bộ ảnh mới

Ảnh **không** khai trong code. Cứ thả đúng thư mục là site tự nhận:

```
public/project/<tên-khách-hàng>/<tên-bộ-chụp>/
```

Tên file theo quy ước:

| Tên | Là gì |
|---|---|
| `A-00.jpg` | Ảnh thumb của bộ — bản **có watermark**, dùng làm mặt của collection ở mọi danh sách |
| `A-01.jpg`, `A-02.jpg`… | Các khung còn lại |
| `B-01.jpg`, `C-01.jpg`… | Chữ cái dùng để chia nhóm trong cùng một bộ (theo look, theo bối cảnh…) |

Ảnh `A-00` nên xuất ở **1800×2400 (tỷ lệ 3:4)**. Lưới ảnh trên site dùng chung tỷ lệ
3:4, nên ảnh 3:4 khi xén sẽ mất hai bên chứ không mất đáy — watermark nằm sát đáy
khung vẫn hiện trọn. Xuất sai tỷ lệ thì watermark bị cắt mất chữ đầu và chữ cuối.

Đặt tên chưa đúng thì chạy lệnh dưới, nó chuẩn hoá giúp mà **giữ nguyên chữ và số**
đang có (không đánh số lại, không phá cách chia nhóm):

```bash
npm run format:names          # xem trước, không đụng file
npm run format:names:apply    # đổi thật
```

Rồi quét lại thư mục ảnh:

```bash
npm run scan:images
```

Lệnh này đọc kích thước thật từ header từng file rồi ghi ra
`src/lib/generated/shoots.json`. Nó cũng chạy tự động trước mỗi lần `npm run build`,
nên khi deploy không cần nhớ chạy tay.

Phần **chữ** của từng bộ (tiêu đề, mô tả, năm, địa điểm) nằm ở
`src/lib/shoots-copy.js`, tra theo slug thư mục. Chưa viết chữ thì bộ ảnh vẫn hiện
bình thường với nội dung mặc định.

## Cấu trúc

```
/works                          danh sách khách hàng
/works/<khách>                  các collection của khách đó
/works/<khách>/<collection>     ảnh của một collection
```

Khách hàng là đơn vị hiển thị, collection nằm bên trong — đúng cách studio làm việc:
một khách có nhiều buổi chụp khác nhau.

## Deploy

Đẩy lên nhánh `main` là Vercel tự build và cập nhật.

Khi đã có tên miền riêng, thêm biến môi trường trong Vercel:

```
NEXT_PUBLIC_SITE_URL = https://ten-mien-cua-ban
```

Biến này quyết định đường dẫn trong `sitemap.xml`, thẻ canonical và ảnh preview khi
chia sẻ link. Không đặt thì site tự dùng địa chỉ `.vercel.app` mà Vercel cấp.
