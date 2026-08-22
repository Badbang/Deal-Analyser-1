import { useCurrentFrame, useVideoConfig } from "remotion";
import { heroPunch } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

// A single punchy keyword/short phrase, e.g. "WHEN SHOULD YOU SHARE?".
// `variant="question"` nudges the accent word slightly larger, for reused
// scenes that repeat a KeywordPop with a small stylistic difference.
export const KeywordPop: React.FC<{
  lines: string[];
  accent?: string;
  variant?: "default" | "question";
  fontSize?: number;
  align?: "center" | "left";
}> = ({ lines, accent, variant = "default", fontSize = 84, align = "center" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = heroPunch({ frame, fps });

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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={variant === "question" && i === 0 ? { fontSize: fontSize * 1.08 } : undefined}
        >
          <AccentText text={line} accent={accent} />
        </div>
      ))}
    </div>
  );
};
