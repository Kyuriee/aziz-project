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

export function ArrowDown({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M12 4v15M6 13l6 6 6-6" />
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
