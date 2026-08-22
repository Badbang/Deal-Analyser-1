import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { KineticText } from "./KineticText";

// An icon "rotates" from pointing at one audience to another
// (e.g. a camera flipping from FAMILY to REAL AUDIENCE).
export const AudienceDiagram: React.FC<{
  icon?: string;
  fromLabel: string;
  toLabel: string;
  mainText?: { lines: string[]; accent?: string };
}> = ({ icon = "🎥", fromLabel, toLabel, mainText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = interpolate(frame, [10, 40], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fromOpacity = interpolate(frame, [0, 20, 35], [1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const toAnim = lineEntrance({ frame, fps, delay: 35 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        fontFamily: MONTSERRAT,
      }}
    >
      <div style={{ fontSize: 100, transform: `rotateY(${rotation}deg)` }}>{icon}</div>

      <div style={{ position: "relative", height: 60, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            opacity: fromOpacity,
            fontWeight: WEIGHT.extraBold,
            fontSize: 48,
            color: COLORS.whiteSecondary40,
          }}
        >
          {fromLabel}
        </div>
        <div
          style={{
            position: "absolute",
            opacity: toAnim.opacity,
            transform: `translateY(${toAnim.translateY}px)`,
            fontWeight: WEIGHT.extraBold,
            fontSize: 48,
            color: COLORS.red,
          }}
        >
          {toLabel}
        </div>
      </div>

      {mainText && (
        <KineticText lines={mainText.lines} accent={mainText.accent} startDelay={45} fontSize={64} />
      )}
    </div>
  );
};
