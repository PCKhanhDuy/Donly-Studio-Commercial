"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  DANH MỤC KHÁCH HÀNG — dạng BẢNG, đọc từ trên xuống.

  Bản trước mỗi khách hàng chiếm gần một màn hình: tên cỡ 48px, rồi một lưới bốn ảnh bìa
  kèm ba dòng chú thích dưới mỗi ảnh. Bốn khách là bốn màn hình cuộn, và vì khối nào cũng
  giống khối nào nên không còn cảm giác đây là một danh mục — chỉ là ảnh xếp mãi.

  Ở đây mỗi khách hàng là MỘT DÒNG, các cột thẳng hàng nhau như một bảng mục lục:
  số thứ tự · tên · ngành · số collection · số khung · năm. Nhìn một lần là nắm được
  studio có bao nhiêu khách và mỗi khách làm bao nhiêu bộ.

  Ảnh không biến mất mà chuyển thành ẢNH XEM TRƯỚC: rê chuột vào dòng nào thì bìa của
  khách đó hiện ở cột bên phải. Ở khổ hẹp không có chuột nên các collection nằm sẵn thành
  một hàng thẻ nhỏ ngay dưới mỗi dòng.
*/
export default function ClientIndex({ clients, labels, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(null);

  const preview = clients.find((client) => client.slug === hovered) ?? clients[0];

  return (
    <div className={`lg:grid lg:grid-cols-12 lg:gap-10 ${className}`}>
      {/* CỘT DANH MỤC */}
      <div className="lg:col-span-9">
        {/*
          Hàng tiêu đề cột — cho biết mỗi cột là gì, không phải chữ trang trí.
          Số collection và số khung tách thành HAI cột riêng, mỗi ô chỉ còn một con số.
          Gộp chung thành "3 collection · 15 khung" thì ở cột hẹp nó xuống dòng và
          cả bảng mất hàng lối.
        */}
        <div className="label hidden border-b border-rule pb-3 text-fg-mute md:grid md:grid-cols-12 md:gap-6">
          <span className="col-span-1">#</span>
          <span className="col-span-4">{labels.client}</span>
          <span className="col-span-2">{labels.industry}</span>
          <span className="col-span-2 text-right">{labels.collections}</span>
          <span className="col-span-1 text-right">{labels.frames}</span>
          <span className="col-span-2 text-right">{labels.year}</span>
        </div>

        <ul className="border-b border-rule md:border-b-0">
          {clients.map((client, index) => (
            <motion.li
              key={client.slug}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
              onMouseEnter={() => setHovered(client.slug)}
              className="border-t border-rule first:border-t-0 md:border-t md:first:border-t-0"
            >
              <Link
                href={client.href}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-5 md:gap-x-6 md:py-6"
              >
                <span className="label col-span-2 text-fg-mute tabular-nums md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="col-span-8 font-display text-xl leading-none font-bold tracking-tight md:col-span-4 md:text-2xl">
                  <span className="underline-draw">{client.name}</span>
                </h3>

                {/*
                  Khổ hẹp: mũi tên khép lại hàng đầu (số · tên · mũi tên), rồi hàng hai là
                  ngành và cụm số liệu. Khổ rộng: mũi tên về chung ô với năm ở cuối bảng.
                  Chia hai như vậy vì 12 cột ở màn hình điện thoại không đủ cho sáu cột dữ
                  liệu — nhồi hết vào một hàng thì cột năm bị đẩy tràn xuống dòng riêng.
                */}
                <span className="col-span-2 flex justify-end md:hidden">
                  <ArrowRight className="size-4 shrink-0 text-fg-mute" />
                </span>

                <p className="col-span-10 col-start-3 font-body text-sm text-fg/55 md:col-span-2 md:col-start-auto">
                  {client.industry}
                </p>

                {/* Cụm số liệu ăn trọn một hàng riêng ở khổ hẹp; nhét vào 4 cột thì nó gãy làm ba dòng */}
                <p className="label col-span-10 col-start-3 text-fg-mute tabular-nums md:hidden">
                  {client.collectionCount} {labels.collections} · {client.frameCount}{" "}
                  {labels.frames} · {client.since}
                </p>

                <p className="label hidden text-right text-fg-mute tabular-nums md:col-span-2 md:block">
                  {client.collectionCount}
                </p>
                <p className="label hidden text-right text-fg-mute tabular-nums md:col-span-1 md:block">
                  {client.frameCount}
                </p>

                <span className="hidden items-center justify-end gap-3 md:col-span-2 md:flex">
                  <span className="label text-fg-mute tabular-nums">{client.since}</span>
                  <ArrowRight className="size-4 shrink-0 text-fg-mute transition-all duration-500 ease-donly group-hover:translate-x-1 group-hover:text-fg" />
                </span>
              </Link>

              {/* Các collection của khách — hàng thẻ nhỏ, chỉ hiện ở khổ không có chuột */}
              <div className="-mx-1 flex gap-2 overflow-x-auto pb-5 lg:hidden">
                {client.collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={collection.href}
                    className="group w-32 shrink-0 px-1"
                  >
                    <span className="relative block aspect-3/4 overflow-hidden bg-panel">
                      <Image
                        src={collection.cover.src}
                        alt=""
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </span>
                    <span className="mt-2 block truncate font-ui text-xs tracking-tight text-fg/70">
                      {collection.title}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CỘT ẢNH XEM TRƯỚC — chỉ có ở khổ rộng, nơi có chuột để rê */}
      <div className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-3/4 overflow-hidden bg-panel">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={preview.slug}
                initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={preview.cover.src}
                  alt=""
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="label mt-4 flex items-baseline justify-between gap-4 text-fg-mute">
            <span>{preview.name}</span>
            <span className="tabular-nums">
              {preview.collectionCount} {labels.collections}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
