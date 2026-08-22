import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";

const PANEL_HEIGHT = 110;
const GAP = 24;

// A stack of process-step panels (icon + decorative bars + label),
// connected by a vertical rail with a dot that travels down as the clip
// plays, highlighting whichever step it's passing.
export const PipelineDiagram: React.FC<{
  steps: { icon: string; label: string }[];
  // How many frames the dot takes to travel the whole rail. Pass the
  // enclosing Sequence's own duration, not the full composition's.
  durationInFrames: number;
}> = ({ steps, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalHeight = steps.length * PANEL_HEIGHT + (steps.length - 1) * GAP;
  const progress = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotY = progress * totalHeight;
  const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
        {steps.map((step, i) => {
          const anim = lineEntrance({ frame, fps, delay: i * 10 });
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              style={{
                opacity: anim.opacity,
                transform: `translateY(${anim.translateY}px)`,
                width: 460,
                height: PANEL_HEIGHT,
                borderRadius: 16,
                border: `2px solid ${isActive ? COLORS.red : COLORS.whiteSecondary40}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "0 24px",
                background: "#0a0a0a",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  border: `1px solid ${COLORS.whiteSecondary40}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <div style={{ display: "flex", gap: 4, height: 20, alignItems: "flex-end" }}>
                  {Array.from({ length: 10 }).map((_, barI) => (
                    <div
                      key={barI}
                      style={{
                        width: 4,
                        height: 6 + ((barI * 7 + i * 3) % 14),
                        background: isActive ? COLORS.red : COLORS.whiteSecondary40,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: MONTSERRAT,
                    fontWeight: WEIGHT.extraBold,
                    fontSize: 16,
                    letterSpacing: 3,
                    color: COLORS.whiteSecondary70,
                  }}
                >
                  {step.label.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "relative", width: 4, height: totalHeight, background: COLORS.whiteSecondary40 }}>
        <div
          style={{
            position: "absolute",
            top: dotY - 8,
            left: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: COLORS.red,
          }}
        />
      </div>
    </div>
  );
};
