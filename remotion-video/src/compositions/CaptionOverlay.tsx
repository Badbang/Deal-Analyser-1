import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { Caption } from "../components/Caption";

const captionSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
});

export const captionOverlaySchema = z.object({
  captions: z.array(captionSchema),
});

// Sets the video length to match the last caption, so you don't have to
// hand-calculate durationInFrames every time the captions change.
export const calculateCaptionOverlayMetadata = ({
  props,
}: {
  props: z.infer<typeof captionOverlaySchema>;
}) => {
  const fps = 30;
  const lastEnd = Math.max(0, ...props.captions.map((c) => c.end));
  return {
    fps,
    durationInFrames: Math.ceil(lastEnd * fps) + fps,
  };
};

export const CaptionOverlay: React.FC<z.infer<typeof captionOverlaySchema>> = ({
  captions,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {captions.map((caption, i) => {
        const from = Math.round(caption.start * fps);
        const durationInFrames = Math.round((caption.end - caption.start) * fps);
        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <Caption text={caption.text} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
