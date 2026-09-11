import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const quoteCardSchema = z.object({
  quote: z.string(),
  backgroundColor: zColor(),
  accentColor: zColor(),
});

export const QuoteCard: React.FC<z.infer<typeof quoteCardSchema>> = ({
  quote,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const riseIn = spring({ frame, fps, config: { damping: 200 } });
  const translateY = interpolate(riseIn, [0, 1], [40, 0]);
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          maxWidth: "75%",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        <div style={{ width: 8, alignSelf: "stretch", backgroundColor: accentColor }} />
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.25,
          }}
        >
          {quote}
        </div>
      </div>
    </AbsoluteFill>
  );
};
