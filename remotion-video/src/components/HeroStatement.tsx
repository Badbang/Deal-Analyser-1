import { useCurrentFrame, useVideoConfig } from "remotion";
import { heroPunch, lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

const STAGGER_FRAMES = 16;

// Sequential build: lines stack in one at a time (unlike HeroText, where
// all lines punch together). Individual lines can be marked `punch` (bigger
// overshoot scale, e.g. FEAR / YOUR FUTURE in the main hero statement) and
// given their own color, independent of a single shared accent word.
export const HeroStatement: React.FC<{
  lines: { text: string; color?: "white" | "red"; punch?: boolean }[];
  fontSize?: number;
  startDelay?: number;
}> = ({ lines, fontSize = 96, startDelay = 0 }) => {
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
        lineHeight: 1.15,
      }}
    >
      {lines.map((line, i) => {
        const delay = startDelay + i * STAGGER_FRAMES;
        const color = line.color === "red" ? COLORS.red : COLORS.white;

        if (line.punch) {
          const { opacity, scale } = heroPunch({ frame, fps, delay });
          return (
            <div key={i} style={{ opacity, transform: `scale(${scale})`, color }}>
              {line.text}
            </div>
          );
        }

        const { opacity, translateY } = lineEntrance({ frame, fps, delay });
        return (
          <div key={i} style={{ opacity, transform: `translateY(${translateY}px)`, color }}>
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
