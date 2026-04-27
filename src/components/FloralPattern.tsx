export const FloralPattern = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 bg-floral ${className}`}
  />
);
