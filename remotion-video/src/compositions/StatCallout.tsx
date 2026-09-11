import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const statCalloutSchema = z.object({
  value: z.string(),
  caption: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
});

export const StatCallout: React.FC<z.infer<typeof statCalloutSchema>> = ({
  value,
  caption,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 200 } });
  const captionOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          fontSize: 220,
          fontWeight: 900,
          color: accentColor,
          transform: `scale(${scale})`,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 44,
          color: "white",
          marginTop: 28,
          maxWidth: "70%",
          textAlign: "center",
          opacity: captionOpacity,
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};
