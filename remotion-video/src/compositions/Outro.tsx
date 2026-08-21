import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { TitleCard } from "../components/TitleCard";

export const outroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  accentColor: zColor(),
  backgroundColor: zColor(),
});

export const Outro: React.FC<z.infer<typeof outroSchema>> = ({
  title,
  subtitle,
  accentColor,
  backgroundColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <TitleCard title={title} subtitle={subtitle} accentColor={accentColor} />
    </AbsoluteFill>
  );
};
