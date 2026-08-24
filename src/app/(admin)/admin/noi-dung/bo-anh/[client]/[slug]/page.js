import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin/auth";
import { collectionKey, getOverride } from "@/lib/admin/content";
import { getClient, getCollection } from "@/lib/works";
import AdminShell from "@/components/admin/admin-shell";
import ContentForm from "@/components/admin/content-form";

export const metadata = { title: "Sửa bộ ảnh — Quản trị DONLY" };
export const dynamic = "force-dynamic";

/*
  brief / approach / result là ba phần chữ dài nhất và cũng là phần đang để chữ mồi.
  Đưa lên đầu danh sách những ô ngắn để bạn sửa nhanh, ba ô dài xuống cuối.
*/
const FIELDS = [
  { name: "title", type: "pair", label: "Tên bộ ảnh" },
  { name: "year", type: "text", label: "Năm" },
  { name: "location", type: "pair", label: "Địa điểm" },
  { name: "summary", type: "pair", label: "Mô tả ngắn", long: true },
  { name: "brief", type: "pair", label: "Bài toán của khách", long: true },
  { name: "approach", type: "pair", label: "Cách studio xử lý", long: true },
  { name: "result", type: "pair", label: "Kết quả", long: true },
];

export default async function EditCollectionPage({ params }) {
  if (!(await isSignedIn())) redirect("/admin/login");

  const { client: clientSlug, slug } = await params;
  const collection = getCollection(clientSlug, slug);
  if (!collection) notFound();

  const client = getClient(clientSlug);
  const key = collectionKey(clientSlug, slug);
  const override = await getOverride(key);

  return (
    <AdminShell current="/admin/noi-dung">
      <div className="mt-8">
        <Link href="/admin/noi-dung" className="label text-fg-mute hover:text-fg">
          ← Danh mục nội dung
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          {collection.title.vi ?? collection.title}
        </h1>
        <p className="mt-2 font-body text-sm text-fg-mute">
          {client?.name?.vi ?? clientSlug} · {collection.frameCount} khung ·{" "}
          <Link
            href={`/vi/works/${clientSlug}/${slug}`}
            target="_blank"
            className="underline-draw text-fg/70"
          >
            xem trên site
          </Link>
        </p>
      </div>

      <ContentForm
        contentKey={key}
        fields={FIELDS}
        base={collection}
        current={override}
        hasOverride={Boolean(override)}
      />
    </AdminShell>
  );
}
