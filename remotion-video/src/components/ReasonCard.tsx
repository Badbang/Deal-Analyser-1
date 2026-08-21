import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const RED = "#e0263f";

export const ReasonCard: React.FC<{
  number: number;
  icon: string;
  label: string;
}> = ({ number, icon, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const slide = interpolate(progress, [0, 1], [60, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 80,
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateX(${slide}px) scale(${progress})`,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 120,
          color: RED,
          lineHeight: 1,
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        {String(number).padStart(2, "0")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 64 }}>{icon}</div>
        <div
          style={{
            fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 42,
            color: "white",
            maxWidth: 480,
            textShadow: "0 4px 18px rgba(0,0,0,0.5)",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
