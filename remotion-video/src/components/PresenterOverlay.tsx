import { useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { KineticText } from "./KineticText";

const STAGGER_FRAMES = 10;

// A small decorative "editing timeline" with a few red markers -- used to
// suggest a video-editing context (e.g. spotting flaws in your own footage)
// without literally showing real editor UI.
export const PresenterOverlay: React.FC<{
  markers: string[];
  mainText?: { lines: string[]; accent?: string };
}> = ({ markers, mainText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
      <div
        style={{
          position: "relative",
          width: 420,
          height: 6,
          background: COLORS.whiteSecondary40,
          borderRadius: 3,
        }}
      >
        {markers.map((marker, i) => {
          const anim = lineEntrance({ frame, fps, delay: i * STAGGER_FRAMES });
          const left = ((i + 1) / (markers.length + 1)) * 100;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: -34,
                opacity: anim.opacity,
                transform: `translateX(-50%) translateY(${anim.translateY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: MONTSERRAT,
                  fontWeight: WEIGHT.extraBold,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: COLORS.red,
                }}
              >
                {marker.toUpperCase()}
              </div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.red }} />
            </div>
          );
        })}
      </div>

      {mainText && (
        <KineticText
          lines={mainText.lines}
          accent={mainText.accent}
          startDelay={markers.length * STAGGER_FRAMES + 10}
          fontSize={56}
          align="left"
        />
      )}
    </div>
  );
};
