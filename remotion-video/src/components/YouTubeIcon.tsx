import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS } from "../theme";

// A small YouTube-style play icon (rounded red rect + white triangle).
// Deliberately simple/geometric rather than a literal brand asset.
export const YouTubeIcon: React.FC<{ size?: number; delay?: number }> = ({
  size = 64,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = lineEntrance({ frame, fps, delay });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: size,
        height: size * 0.7,
        borderRadius: size * 0.18,
        background: COLORS.red,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          marginLeft: size * 0.06,
          borderTop: `${size * 0.16}px solid transparent`,
          borderBottom: `${size * 0.16}px solid transparent`,
          borderLeft: `${size * 0.26}px solid ${COLORS.white}`,
        }}
      />
    </div>
  );
};
