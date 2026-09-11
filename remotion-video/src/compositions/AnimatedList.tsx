import { zColor } from "@remotion/zod-types";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const animatedListSchema = z.object({
  backgroundColor: zColor(),
  items: z.array(
    z.object({
      name: z.string(),
      color: zColor(),
    }),
  ),
});

export const AnimatedList: React.FC<z.infer<typeof animatedListSchema>> = ({
  backgroundColor,
  items,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
        }}
      >
        {items.map((item, i) => {
          const delay = i * 5;

          // Slide in from left
          const slideX = spring({
            frame: frame - delay,
            fps,
            from: -100,
            to: 0,
            config: {
              damping: 12,
              mass: 0.5,
            },
          });

          // Fade in
          const opacity = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1,
            config: {
              damping: 12,
              mass: 0.5,
            },
          });

          // Scale up
          const scale = spring({
            frame: frame - delay,
            fps,
            from: 0.3,
            to: 1,
            config: {
              damping: 12,
              mass: 0.5,
            },
          });

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                transform: `translateX(${slideX}px) scale(${scale})`,
                opacity,
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: "3.5rem",
                  fontWeight: 400,
                }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
