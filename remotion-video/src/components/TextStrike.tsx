import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

// A line of text that enters normally, then gets a red strike-through drawn
// across it, fading to secondary opacity -- for "not X" / "X, not Y" beats
// (e.g. "NOT TALENTED" struck through, replaced conceptually by what follows).
export const TextStrike: React.FC<{
  lines: string[];
  strikeDelay?: number;
  fontSize?: number;
}> = ({ lines, strikeDelay = 20, fontSize = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = lineEntrance({ frame, fps, delay: 0 });

  const strikeProgress = interpolate(frame, [strikeDelay, strikeDelay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeAfterStrike = interpolate(
    frame,
    [strikeDelay + 12, strikeDelay + 20],
    [1, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.extraBold,
        fontSize,
        color: COLORS.white,
        lineHeight: 1.2,
        opacity: entrance.opacity * fadeAfterStrike,
        transform: `translateY(${entrance.translateY}px)`,
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ position: "relative" }}>
          {line}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: `${strikeProgress * 100}%`,
              height: 5,
              background: COLORS.red,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      ))}
    </div>
  );
};
