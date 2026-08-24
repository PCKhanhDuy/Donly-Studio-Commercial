import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import { hasPassword, isSignedIn } from "@/lib/admin/auth";
import LoginForm from "@/components/admin/login-form";

export const metadata = { title: "Đăng nhập — Quản trị DONLY" };

export default async function LoginPage() {
  // Đã đăng nhập rồi thì không có lý do gì hiện lại form
  if (await isSignedIn()) redirect("/admin");

  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Logo shape="full" tone="paper" className="h-5 w-auto" preload />
        <p className="label mt-4 text-fg-mute">Khu quản trị</p>

        {hasPassword ? (
          <LoginForm className="mt-10" />
        ) : (
          /*
            Chưa đặt mật khẩu thì nói thẳng phải làm gì, thay vì hiện một ô nhập mà gõ
            kiểu nào cũng sai. Đây là màn hình người vận hành gặp đầu tiên khi dựng site.
          */
          <div className="mt-10 border border-rule bg-panel p-6">
            <p className="font-ui text-sm font-semibold text-fg">Chưa cấu hình mật khẩu</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-fg/60">
              Đặt biến môi trường <code className="text-fg">ADMIN_PASSWORD</code> rồi khởi
              động lại máy chủ. Trên Vercel: Settings → Environment Variables.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
