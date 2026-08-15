"use client";

import { useActionState } from "react";
// Server action nằm ngoài thư mục route: đường dẫn import không chứa dấu ngoặc vuông
// của segment động, tránh mọi rắc rối khi phân giải alias.
import { submitBooking } from "@/lib/actions/booking";
import { ArrowRight } from "@/components/icons";

const INITIAL = { status: "idle", message: "", errors: {}, values: {} };

const SERVICE_VALUES = ["lookbook", "campaign", "product", "khac"];
const BUDGET_VALUES = ["", "duoi-15", "15-30", "30-60", "tren-60"];

const FIELD =
  "w-full border border-rule bg-panel px-4 py-3.5 text-fg transition-colors duration-300 ease-soft outline-none placeholder:text-fg-mute focus:border-fg";

function Field({ label, htmlFor, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label block text-fg-mute">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-fg/70">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function BookingForm({ locale, dict }) {
  const [state, formAction, pending] = useActionState(submitBooking, INITIAL);
  const f = dict.form;

  if (state.status === "success") {
    return (
      <div className="border border-rule bg-panel p-8 md:p-12">
        <p className="label text-fg-mute">{f.sentLabel}</p>
        <p className="mt-6 font-display text-3xl leading-snug md:text-4xl">
          {f.sentTitle}
        </p>
        <p className="mt-5 max-w-md leading-relaxed text-fg/70">{state.message}</p>
      </div>
    );
  }

  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Ngôn ngữ đang đọc — để server trả thông báo lỗi đúng thứ tiếng */}
      <input type="hidden" name="locale" value={locale} />

      {/* Bẫy bot — ẩn khỏi cả mắt người lẫn trình đọc màn hình */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={f.name} htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={values.name}
            autoComplete="name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={FIELD}
          />
        </Field>

        <Field label={f.brand} htmlFor="brand" error={errors.brand}>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            defaultValue={values.brand}
            autoComplete="organization"
            aria-invalid={errors.brand ? "true" : undefined}
            aria-describedby={errors.brand ? "brand-error" : undefined}
            className={FIELD}
          />
        </Field>

        <Field label={f.email} htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={values.email}
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={FIELD}
          />
        </Field>

        <Field label={f.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={values.phone}
            autoComplete="tel"
            className={FIELD}
          />
        </Field>

        <Field label={f.service} htmlFor="service" error={errors.service}>
          <select
            id="service"
            name="service"
            required
            defaultValue={values.service ?? ""}
            aria-invalid={errors.service ? "true" : undefined}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={FIELD}
          >
            <option value="">{f.servicePlaceholder}</option>
            {SERVICE_VALUES.map((value) => (
              <option key={value} value={value}>
                {f.serviceOptions[value]}
              </option>
            ))}
          </select>
        </Field>

        <Field label={f.date} htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={values.date}
            className={FIELD}
          />
        </Field>

        <Field label={f.budget} htmlFor="budget" className="sm:col-span-2">
          <select
            id="budget"
            name="budget"
            defaultValue={values.budget ?? ""}
            className={FIELD}
          >
            {BUDGET_VALUES.map((value) => (
              <option key={value || "none"} value={value}>
                {f.budgetOptions[value]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={f.message} htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={values.message}
          placeholder={f.messagePlaceholder}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${FIELD} resize-y`}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p role="alert" className="border border-fg/50 bg-panel px-4 py-3 text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6">
        {/* Cùng ngôn ngữ hover với <CtaLink>: một lớp trắng dâng lên từ đáy nút */}
        <button
          type="submit"
          disabled={pending}
          className="group relative isolate inline-flex items-center gap-3 overflow-hidden border border-paper bg-paper px-7 py-4 font-ui text-sm tracking-wide text-ink transition-colors duration-400 ease-soft hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-donly group-hover:scale-y-100"
          />
          {pending ? f.submitting : f.submit}
          <ArrowRight className="size-4 transition-transform duration-400 ease-donly group-hover:translate-x-1" />
        </button>

        <p className="text-sm text-fg-mute">{f.responseNote}</p>
      </div>
    </form>
  );
}
