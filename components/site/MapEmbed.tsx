export default function MapEmbed({ address }: { address: string }) {
  const query = encodeURIComponent(address);
  return (
    <div className="spec-card overflow-hidden rounded-sm">
      <iframe
        title="HT Makina Taşlama Konum"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="280"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
