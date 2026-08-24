import Link from "next/link";
import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin/auth";
import { hasDatabase } from "@/lib/admin/db";
import { clientKey, collectionKey, getOverrides } from "@/lib/admin/content";
import { clients } from "@/lib/works";
import AdminShell from "@/components/admin/admin-shell";
import SetupNotice from "@/components/admin/setup-notice";

export const metadata = { title: "Nội dung — Quản trị DONLY" };
export const dynamic = "force-dynamic";

/*
  Danh mục nội dung sửa được: từng khách hàng, và từng bộ ảnh bên trong.

  Danh sách lấy từ FILE NGUỒN (works.js) chứ không từ database, vì thứ quyết định có bao
  nhiêu khách và bao nhiêu bộ ảnh là các thư mục trong public/project. Database chỉ giữ
  phần chữ đã sửa. Thả thư mục ảnh mới vào là nó tự hiện ở đây để bạn viết nội dung.
*/

function Badge({ children }) {
  return <span className="label shrink-0 text-fg-mute">{children}</span>;
}

export default async function ContentIndexPage() {
  if (!(await isSignedIn())) redirect("/admin/login");

  const overrides = await getOverrides();

  return (
    <AdminShell current="/admin/noi-dung">
      {hasDatabase ? null : <SetupNotice className="mt-8" />}

      <p className="mt-8 max-w-2xl font-body text-sm leading-relaxed text-fg/60">
        Sửa tên, mô tả, năm và địa điểm của khách hàng cùng từng bộ ảnh. Phần ảnh vẫn lấy
        từ thư mục <code className="text-fg/80">public/project</code> như cũ — thêm bộ ảnh
        mới bằng cách thả thư mục vào đó rồi push lên.
      </p>

      <div className="mt-10 space-y-10">
        {clients.map((client) => {
          const clientEdited = overrides.has(clientKey(client.slug));

          return (
            <section key={client.slug}>
              <Link
                href={`/admin/noi-dung/khach-hang/${client.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule pb-3"
              >
                <h2 className="font-display text-xl font-bold tracking-tight transition-opacity duration-300 ease-soft group-hover:opacity-70">
                  {client.name.vi ?? client.name}
                </h2>
                <Badge>{client.collections.length} bộ ảnh</Badge>
                {clientEdited ? <Badge>đã sửa</Badge> : null}
                <span className="label ml-auto text-fg-mute group-hover:text-fg">
                  Sửa khách hàng →
                </span>
              </Link>

              <ul className="divide-y divide-rule">
                {client.collections.map((collection) => {
                  const edited = overrides.has(collectionKey(client.slug, collection.slug));

                  return (
                    <li key={collection.slug}>
                      <Link
                        href={`/admin/noi-dung/bo-anh/${client.slug}/${collection.slug}`}
                        className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
                      >
                        <span className="font-ui text-sm text-fg/85 transition-colors duration-300 ease-soft group-hover:text-fg">
                          {collection.title.vi ?? collection.title}
                        </span>
                        <Badge>{collection.frameCount} khung</Badge>
                        {edited ? <Badge>đã sửa</Badge> : null}
                        <span className="label ml-auto text-fg-mute group-hover:text-fg">
                          Sửa →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}
