/**
 * Görünmez spam tuzağı alanı. Gerçek kullanıcılar bunu göremez/dolduramaz;
 * botlar genelde formdaki her alanı otomatik doldurduğu için bu alanı
 * dolu gönderirlerse sunucu tarafında istek sessizce yok sayılır.
 */
export default function HoneypotField() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
