"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/logo";
import LanguageSwitch from "@/components/language-switch";
import { Close, Menu } from "@/components/icons";
import { EASE, EASE_SOFT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { nav, site } from "@/lib/site";

/*
  Thanh điều hướng.

  Ba trạng thái:
    · overlay  — trên trang có hero tối (trang chủ, case study), header trong suốt, chữ trắng tinh
    · solid    — sau khi cuộn quá 24px, nền trắng + đường kẻ mảnh
    · ẩn       — khi người dùng cuộn XUỐNG quá 240px, header trượt lên khỏi màn hình để trả lại
                 toàn bộ chiều cao cho hình ảnh; cuộn NGƯỢC lên là nó quay lại ngay

  Trạng thái ẩn/hiện được tính trong callback của motion value (không phải trong effect),
  nên không tạo vòng render thừa.
*/

/*
  Trang chủ và trang case study đều mở đầu bằng một tấm ảnh tràn hết màn hình,
  nên header nằm đè lên ảnh và không có nền. Cuộn xuống thì nó đặc lại.
*/
function isOverlayRoute(pathname, locale) {
  return (
    pathname === `/${locale}` ||
    new RegExp(`^/${locale}/works/[^/]+$`).test(pathname)
  );
}

export default function SiteHeader({ locale, dict }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 240 && !open);
  });

  const overlay = isOverlayRoute(pathname, locale) && !scrolled;

  // Khoá cuộn nền khi menu mobile mở
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !reduced ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-500 ease-soft ${
        overlay ? "bg-transparent" : "border-b border-rule bg-surface/85 backdrop-blur-md"
      }`}
    >
      {/*
        Khi header nằm đè lên ảnh, một lớp chuyển sắc mảnh từ trên xuống giữ cho menu
        luôn đọc được — kể cả trên ảnh nền sáng như tường bê tông hay trời trắng.
        Không có nó thì chữ trắng chìm hẳn vào ảnh.
      */}
      {overlay ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/55 to-transparent"
        />
      ) : null}

      <div className="relative mx-auto flex h-16 max-w-frame items-center justify-between px-5 md:h-20 md:px-10 lg:px-16 xl:px-24">
        <Link
          href={`/${locale}`}
          aria-label={`${site.fullName} — ${dict.common.homeAria}`}
          className="shrink-0"
        >
          <Logo
            shape="full"
            tone="paper"
            className="h-4 w-auto md:h-5"
            preload
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Main" className="flex items-center gap-10">
            {nav.map((item) => {
              const href = `/${locale}${item.href}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`font-ui text-sm font-medium tracking-[0.14em] uppercase ${
                    active ? "border-b border-current pb-1" : "underline-draw"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-l border-paper/25 pl-8">
            <LanguageSwitch locale={locale} tone="paper" />
          </div>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <LanguageSwitch locale={locale} tone="paper" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.common.openMenu}
            aria-expanded={open}
            className="-mr-2 p-2"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Menu mobile — rèm đen phủ từ trên xuống, các mục lần lượt trồi lên */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={reduced ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduced ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-surface text-paper md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo shape="full" tone="paper" className="h-4 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.common.closeMenu}
                className="-mr-2 p-2"
              >
                <Close />
              </button>
            </div>

            <motion.nav
              aria-label="Main"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
              }}
              className="flex flex-1 flex-col justify-center gap-8 px-5"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: reduced ? {} : { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-bold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE_SOFT }}
              className="border-t border-paper/15 px-5 py-8"
            >
              <div className="flex items-center justify-between gap-6">
                <p className="label text-paper/50">{dict.common.contact}</p>
                <LanguageSwitch locale={locale} tone="paper" />
              </div>
              <a href={`mailto:${site.email}`} className="mt-3 block text-lg">
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="mt-1 block text-lg">
                {site.phone}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
