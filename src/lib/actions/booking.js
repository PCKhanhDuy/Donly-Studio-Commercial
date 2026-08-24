"use server";

import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale } from "@/i18n/config";
import { saveBooking } from "@/lib/admin/bookings";

/*
  Xử lý form đặt lịch.

  Yêu cầu hợp lệ được GHI VÀO DATABASE rồi hiện ở /admin. Trước đây chỗ này chỉ
  console.log rồi thôi: khách bấm gửi, site báo "đã nhận", còn studio không nhận được gì.

  Chưa đặt DATABASE_URL thì saveBooking trả về false chứ không ném lỗi — form vẫn chạy,
  vẫn kiểm tra dữ liệu, chỉ là chưa lưu được. Cách này để một biến môi trường còn thiếu
  không bao giờ làm hỏng trang liên hệ của khách. Lúc đó server ghi lại một dòng cảnh báo
  để người vận hành biết mà đi đặt biến.

  Ngôn ngữ được gửi kèm trong một input ẩn để thông báo lỗi trả về đúng thứ tiếng
  người dùng đang đọc. Giá trị này luôn được kiểm tra lại ở server, không tin thẳng
  vào dữ liệu client gửi lên.
*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_VALUES = ["lookbook", "campaign", "product", "khac"];

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitBooking(previousState, formData) {
  const requested = clean(formData.get("locale"));
  const locale = isLocale(requested) ? requested : defaultLocale;
  const dict = getDictionary(locale);
  const messages = dict.form.errors;

  // Bẫy bot: trường ẩn, người thật không bao giờ điền.
  if (clean(formData.get("website"))) {
    return { status: "success", message: "", errors: {} };
  }

  const data = {
    name: clean(formData.get("name")),
    brand: clean(formData.get("brand")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    service: clean(formData.get("service")),
    date: clean(formData.get("date")),
    budget: clean(formData.get("budget")),
    message: clean(formData.get("message")),
  };

  const errors = {};

  if (!data.name) errors.name = messages.name;
  if (!data.brand) errors.brand = messages.brand;

  if (!data.email) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!SERVICE_VALUES.includes(data.service)) {
    errors.service = messages.service;
  }

  if (data.message.length < 20) {
    errors.message = messages.messageShort;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: messages.summary,
      errors,
      values: data,
    };
  }

  /*
    Lưu thất bại thì VẪN báo thành công cho khách. Với người đang điền form, lỗi hạ tầng
    phía studio là thứ họ không sửa được và cũng không nên phải đọc; bắt họ điền lại chỉ
    làm mất luôn cái đơn đó. Đổi lại, lỗi được ghi rõ vào log server để bên vận hành thấy.
  */
  try {
    const saved = await saveBooking({ locale, ...data });
    if (!saved) {
      console.warn(
        "[DONLY] Chưa đặt DATABASE_URL — yêu cầu đặt lịch KHÔNG được lưu:",
        { locale, ...data },
      );
    }
  } catch (error) {
    console.error("[DONLY] Lỗi khi lưu yêu cầu đặt lịch:", error);
    console.warn("[DONLY] Nội dung yêu cầu bị mất:", { locale, ...data });
  }

  return {
    status: "success",
    message: dict.form.successMessage,
    errors: {},
  };
}
