import Link from "next/link";
import Logo from "@/components/logo";
import { signOut } from "@/lib/actions/admin";

/*
  Khung chung của khu quản trị: nhận diện, điều hướng giữa các mục, nút đăng xuất.
  Tách ra để thêm mục mới chỉ phải sửa một chỗ, và mọi trang admin chắc chắn giống nhau.
*/

const SECTIONS = [
  { href: "/admin", label: "Hộp thư đặt lịch" },
  { href: "/admin/noi-dung", label: "Nội dung" },
];

export default function AdminShell({ current, children }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin">
          <Logo shape="full" tone="paper" className="h-4 w-auto" preload />
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="border border-rule px-4 py-2 font-ui text-sm text-fg/70 transition-colors duration-300 ease-soft hover:border-fg hover:text-fg"
          >
            Đăng xuất
          </button>
        </form>
      </header>

      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-4">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            aria-current={current === section.href ? "page" : undefined}
            className={`label transition-colors duration-300 ease-soft ${
              current === section.href ? "text-fg" : "text-fg-mute hover:text-fg/80"
            }`}
          >
            {section.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
