export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 opacity-0"
      style={{
        animation: 'fadeIn 0.35s ease-out forwards',
      }}
      aria-hidden
    />
  );
}
