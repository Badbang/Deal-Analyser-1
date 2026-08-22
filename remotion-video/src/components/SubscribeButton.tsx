import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

// Red rounded-rect SUBSCRIBE button: scale 0.9 -> 1.05 -> 1, then settles.
export const SubscribeButton: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const progress = local < 0 ? 0 : spring({ frame: local, fps, config: { damping: 10, mass: 0.5 } });
  const scale = interpolate(progress, [0, 0.6, 1], [0.9, 1.05, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(local, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: COLORS.red,
        color: COLORS.white,
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.extraBold,
        fontSize: 40,
        padding: "18px 48px",
        borderRadius: 999,
        letterSpacing: 1,
      }}
    >
      SUBSCRIBE
    </div>
  );
};
