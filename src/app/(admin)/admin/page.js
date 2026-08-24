import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import { isSignedIn } from "@/lib/admin/auth";
import { hasDatabase } from "@/lib/admin/db";
import { countByStatus, listBookings } from "@/lib/admin/bookings";
import { signOut } from "@/lib/actions/admin";
import BookingRow from "@/components/admin/booking-row";
import SetupNotice from "@/components/admin/setup-notice";

export const metadata = { title: "Hộp thư đặt lịch — Quản trị DONLY" };

/*
  Dữ liệu ở đây thay đổi theo từng yêu cầu gửi tới, và trang lại đọc cookie phiên đăng
  nhập, nên không được để Next dựng sẵn rồi phục vụ bản cache.
*/
export const dynamic = "force-dynamic";

const TABS = [
  { key: "new", label: "Mới" },
  { key: "read", label: "Đã đọc" },
  { key: "archived", label: "Đã lưu trữ" },
  { key: "all", label: "Tất cả" },
];

export default async function AdminPage({ searchParams }) {
  if (!(await isSignedIn())) redirect("/admin/login");

  const params = await searchParams;
  const requested = typeof params?.tab === "string" ? params.tab : "new";
  const tab = TABS.some((t) => t.key === requested) ? requested : "new";

  const [bookings, counts] = await Promise.all([listBookings(tab), countByStatus()]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-6">
        <div>
          <Logo shape="full" tone="paper" className="h-4 w-auto" preload />
          <p className="label mt-3 text-fg-mute">Hộp thư đặt lịch</p>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="border border-rule px-4 py-2 font-ui text-sm text-fg/70 transition-colors duration-300 ease-soft hover:border-fg hover:text-fg"
          >
            Đăng xuất
          </button>
        </form>
      </header>

      {hasDatabase ? null : <SetupNotice className="mt-8" />}

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-rule pb-4">
        {TABS.map((item) => (
          <a
            key={item.key}
            href={`/admin?tab=${item.key}`}
            aria-current={tab === item.key ? "page" : undefined}
            className={`label transition-colors duration-300 ease-soft ${
              tab === item.key ? "text-fg" : "text-fg-mute hover:text-fg/80"
            }`}
          >
            {item.label}
            <span className="ml-2 tabular-nums opacity-60">{counts[item.key] ?? 0}</span>
          </a>
        ))}
      </nav>

      {bookings.length === 0 ? (
        <p className="mt-12 font-body text-sm text-fg-mute">
          {hasDatabase
            ? "Chưa có yêu cầu nào trong mục này."
            : "Kết nối database xong thì các yêu cầu gửi từ trang liên hệ sẽ hiện ở đây."}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-rule border-b border-rule">
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </ul>
      )}
    </div>
  );
}
