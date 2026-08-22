import { Fragment } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { KineticText } from "./KineticText";

const STAGGER_FRAMES = 14;

// A chain of connected nodes appearing one at a time (QUESTION -> PROBLEM ->
// SOLUTION, or a presenter with PAST / TODAY / YOUTUBE connected around them).
export const FlowDiagram: React.FC<{
  nodes: string[];
  direction?: "vertical" | "horizontal";
  accentNode?: string;
  mainText?: { lines: string[]; accent?: string };
}> = ({ nodes, direction = "vertical", accentNode, mainText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        fontFamily: MONTSERRAT,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: direction === "vertical" ? "column" : "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        {nodes.map((node, i) => {
          const anim = lineEntrance({ frame, fps, delay: i * STAGGER_FRAMES });
          const isAccent = accentNode?.toLowerCase() === node.toLowerCase();

          return (
            <Fragment key={i}>
              {i > 0 && (
                <div style={{ opacity: anim.opacity, color: COLORS.whiteSecondary40, fontSize: 36 }}>
                  {direction === "vertical" ? "↓" : "→"}
                </div>
              )}
              <div
                style={{
                  opacity: anim.opacity,
                  transform: `translateY(${anim.translateY}px)`,
                  fontWeight: WEIGHT.extraBold,
                  fontSize: 44,
                  padding: "12px 26px",
                  border: `2px solid ${isAccent ? COLORS.red : COLORS.whiteSecondary40}`,
                  borderRadius: 10,
                  color: isAccent ? COLORS.red : COLORS.white,
                }}
              >
                {node}
              </div>
            </Fragment>
          );
        })}
      </div>

      {mainText && (
        <KineticText
          lines={mainText.lines}
          accent={mainText.accent}
          startDelay={nodes.length * STAGGER_FRAMES + 10}
          fontSize={56}
        />
      )}
    </div>
  );
};
