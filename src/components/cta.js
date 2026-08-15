import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/*
  Nút và liên kết hành động.

  Guideline: không có màu accent — CTA chỉ đảo đen/trắng, UI phẳng, không bo góc, không đổ bóng.
  Khi hover, một lớp màu dâng lên từ đáy nút trong 500ms thay vì đổi màu đột ngột.

  Site nền tối nên MẶC ĐỊNH là nút trắng chữ đen (`tone="paper"`).
  Trên các mảng đảo sáng (footer, dải CTA trắng) thì truyền `tone="ink"`.
*/

const VARIANTS = {
  "solid-paper": {
    base: "border-paper bg-paper text-ink group-hover:text-paper",
    wipe: "bg-ink",
  },
  "outline-paper": {
    base: "border-paper/45 text-paper group-hover:text-ink group-hover:border-paper",
    wipe: "bg-paper",
  },
  "solid-ink": {
    base: "border-ink bg-ink text-paper group-hover:text-ink",
    wipe: "bg-paper",
  },
  "outline-ink": {
    base: "border-ink/40 text-ink group-hover:text-paper group-hover:border-ink",
    wipe: "bg-ink",
  },
};

export function CtaLink({
  href,
  variant = "solid",
  tone = "paper",
  className = "",
  children,
}) {
  const style = VARIANTS[`${variant}-${tone}`] ?? VARIANTS["solid-paper"];

  return (
    <Link
      href={href}
      className={`group relative isolate inline-flex items-center gap-3 overflow-hidden border px-7 py-4 font-ui text-sm tracking-wide transition-colors duration-400 ease-soft ${style.base} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-donly group-hover:scale-y-100 ${style.wipe}`}
      />
      {children}
      <ArrowRight className="size-4 transition-transform duration-400 ease-donly group-hover:translate-x-1" />
    </Link>
  );
}

export function ArrowLink({ href, className = "", children }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-ui text-sm transition-opacity duration-300 ease-soft hover:opacity-65 ${className}`}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-400 ease-donly group-hover:translate-x-1.5" />
    </Link>
  );
}
