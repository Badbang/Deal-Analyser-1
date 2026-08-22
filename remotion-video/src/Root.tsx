import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import {
  CaptionOverlay,
  calculateCaptionOverlayMetadata,
  captionOverlaySchema,
} from "./compositions/CaptionOverlay";
import { Intro, introSchema } from "./compositions/Intro";
import { Outro, outroSchema } from "./compositions/Outro";
import {
  MasterVideo,
  calculateMasterVideoMetadata,
  masterVideoSchema,
} from "./compositions/MasterVideo";
import { CoffeeFloat } from "./compositions/CoffeeFloat";
import { ReasonCardDemo, reasonCardDemoSchema } from "./compositions/ReasonCardDemo";
import { Scenes, calculateScenesMetadata, defaultScenesProps } from "./compositions/Scenes";
import { SplitScreenDemo } from "./compositions/SplitScreenDemo";
import { PipelineDiagramDemo } from "./compositions/PipelineDiagramDemo";
import { GateCardsDemo } from "./compositions/GateCardsDemo";
import exampleCaptions from "./data/example-captions.json";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Reusable templates: point --props at a per-video JSON file to reuse these */}
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        schema={introSchema}
        defaultProps={{
          title: "Deal Breakdown",
          subtitle: "Is this property worth it?",
          accentColor: "#86A8E7",
          backgroundColor: "#141412",
        }}
      />

      <Composition
        id="Outro"
        component={Outro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        schema={outroSchema}
        defaultProps={{
          title: "Thanks for Watching!",
          subtitle: "Subscribe for more like this",
          accentColor: "#86A8E7",
          backgroundColor: "#141412",
        }}
      />

      <Composition
        id="MasterVideo"
        component={MasterVideo}
        // Placeholder value: calculateMetadata below sets the real duration
        // from Intro + captions + Outro, minus the transition overlaps.
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={masterVideoSchema}
        defaultProps={{
          introTitle: "Deal Breakdown",
          introSubtitle: "Is this property worth it?",
          accentColor: "#86A8E7",
          backgroundColor: "#141412",
          captions: exampleCaptions.captions,
          outroTitle: "Thanks for Watching!",
          outroSubtitle: "Subscribe for more like this",
        }}
        calculateMetadata={calculateMasterVideoMetadata}
      />

      <Composition
        id="Scenes"
        component={Scenes}
        // Placeholder value: calculateMetadata below sets the real duration
        // from the last scene's start + duration.
        durationInFrames={2848}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultScenesProps}
        calculateMetadata={calculateScenesMetadata}
      />

      <Composition
        id="SplitScreenDemo"
        component={SplitScreenDemo}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          presenterSide: "right" as const,
          lines: ["AND THAT'S HOW YOU", "BUILD TRUST WITH VIEWERS."],
          accent: "TRUST",
        }}
      />

      <Composition
        id="PipelineDiagramDemo"
        component={PipelineDiagramDemo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="GateCardsDemo"
        component={GateCardsDemo}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ReasonCardDemo"
        component={ReasonCardDemo}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
        schema={reasonCardDemoSchema}
        defaultProps={{
          number: 1,
          icon: "🔒",
          label: "They See Your Past, Not Your Future",
          previewBackground: "#141412",
        }}
      />

      <Composition
        id="CoffeeFloat"
        component={CoffeeFloat}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CaptionOverlay"
        component={CaptionOverlay}
        // Placeholder value: calculateMetadata below sets the real duration
        // from the last caption's end time.
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={captionOverlaySchema}
        defaultProps={exampleCaptions}
        calculateMetadata={calculateCaptionOverlayMetadata}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
