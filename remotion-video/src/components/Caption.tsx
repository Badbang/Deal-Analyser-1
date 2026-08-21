import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const RED = "#e0263f";
const FADE_FRAMES = 6;

// Word-by-word "kinetic" caption: each word pops in and highlights red while
// it's being spoken, then settles back to white. Word timing is estimated by
// splitting the cue's total duration evenly across its words, since only
// line-level (not word-level) timestamps are available from most .srt files.
export const Caption: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ").filter(Boolean);
  const perWord = durationInFrames / words.length;
  const activeIndex = Math.min(words.length - 1, Math.floor(frame / Math.max(1, perWord)));

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
        bottom: 140,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          textAlign: "center",
          maxWidth: "85%",
          letterSpacing: -1,
        }}
      >
        {words.map((word, i) => {
          const wordStart = i * perWord;
          const scale = Math.min(
            1.15,
            spring({ frame: frame - wordStart, fps, config: { damping: 12, mass: 0.4 } }),
          );
          const isActive = i === activeIndex;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                margin: "0 10px",
                color: isActive ? RED : "white",
                transform: `scale(${scale})`,
                textShadow: "0 4px 18px rgba(0,0,0,0.55)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
