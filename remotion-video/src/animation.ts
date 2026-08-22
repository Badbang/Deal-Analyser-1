import { interpolate, spring } from "remotion";
import { ENTRANCE } from "./theme";

// Standard entrance: opacity 0->1, translateY +30->0, scale 0.92->1.00.
// `delay` is in frames relative to the scene/component mounting.
export const lineEntrance = ({
  frame,
  fps,
  delay = 0,
}: {
  frame: number;
  fps: number;
  delay?: number;
}) => {
  const local = frame - delay;
  if (local < 0) {
    return { opacity: 0, translateY: ENTRANCE.translateYFrom, scale: ENTRANCE.scaleFrom };
  }
  const progress = spring({ frame: local, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(progress, [0, 1], [0, 1]),
    translateY: interpolate(progress, [0, 1], [ENTRANCE.translateYFrom, 0]),
    scale: interpolate(progress, [0, 1], [ENTRANCE.scaleFrom, ENTRANCE.scaleTo]),
  };
};

// Hero punch: scale 0.82 -> 1.08 -> 1.00, quick opacity fade-in.
export const heroPunch = ({
  frame,
  fps,
  delay = 0,
}: {
  frame: number;
  fps: number;
  delay?: number;
}) => {
  const local = frame - delay;
  if (local < 0) return { opacity: 0, scale: 0.82 };
  const progress = spring({ frame: local, fps, config: { damping: 12, mass: 0.6 } });
  return {
    opacity: interpolate(local, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
    scale: interpolate(progress, [0, 0.7, 1], [0.82, 1.08, 1], {
      extrapolateRight: "clamp",
    }),
  };
};
