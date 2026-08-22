import { Fragment } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

const STAGGER_FRAMES = 12;

// A horizontal row of numbered "gate" cards (checkmark badge, big number,
// sub-label), connected by arrows -- for step/checklist beats like
// "Background > Midground > Foreground".
export const GateCards: React.FC<{
  steps: { number: number; sublabel: string }[];
}> = ({ steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {steps.map((step, i) => {
        const anim = lineEntrance({ frame, fps, delay: i * STAGGER_FRAMES });

        return (
          <Fragment key={i}>
            {i > 0 && (
              <div
                style={{
                  opacity: anim.opacity,
                  color: COLORS.whiteSecondary40,
                  fontSize: 40,
                  fontFamily: MONTSERRAT,
                  fontWeight: WEIGHT.black,
                }}
              >
                &gt;
              </div>
            )}
            <div
              style={{
                opacity: anim.opacity,
                transform: `translateY(${anim.translateY}px)`,
                position: "relative",
                width: 220,
                padding: "28px 20px",
                borderRadius: 16,
                border: `2px solid ${COLORS.whiteSecondary40}`,
                background: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                fontFamily: MONTSERRAT,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  right: -12,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: COLORS.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.white,
                  fontWeight: WEIGHT.black,
                  fontSize: 18,
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: 3,
                  fontWeight: WEIGHT.extraBold,
                  color: COLORS.whiteSecondary70,
                }}
              >
                GATE
              </div>
              <div style={{ fontSize: 64, fontWeight: WEIGHT.black, color: COLORS.white, lineHeight: 1 }}>
                {step.number}
              </div>
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: 2,
                  fontWeight: WEIGHT.extraBold,
                  color: COLORS.whiteSecondary70,
                }}
              >
                {step.sublabel.toUpperCase()}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
