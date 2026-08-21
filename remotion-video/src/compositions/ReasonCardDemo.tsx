import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { ReasonCard } from "../components/ReasonCard";

export const reasonCardDemoSchema = z.object({
  number: z.number(),
  icon: z.string(),
  label: z.string(),
  // Preview-only background so the (otherwise transparent) card is visible
  // in Studio / a rendered mp4. Not part of the real overlay's output.
  previewBackground: zColor(),
});

export const ReasonCardDemo: React.FC<z.infer<typeof reasonCardDemoSchema>> = ({
  number,
  icon,
  label,
  previewBackground,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: previewBackground }}>
      <ReasonCard number={number} icon={icon} label={label} />
    </AbsoluteFill>
  );
};
