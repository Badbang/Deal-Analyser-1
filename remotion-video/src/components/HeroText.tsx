import { useCurrentFrame, useVideoConfig } from "remotion";
import { heroPunch } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

const STAGGER_FRAMES = 6;

// Full-black-background hero moment: all lines punch in together
// (staggered slightly), scale 0.82 -> 1.08 -> 1.00. For BLACK mode scenes
// that are a single beat, not a sequential build (see HeroStatement for that).
export const HeroText: React.FC<{
  lines: string[];
  accent?: string;
  fontSize?: number;
  startDelay?: number;
}> = ({ lines, accent, fontSize = 110, startDelay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.black,
        fontSize,
        color: COLORS.white,
        lineHeight: 1.1,
      }}
    >
      {lines.map((line, i) => {
        const { opacity, scale } = heroPunch({
          frame,
          fps,
          delay: startDelay + i * STAGGER_FRAMES,
        });
        return (
          <div key={i} style={{ opacity, transform: `scale(${scale})` }}>
            <AccentText text={line} accent={accent} />
          </div>
        );
      })}
    </div>
  );
};
