export const CoffeeBag: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 160 200"
      style={{ filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.4))" }}
    >
      <defs>
        <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e7e2d8" />
        </linearGradient>
      </defs>
      {/* folded top flap */}
      <path d="M40 30 L120 30 L128 55 L32 55 Z" fill="#d8d2c4" />
      {/* body */}
      <rect x="25" y="55" width="110" height="130" rx="14" fill="url(#bagGradient)" />
      {/* center seam */}
      <line x1="80" y1="55" x2="80" y2="185" stroke="#cfc9ba" strokeWidth="2" />
    </svg>
  );
};
