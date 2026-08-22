import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { KineticText } from "./KineticText";

const LINE_WIDTH = 800;

// A horizontal timeline with a dot travelling from start to end, e.g.
// START ------ (dot, READY) ------ SHARE.
export const ProgressTimeline: React.FC<{
  startLabel: string;
  endLabel: string;
  markerLabel?: string;
  mainText?: { lines: string[]; accent?: string };
}> = ({ startLabel, endLabel, markerLabel, mainText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotProgress = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markerAnim = lineEntrance({ frame, fps, delay: 45 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 36,
        fontFamily: MONTSERRAT,
      }}
    >
      <div style={{ position: "relative", width: LINE_WIDTH, height: 4, background: COLORS.whiteSecondary40 }}>
        <div
          style={{
            position: "absolute",
            left: dotProgress * LINE_WIDTH - 10,
            top: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: COLORS.red,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: LINE_WIDTH,
          fontWeight: WEIGHT.extraBold,
          fontSize: 34,
          color: COLORS.white,
        }}
      >
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>

      {markerLabel && (
        <div
          style={{
            opacity: markerAnim.opacity,
            transform: `translateY(${markerAnim.translateY}px)`,
            fontWeight: WEIGHT.black,
            fontSize: 42,
            color: COLORS.red,
          }}
        >
          {markerLabel}
        </div>
      )}

      {mainText && (
        <KineticText lines={mainText.lines} accent={mainText.accent} startDelay={55} fontSize={60} />
      )}
    </div>
  );
};
