import { useCurrentFrame, useVideoConfig } from "remotion";
import { heroPunch, lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

// A "chapter card": small eyebrow label, huge number, punchy phrase below.
// e.g. Scene 28 — REASON / 04 / RESULTS SPEAK LOUDER.
export const ChapterCard: React.FC<{
  label: string;
  number: number;
  phraseLines: string[];
  accent?: string;
}> = ({ label, number, phraseLines, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelAnim = lineEntrance({ frame, fps, delay: 0 });
  const numberAnim = heroPunch({ frame, fps, delay: 6 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: MONTSERRAT,
        color: COLORS.white,
      }}
    >
      <div
        style={{
          fontWeight: WEIGHT.medium,
          fontSize: 36,
          letterSpacing: 6,
          color: COLORS.whiteSecondary70,
          opacity: labelAnim.opacity,
          transform: `translateY(${labelAnim.translateY}px)`,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontWeight: WEIGHT.black,
          fontSize: 220,
          lineHeight: 1,
          color: COLORS.red,
          opacity: numberAnim.opacity,
          transform: `scale(${numberAnim.scale})`,
        }}
      >
        {String(number).padStart(2, "0")}
      </div>
      <div style={{ fontWeight: WEIGHT.extraBold, fontSize: 72, lineHeight: 1.15 }}>
        {phraseLines.map((line, i) => {
          const anim = lineEntrance({ frame, fps, delay: 20 + i * 8 });
          return (
            <div
              key={i}
              style={{ opacity: anim.opacity, transform: `translateY(${anim.translateY}px)` }}
            >
              <AccentText text={line} accent={accent} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
