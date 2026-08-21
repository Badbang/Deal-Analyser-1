export const CoffeeBean: React.FC<{ size: number; rotation: number }> = ({
  size,
  rotation,
}) => {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))",
      }}
    >
      <defs>
        <linearGradient id={`beanGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a5a34" />
          <stop offset="55%" stopColor="#5c3a20" />
          <stop offset="100%" stopColor="#3a220f" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="65" rx="42" ry="60" fill={`url(#beanGradient-${size})`} />
      <path
        d="M50 20 Q 34 65 50 110"
        fill="none"
        stroke="#2a160a"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};
