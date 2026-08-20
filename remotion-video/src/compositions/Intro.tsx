import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { TitleCard } from "../components/TitleCard";

export const introSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  accentColor: zColor(),
  backgroundColor: zColor(),
});

export const Intro: React.FC<z.infer<typeof introSchema>> = ({
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
