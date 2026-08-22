import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

const STAGGER_FRAMES = 8;

// Default text entrance building block: each line fades/slides/scales in,
// staggered. Used for PRESENTER+TRANSPARENT and TRANSPARENT scenes where
// text sits over footage rather than a black background.
export const KineticText: React.FC<{
  lines: string[];
  accent?: string;
  fontSize?: number;
  align?: "center" | "left";
  startDelay?: number;
}> = ({ lines, accent, fontSize = 72, align = "center", startDelay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.extraBold,
        fontSize,
        color: COLORS.white,
        lineHeight: 1.15,
      }}
    >
      {lines.map((line, i) => {
        const { opacity, translateY, scale } = lineEntrance({
          frame,
          fps,
          delay: startDelay + i * STAGGER_FRAMES,
        });
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            <AccentText text={line} accent={accent} />
          </div>
        );
      })}
    </div>
  );
};
