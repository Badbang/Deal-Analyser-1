import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
  // A small red vertical line beside the text, growing to 90px -- for the
  // sparest hero beats (e.g. "WAIT.") that want one quiet accent.
  accentLine?: boolean;
}> = ({ lines, accent, fontSize = 110, startDelay = 0, accentLine = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineHeight = interpolate(frame, [startDelay, startDelay + 15], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.black,
        fontSize,
        color: COLORS.white,
        lineHeight: 1.1,
      }}
    >
      {accentLine && <div style={{ width: 4, height: lineHeight, background: COLORS.red }} />}
      <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
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
    </div>
  );
};
