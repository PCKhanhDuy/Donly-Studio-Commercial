"use server";

import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale } from "@/i18n/config";

/*
  Xử lý form đặt lịch.

  HIỆN TẠI: chỉ kiểm tra dữ liệu rồi ghi log ra terminal của server — CHƯA gửi email
  và CHƯA lưu vào database. Trước khi chạy thật cần nối vào một trong hai:
    · dịch vụ gửi mail (Resend / SendGrid / SMTP) để đẩy về hộp thư studio, hoặc
    · một bảng trong database / Google Sheet để lưu yêu cầu.
  Chỗ cần thay nằm ở khối "TODO" bên dưới.

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

  // TODO: thay console.log bằng lệnh gửi email hoặc ghi vào database.
  console.log("[DONLY] Yêu cầu đặt lịch mới:", { locale, ...data });

  return {
    status: "success",
    message: dict.form.successMessage,
    errors: {},
  };
}
