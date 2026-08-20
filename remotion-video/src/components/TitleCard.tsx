import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TitleCard: React.FC<{
  title: string;
  subtitle: string;
  accentColor: string;
}> = ({ title, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 90,
          fontWeight: 800,
          color: "white",
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 40,
          color: accentColor,
          marginTop: 20,
          opacity: subtitleOpacity,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
