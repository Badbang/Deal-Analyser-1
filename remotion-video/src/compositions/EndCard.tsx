import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const endCardSchema = z.object({
  heading: z.string(),
  subtitle: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
});

export const EndCard: React.FC<z.infer<typeof endCardSchema>> = ({
  heading,
  subtitle,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Gentle looping pulse on the accent underline, starts once the card has settled in.
  const pulse = 1 + Math.sin(Math.max(frame - 30, 0) / fps * Math.PI * 2) * 0.08;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 6,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        {heading}
      </div>
      <div
        style={{
          width: 220,
          height: 10,
          borderRadius: 6,
          backgroundColor: accentColor,
          marginTop: 30,
          transform: `scaleX(${pulse})`,
        }}
      />
      <div
        style={{
          fontSize: 40,
          color: "white",
          marginTop: 30,
          opacity: subtitleOpacity,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
