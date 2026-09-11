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
import { CoffeeFloat } from "./compositions/CoffeeFloat";
import { AnimatedList, animatedListSchema } from "./compositions/AnimatedList";
import { PunchInText, punchInTextSchema } from "./compositions/PunchInText";
import { StatCallout, statCalloutSchema } from "./compositions/StatCallout";
import { QuoteCard, quoteCardSchema } from "./compositions/QuoteCard";
import { EndCard, endCardSchema } from "./compositions/EndCard";
import exampleCaptions from "./data/example-captions.json";
import fullVideoCaptions from "./data/full-video-captions.json";

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
        id="CoffeeFloat"
        component={CoffeeFloat}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="AnimatedList"
        component={AnimatedList}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        schema={animatedListSchema}
        defaultProps={{
          backgroundColor: "#141412",
          items: [
            { name: "Item One", color: "#3b82f6" },
            { name: "Item Two", color: "#60a5fa" },
            { name: "Item Three", color: "#93c5fd" },
          ],
        }}
      />

      <Composition
        // "I was scared to post my first YouTube video" - the two takeaways, recapped.
        id="LessonsList"
        component={AnimatedList}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        schema={animatedListSchema}
        defaultProps={{
          backgroundColor: "#141412",
          items: [
            { name: "Lesson 1: Don't wait for the perfect time to start.", color: "#86A8E7" },
            { name: "Lesson 2: Honour yourself with your words.", color: "#3b82f6" },
          ],
        }}
      />

      <Composition
        // Scene 1: "TERRIFIED" punches in white, hard-cuts to red, shakes, then holds.
        // Timed to the SRT's opening line (0:00-3.133s), then hard cut to footage.
        id="Scene1Terrified"
        component={PunchInText}
        durationInFrames={94}
        fps={30}
        width={1920}
        height={1080}
        schema={punchInTextSchema}
        defaultProps={{
          text: "TERRIFIED",
          backgroundColor: "#0A0A0A",
          startColor: "#FFFFFF",
          impactColor: "#FF0000",
        }}
      />

      <Composition
        // "80% of your thoughts daily are not real" (4:37.5-4:42.666 in the SRT)
        id="StatCallout"
        component={StatCallout}
        durationInFrames={155}
        fps={30}
        width={1920}
        height={1080}
        schema={statCalloutSchema}
        defaultProps={{
          value: "80%",
          caption: "of your thoughts daily are not real",
          backgroundColor: "#0A0A0A",
          accentColor: "#FFC145",
        }}
      />

      <Composition
        // "Perfection is a killer of all progress." (5:00.966-5:04.333 in the SRT)
        id="QuoteCard"
        component={QuoteCard}
        durationInFrames={101}
        fps={30}
        width={1920}
        height={1080}
        schema={quoteCardSchema}
        defaultProps={{
          quote: "Perfection is a killer of all progress.",
          backgroundColor: "#141412",
          accentColor: "#86A8E7",
        }}
      />

      <Composition
        // "Subscribe and like..." (6:22.366-6:29.566 in the SRT)
        id="EndCard"
        component={EndCard}
        durationInFrames={216}
        fps={30}
        width={1920}
        height={1080}
        schema={endCardSchema}
        defaultProps={{
          heading: "Subscribe",
          subtitle: "Watch my next video",
          backgroundColor: "#0A0A0A",
          accentColor: "#FF0000",
        }}
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
        // Full burned-in-ready captions for "I Was Scared to Post My First YouTube Video",
        // generated from the provided SRT.
        id="FullVideoCaptions"
        component={CaptionOverlay}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={captionOverlaySchema}
        defaultProps={fullVideoCaptions}
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
