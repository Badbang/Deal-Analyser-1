import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { lineEntrance } from "../animation";
import { COLORS, MONTSERRAT, WEIGHT } from "../theme";
import { AccentText } from "./AccentText";

// Small text fragments scattered around a center point, drifting inward and
// merging into a final phrase — e.g. DOUBT / NEGATIVE / QUESTION converging
// into "BORROWED DOUBT".
export const ThoughtParticles: React.FC<{
  centerText: string;
  particles: string[];
  accent?: string;
}> = ({ centerText, particles, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inward = interpolate(frame, [0, 55], [0, 1], { extrapolateRight: "clamp" });
  const particlesFade = interpolate(frame, [45, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {particles.map((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radiusX = 420;
        const radiusY = 280;
        const x = Math.cos(angle) * radiusX * (1 - inward * 0.9);
        const y = Math.sin(angle) * radiusY * (1 - inward * 0.9);
        const anim = lineEntrance({ frame, fps, delay: i * 5 });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px)`,
              opacity: anim.opacity * particlesFade,
              fontFamily: MONTSERRAT,
              fontWeight: WEIGHT.extraBold,
              fontSize: 34,
              color: COLORS.whiteSecondary40,
            }}
          >
            {particle}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          opacity: centerOpacity,
          fontFamily: MONTSERRAT,
          fontWeight: WEIGHT.black,
          fontSize: 96,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        <AccentText text={centerText} accent={accent} />
      </div>
    </AbsoluteFill>
  );
};
