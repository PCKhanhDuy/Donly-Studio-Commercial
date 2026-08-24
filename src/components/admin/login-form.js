"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions/admin";

/*
  Form đăng nhập. Dùng useActionState để thông báo lỗi từ server hiện ra mà không phải
  tự quản lý state gửi/nhận, và `pending` khoá nút lại trong lúc chờ — nếu không, bấm
  liên tiếp sẽ gửi nhiều lần vào cùng một lần chờ 700ms chống dò mật khẩu.
*/
export default function LoginForm({ className = "" }) {
  const [state, formAction, pending] = useActionState(signIn, { error: "" });

  return (
    <form action={formAction} className={className}>
      <label htmlFor="password" className="label block text-fg-mute">
        Mật khẩu
      </label>

      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        aria-invalid={state?.error ? true : undefined}
        aria-describedby={state?.error ? "password-error" : undefined}
        className="mt-3 w-full border border-rule bg-panel px-4 py-3 font-body text-fg outline-none focus:border-fg"
      />

      {state?.error ? (
        <p id="password-error" role="alert" className="mt-3 font-body text-sm text-fg/70">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full border border-paper bg-paper px-6 py-3 font-ui text-sm tracking-wide text-ink transition-opacity duration-300 ease-soft hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Đang kiểm tra…" : "Đăng nhập"}
      </button>
    </form>
  );
}
