import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

const STAGGER_FRAMES = 8;

// Presenter stays in a rounded card on one side; text lives entirely on the
// other side. Structurally prevents text/graphics from ever overlapping the
// subject, rather than relying on careful positioning per scene.
//
// `presenterSlot` renders the actual footage (e.g. <OffthreadVideo>) --
// until real footage exists, pass nothing and a placeholder card is shown.
export const SplitScreen: React.FC<{
  presenterSide: "left" | "right";
  lines: string[];
  accent?: string;
  fontSize?: number;
  presenterSlot?: React.ReactNode;
}> = ({ presenterSide, lines, accent, fontSize = 56, presenterSlot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const presenterCard = (
    <div
      style={{
        width: 420,
        height: 760,
        borderRadius: 28,
        overflow: "hidden",
        background: "#111111",
        border: `1px solid ${COLORS.whiteSecondary40}`,
      }}
    >
      {presenterSlot}
    </div>
  );

  const textBlock = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontFamily: MONTSERRAT,
        fontWeight: WEIGHT.extraBold,
        fontSize,
        color: COLORS.white,
        lineHeight: 1.25,
        maxWidth: 760,
      }}
    >
      {lines.map((line, i) => {
        const { opacity, translateY } = lineEntrance({
          frame,
          fps,
          delay: i * STAGGER_FRAMES,
        });
        return (
          <div key={i} style={{ opacity, transform: `translateY(${translateY}px)` }}>
            <AccentText text={line} accent={accent} />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: presenterSide === "left" ? "row" : "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
      }}
    >
      {presenterCard}
      {textBlock}
    </div>
  );
};
