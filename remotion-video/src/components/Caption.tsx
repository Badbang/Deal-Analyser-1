import { interpolate, useCurrentFrame } from "remotion";

const FADE_FRAMES = 6;

export const Caption: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // Scale the fade down for very short cues so the interpolate breakpoints
  // stay strictly increasing (0 < fade < durationInFrames - fade).
  const fade = Math.min(FADE_FRAMES, Math.floor(durationInFrames / 3));

  const opacity =
    fade <= 0
      ? 1
      : interpolate(
          frame,
          [0, fade, durationInFrames - fade, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 56,
          color: "white",
          background: "rgba(0,0,0,0.65)",
          padding: "12px 28px",
          borderRadius: 12,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        {text}
      </span>
    </div>
  );
};
