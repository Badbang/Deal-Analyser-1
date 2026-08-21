import { zColor } from "@remotion/zod-types";
import { fade } from "@remotion/transitions/fade";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { z } from "zod";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import {
  CaptionOverlay,
  calculateCaptionOverlayMetadata,
  captionOverlaySchema,
} from "./CaptionOverlay";

const INTRO_DURATION = 90;
const OUTRO_DURATION = 90;
const TRANSITION_DURATION = 15;

export const masterVideoSchema = z.object({
  introTitle: z.string(),
  introSubtitle: z.string(),
  accentColor: zColor(),
  backgroundColor: zColor(),
  captions: captionOverlaySchema.shape.captions,
  reasons: captionOverlaySchema.shape.reasons,
  outroTitle: z.string(),
  outroSubtitle: z.string(),
});

// Stitches Intro -> CaptionOverlay -> Outro into one continuous render with
// fade transitions between scenes, so a full video comes out of one render
// call instead of separate clips you'd have to assemble by hand.
export const calculateMasterVideoMetadata = ({
  props,
}: {
  props: z.infer<typeof masterVideoSchema>;
}) => {
  const fps = 30;
  const captionDuration = calculateCaptionOverlayMetadata({
    props: { captions: props.captions, reasons: props.reasons },
  }).durationInFrames;

  return {
    fps,
    durationInFrames:
      INTRO_DURATION + captionDuration + OUTRO_DURATION - TRANSITION_DURATION * 2,
  };
};

export const MasterVideo: React.FC<z.infer<typeof masterVideoSchema>> = ({
  introTitle,
  introSubtitle,
  accentColor,
  backgroundColor,
  captions,
  reasons,
  outroTitle,
  outroSubtitle,
}) => {
  const captionDuration = calculateCaptionOverlayMetadata({
    props: { captions, reasons },
  }).durationInFrames;

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
        <Intro
          title={introTitle}
          subtitle={introSubtitle}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={captionDuration}>
        <CaptionOverlay captions={captions} reasons={reasons} backgroundColor={backgroundColor} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
        <Outro
          title={outroTitle}
          subtitle={outroSubtitle}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
