import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin/auth";
import { clientKey, getOverride } from "@/lib/admin/content";
import { getClient } from "@/lib/works";
import AdminShell from "@/components/admin/admin-shell";
import ContentForm from "@/components/admin/content-form";

export const metadata = { title: "Sửa khách hàng — Quản trị DONLY" };
export const dynamic = "force-dynamic";

const FIELDS = [
  { name: "name", type: "text", label: "Tên khách hàng" },
  { name: "industry", type: "pair", label: "Ngành hàng" },
  { name: "since", type: "text", label: "Năm bắt đầu hợp tác" },
  { name: "summary", type: "pair", label: "Giới thiệu ngắn", long: true },
];

export default async function EditClientPage({ params }) {
  if (!(await isSignedIn())) redirect("/admin/login");

  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  const override = await getOverride(clientKey(slug));

  return (
    <AdminShell current="/admin/noi-dung">
      <div className="mt-8">
        <Link href="/admin/noi-dung" className="label text-fg-mute hover:text-fg">
          ← Danh mục nội dung
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          {client.name.vi ?? client.name}
        </h1>
        <p className="mt-2 font-body text-sm text-fg-mute">
          Khách hàng · {client.collections.length} bộ ảnh · {client.frameCount} khung
        </p>
      </div>

      <ContentForm
        contentKey={clientKey(slug)}
        fields={FIELDS}
        base={client}
        current={override}
        hasOverride={Boolean(override)}
      />
    </AdminShell>
  );
}
