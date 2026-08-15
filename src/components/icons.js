/*
  Icon set theo guideline mục 6: line icon, nét 1.5px, không dùng icon filled,
  màu luôn kế thừa currentColor (đen hoặc trắng theo nền), khung chuẩn 24×24.
*/

function Svg({ children, className = "size-6", label }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeft(props) {
  return (
    <Svg {...props}>
      <path d="M20 12H4" />
      <path d="M10 18l-6-6 6-6" />
    </Svg>
  );
}

export function ArrowDown(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v16" />
      <path d="M6 14l6 6 6-6" />
    </Svg>
  );
}

export function Close(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Svg>
  );
}

export function Menu(props) {
  return (
    <Svg {...props}>
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </Svg>
  );
}

export function Plus(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  );
}

export function Expand(props) {
  return (
    <Svg {...props}>
      <path d="M9 4H4v5" />
      <path d="M15 4h5v5" />
      <path d="M15 20h5v-5" />
      <path d="M9 20H4v-5" />
    </Svg>
  );
}

export function Instagram(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Svg>
  );
}

export function Behance(props) {
  return (
    <Svg {...props}>
      <path d="M2 6h5.5a2.75 2.75 0 0 1 0 5.5H2z" />
      <path d="M2 11.5h6a3 3 0 0 1 0 6H2z" />
      <path d="M14.5 8.5h6" />
      <path d="M13.5 14.5h8a4 4 0 0 0-8 0 3.5 3.5 0 0 0 6.5 1.8" />
    </Svg>
  );
}
