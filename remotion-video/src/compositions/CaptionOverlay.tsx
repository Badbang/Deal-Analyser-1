import { zColor } from "@remotion/zod-types";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { Caption } from "../components/Caption";
import { ReasonCard } from "../components/ReasonCard";

const captionSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
});

const reasonSchema = z.object({
  number: z.number(),
  icon: z.string(),
  label: z.string(),
  start: z.number(),
  duration: z.number(),
});

export const captionOverlaySchema = z.object({
  captions: z.array(captionSchema),
  reasons: z.array(reasonSchema).optional(),
  // Leave unset for a transparent render (compositing over real footage).
  // Set it when this composition is used inside a solid-background video.
  backgroundColor: zColor().optional(),
});

// Sets the video length to match the last caption or reason card, whichever
// ends later, so you don't have to hand-calculate durationInFrames.
export const calculateCaptionOverlayMetadata = ({
  props,
}: {
  props: z.infer<typeof captionOverlaySchema>;
}) => {
  const fps = 30;
  const captionEnd = Math.max(0, ...props.captions.map((c) => c.end));
  const reasonEnd = Math.max(0, ...(props.reasons ?? []).map((r) => r.start + r.duration));
  const lastEnd = Math.max(captionEnd, reasonEnd);
  return {
    fps,
    durationInFrames: Math.ceil(lastEnd * fps) + fps,
  };
};

// Transparent background: this composition is meant to be rendered with an
// alpha channel (e.g. --codec=vp8 or prores) and composited over real footage
// in another editor, rather than used as a standalone full-color scene.
export const CaptionOverlay: React.FC<z.infer<typeof captionOverlaySchema>> = ({
  captions,
  reasons,
  backgroundColor,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={backgroundColor ? { backgroundColor } : undefined}>
      {captions.map((caption, i) => {
        const from = Math.round(caption.start * fps);
        const durationInFrames = Math.round((caption.end - caption.start) * fps);
        return (
          <Sequence key={`caption-${i}`} from={from} durationInFrames={durationInFrames}>
            <Caption text={caption.text} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}

      {(reasons ?? []).map((reason, i) => {
        const from = Math.round(reason.start * fps);
        const durationInFrames = Math.round(reason.duration * fps);
        return (
          <Sequence key={`reason-${i}`} from={from} durationInFrames={durationInFrames}>
            <ReasonCard number={reason.number} icon={reason.icon} label={reason.label} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
