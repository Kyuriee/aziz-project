/** Ikon SVG kecil (mengikuti warna teks) — pengganti karakter panah unicode. */
export function ArrowUpRight({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowUp({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M12 20V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowRight({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Play({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5 19 12 8 18.5Z" />
    </svg>
  );
}

export function Close({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

/* Ikon disiplin untuk tag Journey (stroke dan ujung sama dengan ikon lain) */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "square", viewBox: "0 0 24 24", "aria-hidden": "true" };

export function Camera({ size = "1em" }) {
  return (
    <svg width={size} height={size} {...stroke}>
      <path d="M3 8h4l2-3h6l2 3h4v11H3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function Layout({ size = "1em" }) {
  return (
    <svg width={size} height={size} {...stroke}>
      <path d="M4 4h16v16H4ZM4 10h16M10 10v10" />
    </svg>
  );
}

export function Lines({ size = "1em" }) {
  return (
    <svg width={size} height={size} {...stroke}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

export function Scissors({ size = "1em" }) {
  return (
    <svg width={size} height={size} {...stroke}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 7.5 20 18M8 16.5 20 6" />
    </svg>
  );
}

export function Folder({ size = "1em" }) {
  return (
    <svg width={size} height={size} {...stroke}>
      <path d="M3 6h7l2 2h9v11H3Z" />
    </svg>
  );
}
