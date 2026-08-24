"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, hasPassword, isSignedIn } from "@/lib/admin/auth";
import { setStatus } from "@/lib/admin/bookings";

/*
  Các hành động của khu quản trị.

  Server action là điểm vào công khai — ai biết định danh của nó đều gọi được, kể cả khi
  không mở trang admin. Nên MỌI hành động đổi dữ liệu đều tự kiểm tra phiên đăng nhập ở
  ngay đầu hàm, không dựa vào việc trang cha đã chặn hay chưa.
*/

/* Làm chậm mỗi lần đăng nhập sai, để không ai dò mật khẩu bằng cách thử hàng loạt */
const WRONG_PASSWORD_DELAY = 700;

export async function signIn(previousState, formData) {
  if (!hasPassword) {
    return { error: "Chưa đặt biến môi trường ADMIN_PASSWORD trên máy chủ." };
  }

  const password = formData.get("password");

  if (!checkPassword(typeof password === "string" ? password : "")) {
    await new Promise((resolve) => setTimeout(resolve, WRONG_PASSWORD_DELAY));
    return { error: "Mật khẩu không đúng." };
  }

  await createSession();
  redirect("/admin");
}

export async function signOut() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateBookingStatus(formData) {
  if (!(await isSignedIn())) return;

  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isInteger(id)) return;

  await setStatus(id, status);
  revalidatePath("/admin");
}
