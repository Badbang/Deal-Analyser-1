import { AbsoluteFill, Sequence } from "remotion";
import { AudienceDiagram } from "../components/AudienceDiagram";
import { ChapterCard } from "../components/ChapterCard";
import { Comparison } from "../components/Comparison";
import { FlowDiagram } from "../components/FlowDiagram";
import { HeroStatement } from "../components/HeroStatement";
import { HeroText } from "../components/HeroText";
import { KeywordPop } from "../components/KeywordPop";
import { KineticText } from "../components/KineticText";
import { ProgressTimeline } from "../components/ProgressTimeline";
import { SubscribeButton } from "../components/SubscribeButton";
import { ThoughtParticles } from "../components/ThoughtParticles";
import { YouTubeIcon } from "../components/YouTubeIcon";
import { scenes01to10 } from "../scenes/scenes-01-10";
import { Beat, SceneConfig } from "../scenes/types";
import { COLORS } from "../theme";

const BeatRenderer: React.FC<{ beat: Beat }> = ({ beat }) => {
  switch (beat.component) {
    case "KineticText":
      return <KineticText {...beat.props} />;
    case "KeywordPop":
      return <KeywordPop {...beat.props} />;
    case "HeroText":
      return <HeroText {...beat.props} />;
    case "HeroStatement":
      return <HeroStatement {...beat.props} />;
    case "ChapterCard":
      return <ChapterCard {...beat.props} />;
    case "Comparison":
      return <Comparison {...beat.props} />;
    case "FlowDiagram":
      return <FlowDiagram {...beat.props} />;
    case "ThoughtParticles":
      return <ThoughtParticles {...beat.props} />;
    case "AudienceDiagram":
      return <AudienceDiagram {...beat.props} />;
    case "ProgressTimeline":
      return <ProgressTimeline {...beat.props} />;
    case "YouTubeIcon":
      return <YouTubeIcon {...beat.props} />;
    case "SubscribeButton":
      return <SubscribeButton {...beat.props} />;
  }
};

const positionStyle = (position: Beat["position"] = "center"): React.CSSProperties => {
  if (position === "corner-tr") {
    return { position: "absolute", top: 48, right: 64 };
  }
  if (position === "bottom") {
    return {
      position: "absolute",
      bottom: 90,
      width: "100%",
      display: "flex",
      justifyContent: "center",
    };
  }
  return { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" };
};

// PRESENTER/PRESENTER+TRANSPARENT scenes fall back to solid black until real
// presenter footage is supplied (there's no <OffthreadVideo> source yet) --
// swap this for the actual footage layer once it's uploaded.
const backgroundFor = (mode: SceneConfig["mode"]): string => {
  if (mode === "transparent") return "transparent";
  return COLORS.black;
};

const Scene: React.FC<{ scene: SceneConfig }> = ({ scene }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: backgroundFor(scene.mode) }}>
      {scene.beats.map((beat, i) => (
        <Sequence key={i} from={beat.delayFrames} durationInFrames={beat.durationInFrames}>
          <div style={positionStyle(beat.position)}>
            <BeatRenderer beat={beat} />
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const calculateScenesMetadata = ({ props }: { props: { scenes: SceneConfig[] } }) => {
  const lastScene = props.scenes[props.scenes.length - 1];
  return {
    fps: 30,
    durationInFrames: lastScene.startFrame + lastScene.durationInFrames,
  };
};

export const Scenes: React.FC<{ scenes: SceneConfig[] }> = ({ scenes }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {scenes.map((scene) => (
        <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const defaultScenesProps = { scenes: scenes01to10 };
