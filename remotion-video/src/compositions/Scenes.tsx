import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { Comparison } from "../components/Comparison";
import { FlowDiagram } from "../components/FlowDiagram";
import { HeroStatement } from "../components/HeroStatement";
import { HeroText } from "../components/HeroText";
import { KeywordPop } from "../components/KeywordPop";
import { KineticText } from "../components/KineticText";
import { SubscribeButton } from "../components/SubscribeButton";
import { TextStrike } from "../components/TextStrike";
import { ThoughtParticles } from "../components/ThoughtParticles";
import { YouTubeIcon } from "../components/YouTubeIcon";
import { heroScenes } from "../scenes/heroScenes";
import { keywordMoments } from "../scenes/keywordMoments";
import { Beat, SceneConfig } from "../scenes/types";
import { COLORS } from "../theme";

// The full video's length (30fps), from the final SRT: 07:33.133.
const FULL_VIDEO_DURATION = 13594;

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
    case "Comparison":
      return <Comparison {...beat.props} />;
    case "FlowDiagram":
      return <FlowDiagram {...beat.props} />;
    case "ThoughtParticles":
      return <ThoughtParticles {...beat.props} />;
    case "TextStrike":
      return <TextStrike {...beat.props} />;
    default:
      return null;
  }
};

const positionStyle = (position: Beat["position"] = "center"): React.CSSProperties => {
  if (position === "corner-tr") {
    return { position: "absolute", top: 40, right: 60 };
  }
  if (position === "left") {
    return {
      position: "absolute",
      top: 0,
      left: 100,
      width: "50%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    };
  }
  return { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" };
};

const Scene: React.FC<{ scene: SceneConfig }> = ({ scene }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
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

export const calculateScenesMetadata = () => ({
  fps: 30,
  durationInFrames: FULL_VIDEO_DURATION,
});

// The lean build: presenter footage carries the video. 6 HERO scenes
// (opaque black) interrupt it at key moments; everything else is the
// footage itself plus sparse keyword pops and two small YouTube-icon
// beats (opening, CTA).
export const Scenes: React.FC<{ scenes: SceneConfig[] }> = ({ scenes }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <OffthreadVideo
        src={staticFile("source-video.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Audio src={staticFile("source-video.mp4")} />

      {keywordMoments.map((kw, i) => (
        <Sequence key={`kw-${i}`} from={kw.startFrame} durationInFrames={kw.endFrame - kw.startFrame}>
          <div style={positionStyle("left")}>
            <KeywordPop lines={[kw.word]} align="left" fontSize={70} />
          </div>
        </Sequence>
      ))}

      {/* Opening: small YouTube icon, through the hook and into HERO 1 */}
      <Sequence from={2} durationInFrames={254}>
        <div style={positionStyle("corner-tr")}>
          <YouTubeIcon size={90} />
        </div>
      </Sequence>

      {/* CTA: icon + subscribe button, "subscribe and leave a comment" */}
      <Sequence from={13195} durationInFrames={13354 - 13195}>
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <YouTubeIcon size={70} />
          <SubscribeButton />
        </div>
      </Sequence>

      {scenes.map((scene) => (
        <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const defaultScenesProps = { scenes: heroScenes };
