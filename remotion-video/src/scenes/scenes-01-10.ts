import { SceneConfig, tcFrame } from "./types";

// Batch 1: Scenes 01-10, per the master scene plan built from the FINAL SRT.
// Frame numbers are derived directly from the given timecodes (30fps).
//
// Simplification note: a few scenes describe a word changing color
// *mid-display* (e.g. Scene 03's "READY" turning red partway through the
// line staying on screen). Rather than build a one-off mid-beat recolor
// mechanism, those are implemented as the line entering already accented.
// Flag if frame-exact recoloring matters and I'll add it as a real feature.

const s1Start = tcFrame("00:00.033");
const s2Start = tcFrame("00:08.500");
const s3Start = tcFrame("00:09.700");
const s4Start = tcFrame("00:18.833");
const s5Start = tcFrame("00:22.333");
const s6Start = tcFrame("00:30.533");
const s7Start = tcFrame("00:40.100");
const s8Start = tcFrame("00:52.900");
const s9Start = tcFrame("01:04.500");
const s10Start = tcFrame("01:18.300");
const s10End = tcFrame("01:34.933");

export const scenes01to10: SceneConfig[] = [
  {
    id: 1,
    name: "YOUTUBE CHANNEL HOOK",
    startFrame: s1Start,
    durationInFrames: s2Start - s1Start,
    mode: "presenter",
    sfx: ["TEXT_POP", "SHORT_WHOOSH"],
    beats: [
      {
        component: "KineticText",
        delayFrames: 0,
        durationInFrames: tcFrame("00:01.933") - s1Start,
        props: { lines: ["STARTED A", "YOUTUBE CHANNEL?"], accent: "YOUTUBE" },
      },
      {
        component: "YouTubeIcon",
        delayFrames: 0,
        position: "corner-tr",
        props: { size: 70 },
      },
      {
        component: "KineticText",
        delayFrames: tcFrame("00:01.933") - s1Start,
        durationInFrames: tcFrame("00:04.300") - tcFrame("00:01.933"),
        props: { lines: ["THINKING OF", "STARTING ONE?"] },
      },
      {
        component: "KeywordPop",
        delayFrames: tcFrame("00:04.300") - s1Start,
        durationInFrames: tcFrame("00:05.933") - tcFrame("00:04.300"),
        props: { lines: ["EXCITED"] },
      },
      {
        component: "KineticText",
        delayFrames: tcFrame("00:05.933") - s1Start,
        props: { lines: ["EXCITED TO SHARE?"], accent: "EXCITED" },
      },
    ],
  },
  {
    id: 2,
    name: "WAIT",
    startFrame: s2Start,
    durationInFrames: s3Start - s2Start,
    mode: "black",
    sfx: ["HERO_IMPACT"],
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        props: { lines: ["WAIT."], fontSize: 140 },
      },
    ],
  },
  {
    id: 3,
    name: "THE PROMISE",
    startFrame: s3Start,
    durationInFrames: s4Start - s3Start,
    mode: "presenter",
    sfx: ["UI_TICK"],
    beats: [
      {
        component: "KineticText",
        delayFrames: tcFrame("00:11.033") - s3Start,
        durationInFrames: tcFrame("00:11.600") - tcFrame("00:11.033"),
        props: { lines: ["IN THIS VIDEO"], fontSize: 48 },
      },
      {
        component: "KineticText",
        delayFrames: tcFrame("00:11.600") - s3Start,
        durationInFrames: tcFrame("00:16.000") - tcFrame("00:11.600"),
        props: { lines: ["KEEP IT", "QUIET."], fontSize: 96 },
      },
      {
        component: "KineticText",
        delayFrames: tcFrame("00:16.000") - s3Start,
        props: { lines: ["UNTIL YOU'RE", "READY"], accent: "READY", fontSize: 56 },
      },
    ],
  },
  {
    id: 4,
    name: "PAST VS FUTURE",
    startFrame: s4Start,
    durationInFrames: s5Start - s4Start,
    mode: "black",
    sfx: ["HERO_IMPACT"],
    beats: [
      {
        component: "KineticText",
        delayFrames: 0,
        durationInFrames: tcFrame("00:19.500") - s4Start,
        props: { lines: ["THEY SEE YOUR"], fontSize: 64 },
      },
      {
        component: "Comparison",
        delayFrames: tcFrame("00:19.500") - s4Start,
        props: { leftText: "PAST", rightText: "FUTURE", style: "clash", winner: "right" },
      },
    ],
  },
  {
    id: 5,
    name: "THE OLD VERSION",
    startFrame: s5Start,
    durationInFrames: s6Start - s5Start,
    mode: "presenter",
    beats: [
      {
        component: "KineticText",
        delayFrames: 0,
        durationInFrames: 100,
        props: { lines: ["THEY REMEMBER"], fontSize: 48 },
      },
      {
        component: "KineticText",
        delayFrames: 100,
        props: { lines: ["YOU'RE", "CHANGING"], accent: "CHANGING", fontSize: 88 },
      },
    ],
  },
  {
    id: 6,
    name: "TELLING FAMILY & FRIENDS",
    startFrame: s6Start,
    durationInFrames: s7Start - s6Start,
    mode: "transparent",
    beats: [
      {
        component: "FlowDiagram",
        delayFrames: 0,
        props: {
          nodes: ["PAST", "TODAY", "YOUTUBE"],
          accentNode: "YOUTUBE",
          direction: "horizontal",
          mainText: {
            lines: ["THEY COMPARE", "WHO YOU ARE NOW", "TO WHO YOU WERE."],
            accent: "COMPARE",
          },
        },
      },
    ],
  },
  {
    id: 7,
    name: "THEY'RE TRYING TO PROTECT YOU",
    startFrame: s7Start,
    durationInFrames: s8Start - s7Start,
    mode: "presenter",
    sfx: ["UI_TICK"],
    beats: [
      {
        component: "ThoughtParticles",
        delayFrames: 0,
        props: {
          centerText: "THEY'RE TRYING TO PROTECT YOU.",
          particles: ["PROTECTION", "CONCERN", "CAUTION"],
          accent: "PROTECT",
        },
      },
    ],
  },
  {
    id: 8,
    name: '"REAL JOB"',
    startFrame: s8Start,
    durationInFrames: s9Start - s8Start,
    mode: "transparent",
    sfx: ["DIGITAL_CLICK"],
    beats: [
      {
        component: "Comparison",
        delayFrames: 0,
        durationInFrames: 200,
        props: { leftText: "9–5", rightText: "YOUTUBE", style: "meet" },
      },
      {
        component: "KineticText",
        delayFrames: 200,
        props: { lines: ["YOU DON'T", "HAVE TO QUIT."], fontSize: 72 },
      },
    ],
  },
  {
    id: 9,
    name: "DEFINE YOUR SEASON",
    startFrame: s9Start,
    durationInFrames: s10Start - s9Start,
    mode: "black",
    sfx: ["TIMELINE_TICK"],
    beats: [
      {
        component: "ProgressTimeline",
        delayFrames: 0,
        props: {
          startLabel: "START",
          endLabel: "SHARE",
          markerLabel: "READY",
          mainText: { lines: ["DEFINE", "YOUR SEASON."], accent: "SEASON" },
        },
      },
    ],
  },
  {
    id: 10,
    name: "TIMING",
    startFrame: s10Start,
    durationInFrames: s10End - s10Start,
    mode: "presenter",
    sfx: ["UI_TICK"],
    beats: [
      {
        component: "KeywordPop",
        delayFrames: 0,
        props: { lines: ["WHEN", "SHOULD YOU SHARE?"], accent: "WHEN" },
      },
      {
        component: "KineticText",
        delayFrames: tcFrame("01:30.933") - s10Start,
        position: "bottom",
        props: { lines: ["TIMING MATTERS"], fontSize: 44 },
      },
    ],
  },
];
