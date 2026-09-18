export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto w-24 divider-gold ${className}`} aria-hidden="true" />
  );
}
