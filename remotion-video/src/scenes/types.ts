import type { AudienceDiagram } from "../components/AudienceDiagram";
import type { ChapterCard } from "../components/ChapterCard";
import type { Comparison } from "../components/Comparison";
import type { FlowDiagram } from "../components/FlowDiagram";
import type { HeroStatement } from "../components/HeroStatement";
import type { HeroText } from "../components/HeroText";
import type { KeywordPop } from "../components/KeywordPop";
import type { KineticText } from "../components/KineticText";
import type { PresenterOverlay } from "../components/PresenterOverlay";
import type { ProgressTimeline } from "../components/ProgressTimeline";
import type { SubscribeButton } from "../components/SubscribeButton";
import type { TextStrike } from "../components/TextStrike";
import type { ThoughtParticles } from "../components/ThoughtParticles";
import type { YouTubeIcon } from "../components/YouTubeIcon";

type PropsOf<T> = T extends React.FC<infer P> ? P : never;

// Discriminated union: each beat names one of the 12 master components and
// carries exactly the props that component accepts.
export type Beat = (
  | { component: "KineticText"; props: PropsOf<typeof KineticText> }
  | { component: "KeywordPop"; props: PropsOf<typeof KeywordPop> }
  | { component: "HeroText"; props: PropsOf<typeof HeroText> }
  | { component: "HeroStatement"; props: PropsOf<typeof HeroStatement> }
  | { component: "ChapterCard"; props: PropsOf<typeof ChapterCard> }
  | { component: "Comparison"; props: PropsOf<typeof Comparison> }
  | { component: "FlowDiagram"; props: PropsOf<typeof FlowDiagram> }
  | { component: "ThoughtParticles"; props: PropsOf<typeof ThoughtParticles> }
  | { component: "AudienceDiagram"; props: PropsOf<typeof AudienceDiagram> }
  | { component: "ProgressTimeline"; props: PropsOf<typeof ProgressTimeline> }
  | { component: "YouTubeIcon"; props: PropsOf<typeof YouTubeIcon> }
  | { component: "SubscribeButton"; props: PropsOf<typeof SubscribeButton> }
  | { component: "TextStrike"; props: PropsOf<typeof TextStrike> }
  | { component: "PresenterOverlay"; props: PropsOf<typeof PresenterOverlay> }
) & {
  // Frames after the scene's own start, not absolute video frames.
  delayFrames: number;
  // Omit to run to the end of the scene.
  durationInFrames?: number;
  // "center" fills the frame; "left" constrains content to the left half
  // (use for anything over PRESENTER/TRANSPARENT footage, so it never
  // covers the subject); "bottom" sits in the lower third (for text that
  // ADDS alongside another beat rather than replacing it); "corner-tr" is
  // for small persistent icons (e.g. YouTubeIcon).
  position?: "center" | "left" | "bottom" | "corner-tr";
};

export type SceneConfig = {
  id: number;
  name: string;
  // Absolute video frame the scene starts/ends at (30fps).
  startFrame: number;
  durationInFrames: number;
  mode: "black" | "transparent" | "presenter";
  beats: Beat[];
  sfx?: string[];
  note?: string;
};

// "MM:SS.mmm" -> frame number at 30fps.
export const tcFrame = (timecode: string): number => {
  const [mm, rest] = timecode.split(":");
  const seconds = Number(mm) * 60 + Number(rest);
  return Math.round(seconds * 30);
};
