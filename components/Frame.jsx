/** Placeholder visual abstrak hitam-putih. Ganti dengan <img> proyek asli jika sudah ada. */
const W = 400;
const H = 500;

const patterns = [
  // 0 — lingkaran konsentris
  () => (
    <>
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={W / 2} cy={H / 2} r={20 + i * 22} strokeOpacity={1 - i * 0.06} />
      ))}
    </>
  ),
  // 1 — garis diagonal
  () => (
    <>
      {Array.from({ length: 34 }, (_, i) => (
        <line key={i} x1={i * 20 - 200} y1={H} x2={i * 20 + 100} y2={0} strokeOpacity={0.25 + (i % 5) * 0.15} />
      ))}
    </>
  ),
  // 2 — grid titik
  () => (
    <>
      {Array.from({ length: 16 * 12 }, (_, i) => {
        const x = (i % 12) * 34 + 30;
        const y = Math.floor(i / 12) * 32 + 28;
        const r = 1 + ((i * 7) % 6);
        return <circle key={i} cx={x} cy={y} r={r} fill="#fff" stroke="none" fillOpacity={0.85} />;
      })}
    </>
  ),
  // 3 — batang vertikal
  () => (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={i * 20} y={H - ((i * 53) % 380) - 60} width={12} height={H} fill="#fff" stroke="none" fillOpacity={0.9 - (i % 4) * 0.2} />
      ))}
    </>
  ),
  // 4 — gelombang
  () => (
    <>
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${40 + i * 24} C 100 ${i * 24 - 20}, 200 ${100 + i * 24}, ${W} ${40 + i * 24}`}
          strokeOpacity={0.3 + (i % 4) * 0.2}
        />
      ))}
    </>
  ),
];

export default function Frame({ variant = 0 }) {
  const Pattern = patterns[variant % patterns.length];
  return (
    <div className="frame-art" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none" stroke="#fff" strokeWidth="1.2">
        <rect width={W} height={H} fill="#0a0a0a" stroke="none" />
        <Pattern />
      </svg>
    </div>
  );
}
