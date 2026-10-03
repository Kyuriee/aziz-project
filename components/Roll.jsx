/** Teks yang "berguling" saat hover: salinan kedua naik menggantikan yang pertama. */
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll-in">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
