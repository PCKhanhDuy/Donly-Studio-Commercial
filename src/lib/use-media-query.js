"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
  Đọc media query bằng useSyncExternalStore thay vì useState + useEffect.
  Cách này cho giá trị đúng ngay ở lần render đầu phía client, không gây render thừa,
  và không vi phạm quy tắc "không setState trong effect".
  Trên server luôn trả false — phía an toàn: không bật hiệu ứng khi chưa biết môi trường.
*/
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/* Người dùng đã bật giảm chuyển động trong cài đặt hệ điều hành */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/* Thiết bị có con trỏ chính xác (chuột / trackpad) — dùng để bật hiệu ứng chỉ có ở desktop */
export function useFinePointer() {
  return useMediaQuery("(pointer: fine)");
}
