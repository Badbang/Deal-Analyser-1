import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

// Scene 1 spec (2s @ 1920x1080):
// 0.00-0.30s  word appears small, startColor
// 0.30-0.60s  punches forward (scale overshoots, then settles)
// 0.60s       color hard-cuts startColor -> impactColor
// 0.60-0.75s  aggressive shake, decaying to still
// 0.75-2.00s  holds large and still, then hard cut to footage (outside this composition)
const APPEAR_END = 0.3;
const PUNCH_OVERSHOOT_AT = 0.45;
const PUNCH_END = 0.6;
const SHAKE_END = 0.75;

const SMALL_SCALE = 0.5;
const OVERSHOOT_SCALE = 1.42;
const HELD_SCALE = 1.3;
const SHAKE_AMPLITUDE_PX = 18;
const SHAKE_ROTATION_DEG = 4;

export const punchInTextSchema = z.object({
  text: z.string(),
  backgroundColor: zColor(),
  startColor: zColor(),
  impactColor: zColor(),
});

export const PunchInText: React.FC<z.infer<typeof punchInTextSchema>> = ({
  text,
  backgroundColor,
  startColor,
  impactColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const scale = interpolate(
    t,
    [0, APPEAR_END, PUNCH_OVERSHOOT_AT, PUNCH_END],
    [SMALL_SCALE, SMALL_SCALE, OVERSHOOT_SCALE, HELD_SCALE],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = interpolate(t, [0, 0.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const color = t < PUNCH_END ? startColor : impactColor;

  // Shake only runs in the 0.6-0.75s window, decaying to zero by the end.
  const shakeEnvelope =
    t < PUNCH_END
      ? 0
      : interpolate(t, [PUNCH_END, SHAKE_END], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const shakeX = shakeEnvelope * SHAKE_AMPLITUDE_PX * (random(`shake-x-${frame}`) * 2 - 1);
  const shakeY =
    shakeEnvelope * (SHAKE_AMPLITUDE_PX / 2) * (random(`shake-y-${frame}`) * 2 - 1);
  const shakeRotate =
    shakeEnvelope * SHAKE_ROTATION_DEG * (random(`shake-r-${frame}`) * 2 - 1);

  return (
    <AbsoluteFill style={{ backgroundColor, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${scale}) rotate(${shakeRotate}deg)`,
          opacity,
          color,
          fontSize: 180,
          fontWeight: 900,
          fontFamily: "Helvetica, Arial, sans-serif",
          letterSpacing: 4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
