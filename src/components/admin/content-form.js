"use client";

import { useActionState } from "react";
import { saveContent, resetContent } from "@/lib/actions/content";

/*
  Form sửa nội dung.

  Ô SONG NGỮ để trống thì giữ nguyên bản gốc, không xoá đi (xem hàm merge ở works-live.js).
  Nhờ vậy bạn sửa mỗi bản tiếng Việt cũng được, bản tiếng Anh vẫn còn nguyên chữ cũ.
  Placeholder hiện chính nội dung gốc để nhìn là biết đang thay cái gì.

  Danh sách trường được gửi kèm trong input ẩn, vì server action nhận FormData phẳng —
  không có danh sách này thì server không biết trường nào là song ngữ, trường nào không.
*/

function Pair({ field, label, base, value, long }) {
  const Tag = long ? "textarea" : "input";
  const shared =
    "mt-2 w-full border border-rule bg-panel px-3 py-2 font-body text-sm text-fg outline-none focus:border-fg";

  return (
    <fieldset className="border-t border-rule pt-5">
      <legend className="label text-fg-mute">{label}</legend>

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {["vi", "en"].map((lang) => (
          <div key={lang}>
            <label
              htmlFor={`${field}_${lang}`}
              className="label block text-fg-mute/70"
            >
              {lang === "vi" ? "Tiếng Việt" : "Tiếng Anh"}
            </label>
            <Tag
              id={`${field}_${lang}`}
              name={`${field}_${lang}`}
              rows={long ? 4 : undefined}
              defaultValue={value?.[lang] ?? ""}
              placeholder={base?.[lang] ?? ""}
              className={shared}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Text({ field, label, base, value }) {
  return (
    <fieldset className="border-t border-rule pt-5">
      <legend className="label text-fg-mute">{label}</legend>
      <input
        id={field}
        name={field}
        defaultValue={value ?? ""}
        placeholder={base ?? ""}
        className="mt-3 w-full max-w-xs border border-rule bg-panel px-3 py-2 font-body text-sm text-fg outline-none focus:border-fg"
      />
    </fieldset>
  );
}

export default function ContentForm({ contentKey, fields, base, current, hasOverride }) {
  const [state, formAction, pending] = useActionState(saveContent, null);
  const [resetState, resetAction, resetting] = useActionState(resetContent, null);

  const pairFields = fields.filter((f) => f.type === "pair").map((f) => f.name);
  const textFields = fields.filter((f) => f.type === "text").map((f) => f.name);
  const message = state ?? resetState;

  return (
    <div className="mt-8">
      <form action={formAction}>
        <input type="hidden" name="key" value={contentKey} />
        <input type="hidden" name="pairFields" value={pairFields.join(",")} />
        <input type="hidden" name="textFields" value={textFields.join(",")} />

        <div className="space-y-6">
          {fields.map((field) =>
            field.type === "pair" ? (
              <Pair
                key={field.name}
                field={field.name}
                label={field.label}
                long={field.long}
                base={base[field.name]}
                value={current?.[field.name]}
              />
            ) : (
              <Text
                key={field.name}
                field={field.name}
                label={field.label}
                base={base[field.name]}
                value={current?.[field.name]}
              />
            ),
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
          <button
            type="submit"
            disabled={pending}
            className="border border-paper bg-paper px-6 py-3 font-ui text-sm tracking-wide text-ink transition-opacity duration-300 ease-soft hover:opacity-85 disabled:opacity-50"
          >
            {pending ? "Đang lưu…" : "Lưu và cập nhật site"}
          </button>

          {message ? (
            <p
              role="status"
              className={`font-body text-sm ${
                message.status === "success" ? "text-fg/70" : "text-fg"
              }`}
            >
              {message.message}
            </p>
          ) : null}
        </div>
      </form>

      {/*
        Form khôi phục đứng RIÊNG, không lồng trong form lưu — HTML không cho lồng form,
        và nút này phải gửi được kể cả khi form kia đang có nội dung dở dang.
      */}
      {hasOverride ? (
        <form action={resetAction} className="mt-6 border-t border-rule pt-6">
          <input type="hidden" name="key" value={contentKey} />
          <button
            type="submit"
            disabled={resetting}
            className="font-ui text-sm text-fg-mute underline-offset-4 transition-colors duration-300 ease-soft hover:text-fg hover:underline disabled:opacity-50"
          >
            {resetting ? "Đang khôi phục…" : "Khôi phục nội dung gốc trong file"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
