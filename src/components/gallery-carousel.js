"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { LightboxProvider, LightboxTrigger } from "@/components/lightbox";
import { ArrowLeft, ArrowRight } from "@/components/icons";

/*
  Dải ảnh lookbook kéo ngang.

  VÌ SAO KHÔNG DÙNG "GHÌM MÀN HÌNH RỒI CUỘN NGANG":
  cách đó phải kéo chiều cao section lên bằng cả quãng đường ngang, rồi ghìm khung nhìn lại.
  Chỉ cần một phần tử bên trong tính sai chiều rộng là quãng đường phình ra vô tận, và
  người dùng phải cuộn qua mấy màn hình trống mới thoát khỏi section. Nó cũng cướp mất
  thao tác cuộn dọc quen thuộc.

  Ở đây dùng carousel kéo tay: chiều cao section cố định và đoán được, cuộn dọc của trang
  không bị đụng tới, kéo bằng chuột hoặc vuốt bằng ngón đều được, và có hai nút mũi tên
  cho người dùng bàn phím. Bấm vào ảnh vẫn mở lightbox như cũ.
*/
export default function GalleryCarousel({ images, slides, viewLabel, prevLabel, nextLabel }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback((api) => {
    if (!api) return;
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handler = () => sync(emblaApi);
    handler();

    emblaApi.on("scroll", handler);
    emblaApi.on("reInit", handler);
    emblaApi.on("select", handler);

    return () => {
      emblaApi.off("scroll", handler);
      emblaApi.off("reInit", handler);
      emblaApi.off("select", handler);
    };
  }, [emblaApi, sync]);

  return (
    <LightboxProvider slides={slides}>
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Lề trái/phải khớp với Container để ảnh đầu tiên thẳng hàng với chữ phía trên */}
        <div className="flex gap-6 px-5 md:gap-8 md:px-10 lg:px-16 xl:px-24">
          {images.map((image, index) => (
            <LightboxTrigger
              key={`${image.src}-${index}`}
              index={index}
              label={`${viewLabel} — ${image.alt ?? ""}`}
              className="shrink-0"
            >
              {/*
                Ảnh thật mang kích thước pixel thật (do trình quét đọc từ file); ảnh giữ chỗ
                chỉ có tỷ lệ dạng "4:5". Ưu tiên kích thước thật để không tấm nào bị xén.
              */}
              <div
                className="relative h-[42vh] overflow-hidden md:h-[52vh] lg:h-[58vh]"
                style={{
                  aspectRatio:
                    image.width && image.height
                      ? `${image.width} / ${image.height}`
                      : (image.ratio ?? "4:5").replace(":", " / "),
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
                />
              </div>
            </LightboxTrigger>
          ))}
        </div>
      </div>

      {/*
        Thanh điều khiển: bộ đếm — chú thích ảnh đang xem — thanh tiến độ — hai nút.
        Bộ đếm và chú thích là thứ biến một dải ảnh trôi thành một bộ ảnh có thứ tự,
        cho người xem biết mình đang ở đâu và đang nhìn khung nào.
      */}
      <div className="mx-auto mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 px-5 md:flex-nowrap md:px-10 lg:px-16 xl:px-24">
        <span className="label shrink-0 tabular-nums text-fg">
          {String(selected + 1).padStart(2, "0")}
          <span className="text-fg-mute"> / {String(images.length).padStart(2, "0")}</span>
        </span>

        <span className="label hidden shrink-0 text-fg-mute lg:block">
          {images[selected]?.caption || images[selected]?.alt || ""}
        </span>

        <div className="h-px flex-1 bg-paper/20">
          <div
            className="h-px origin-left bg-paper transition-transform duration-200 ease-linear"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={prevLabel}
            className="grid size-12 place-items-center border border-paper/30 transition-colors duration-300 ease-soft hover:border-paper hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-25"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label={nextLabel}
            className="grid size-12 place-items-center border border-paper/30 transition-colors duration-300 ease-soft hover:border-paper hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-25"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </LightboxProvider>
  );
}
