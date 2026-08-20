import { interpolate, useCurrentFrame } from "remotion";

const FADE_FRAMES = 6;

export const Caption: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
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
