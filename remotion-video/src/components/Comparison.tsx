import { useCurrentFrame, useVideoConfig } from "remotion";
import { heroPunch, lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

// Two-sided comparison. `style="clash"`: one side dominates (red, full scale),
// the other fades to secondary (40%, smaller) — e.g. PAST vs FUTURE.
// `style="meet"`: both sides arrive as equals and settle together, connected
// by a symbol or a thin red line — e.g. 9-5 meeting YOUTUBE.
export const Comparison: React.FC<{
  leftText: string;
  rightText: string;
  style?: "clash" | "meet";
  symbol?: string;
  winner?: "left" | "right";
}> = ({ leftText, rightText, style = "clash", symbol, winner = "right" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftAnim = lineEntrance({ frame, fps, delay: 0 });
  const rightAnim = lineEntrance({ frame, fps, delay: style === "clash" ? 22 : 10 });
  const symbolAnim = heroPunch({ frame, fps, delay: style === "meet" ? 16 : 10 });

  const leftWins = winner === "left";
  const leftColor = style === "clash" ? (leftWins ? COLORS.red : COLORS.whiteSecondary40) : COLORS.white;
  const rightColor = style === "clash" ? (leftWins ? COLORS.whiteSecondary40 : COLORS.red) : COLORS.white;
  const leftScale = style === "clash" && !leftWins ? 0.82 : 1;
  const rightScale = style === "clash" && leftWins ? 0.82 : 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.black,
        fontSize: 96,
      }}
    >
      <div
        style={{
          opacity: leftAnim.opacity,
          transform: `translateY(${leftAnim.translateY}px) scale(${leftScale})`,
          color: leftColor,
        }}
      >
        {leftText}
      </div>

      {symbol ? (
        <div style={{ opacity: symbolAnim.opacity, transform: `scale(${symbolAnim.scale})`, color: COLORS.white, fontSize: 72 }}>
          {symbol}
        </div>
      ) : (
        <div
          style={{
            width: 4,
            height: 130,
            background: COLORS.red,
            opacity: Math.min(leftAnim.opacity, rightAnim.opacity),
          }}
        />
      )}

      <div
        style={{
          opacity: rightAnim.opacity,
          transform: `translateY(${rightAnim.translateY}px) scale(${rightScale})`,
          color: rightColor,
        }}
      >
        {rightText}
      </div>
    </div>
  );
};
