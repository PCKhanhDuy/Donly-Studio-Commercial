"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

/*
  Xem ảnh toàn màn hình.

  Đây là thứ một trang portfolio ảnh bắt buộc phải có mà trước đó còn thiếu: bấm vào bất kỳ
  ảnh nào là nó mở ra ở kích thước lớn nhất màn hình cho phép, chuyển ảnh bằng phím mũi tên
  hoặc vuốt, đóng bằng Esc. Người xem không phải rời trang để nhìn kỹ một tấm ảnh.

  Cách nối dây: trang (server component) tự đánh số thứ tự cho từng ảnh CÓ `src` rồi truyền
  xuống danh sách `slides`. Mỗi ảnh được bọc trong <LightboxTrigger index={...}>. Ảnh
  placeholder không có src thì không có index, và trigger tự động trở thành một thẻ div
  bình thường — không bấm được, không con trỏ pointer, đúng như mong đợi.

  Giao diện lightbox được ép về đúng bảng màu: nền Donly Black, chữ trắng tinh, không bo góc.
*/

const LightboxContext = createContext(null);

export function LightboxProvider({ slides = [], children }) {
  const [index, setIndex] = useState(-1);

  const value = useMemo(
    () => ({ open: setIndex, enabled: slides.length > 0 }),
    [slides.length],
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter, Zoom]}
        carousel={{ finite: false, padding: 0, spacing: "24px" }}
        animation={{ fade: 320, swipe: 420 }}
        controller={{ closeOnBackdropClick: true }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        captions={{ showToggle: false, descriptionTextAlign: "start" }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        styles={{
          container: { backgroundColor: "rgba(13, 13, 13, 0.97)" },
          captionsTitle: {
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          },
          counter: {
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            padding: "1.25rem",
          },
        }}
      />
    </LightboxContext.Provider>
  );
}

/*
  Bọc quanh một ảnh để bấm vào là mở lightbox.
  Không có `index` (ảnh placeholder) thì render thẳng ra div, không gắn sự kiện nào.
*/
export function LightboxTrigger({ index, label, className = "", children }) {
  const context = useContext(LightboxContext);

  if (!context?.enabled || typeof index !== "number") {
    return <div className={className}>{children}</div>;
  }

  /*
    KHÔNG đặt w-full ở đây. Trigger này được dùng cả trong lưới (cần rộng hết ô) lẫn
    trong dải flex ngang (chiều rộng phải do chính tấm ảnh quyết định). Ép w-full ở lớp
    nền từng làm dải ngang phình rộng bằng cả khung chứa cho mỗi ảnh — nơi nào cần
    rộng hết thì tự truyền "w-full" qua className.
  */
  return (
    <button
      type="button"
      onClick={() => context.open(index)}
      aria-label={label}
      className={`group block cursor-zoom-in text-left ${className}`}
    >
      {children}
    </button>
  );
}
