/*
  Container theo guideline mục 5:
  max-width 1440px · margin ngoài 20px (mobile) → 80–120px (desktop).
*/
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-frame px-5 md:px-10 lg:px-16 xl:px-24 ${className}`}
    >
      {children}
    </Tag>
  );
}
