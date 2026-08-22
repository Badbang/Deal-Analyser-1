import { SceneConfig } from "./types";

// Batch 1: Scenes 01-10, re-synced against the FINAL (post-CapCut-edit) SRT.
// The edit trimmed ~1.5s overall and re-chunked several subtitle cues
// (e.g. "wait" and "in this video" are now one cue), so these frame numbers
// are derived from the actual final cue timestamps, not the original
// scene-plan document's timecodes. They match the frame numbers in the
// full 49-scene master spec exactly.
//
// Every PRESENTER/TRANSPARENT-mode beat is positioned "left" so text and
// graphics never sit over the subject, who occupies the center/right of
// the footage. BLACK-mode scenes (no footage visible) stay centered.
//
// Simplification note: a few scenes describe a word changing color
// *mid-display* (e.g. Scene 03's "READY" turning red partway through the
// line staying on screen). Rather than build a one-off mid-beat recolor
// mechanism, those are implemented as the line entering already accented.

const s1Start = 2; // 0.066s
const s2Start = 256; // 8.533s
const s3Start = 285; // 9.5s
const s4Start = 558; // 18.6s
const s5Start = 670; // 22.333s
const s6Start = 921; // 30.7s
const s7Start = 1200; // 40.0s
const s8Start = 1584; // 52.8s
const s9Start = 1932; // 64.4s
const s10Start = 2348; // 78.266s
const s10End = 2794; // 93.133s

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
        durationInFrames: 59 - 0, // -> 1.966s
        position: "left",
        props: { lines: ["STARTED A", "YOUTUBE CHANNEL?"], accent: "YOUTUBE", align: "left" },
      },
      {
        component: "YouTubeIcon",
        delayFrames: 0,
        position: "corner-tr",
        props: { size: 150 },
      },
      {
        component: "KineticText",
        delayFrames: 59,
        durationInFrames: 131 - 59, // -> 4.366s
        position: "left",
        props: { lines: ["THINKING OF", "STARTING ONE?"], align: "left" },
      },
      {
        component: "KeywordPop",
        delayFrames: 131,
        durationInFrames: 180 - 131, // -> 6.0s
        position: "left",
        props: { lines: ["EXCITED"], align: "left" },
      },
      {
        component: "KineticText",
        delayFrames: 180,
        position: "left",
        props: { lines: ["EXCITED TO SHARE?"], accent: "EXCITED", align: "left" },
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
        delayFrames: 0,
        durationInFrames: 330 - s3Start, // -> 11.0s
        position: "left",
        props: { lines: ["IN THIS VIDEO"], fontSize: 48, align: "left" },
      },
      {
        component: "KineticText",
        delayFrames: 330 - s3Start,
        durationInFrames: 522 - 330, // -> 17.4s
        position: "left",
        props: { lines: ["KEEP IT", "QUIET."], fontSize: 96, align: "left" },
      },
      {
        component: "KineticText",
        delayFrames: 522 - s3Start,
        position: "left",
        props: { lines: ["UNTIL YOU'RE", "READY"], accent: "READY", fontSize: 56, align: "left" },
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
        durationInFrames: 588 - s4Start, // -> 19.6s
        props: { lines: ["THEY SEE YOUR"], fontSize: 64 },
      },
      {
        component: "Comparison",
        delayFrames: 588 - s4Start,
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
        position: "left",
        props: { lines: ["THEY REMEMBER"], fontSize: 48, align: "left" },
      },
      {
        component: "KineticText",
        delayFrames: 100,
        position: "left",
        props: { lines: ["YOU'RE", "CHANGING"], accent: "CHANGING", fontSize: 88, align: "left" },
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
        position: "left",
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
        position: "left",
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
        position: "left",
        props: { leftText: "9–5", rightText: "YOUTUBE", style: "meet" },
      },
      {
        component: "KineticText",
        delayFrames: 200,
        position: "left",
        props: { lines: ["YOU DON'T", "HAVE TO QUIT."], fontSize: 72, align: "left" },
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
        position: "left",
        props: { lines: ["WHEN", "SHOULD YOU SHARE?"], accent: "WHEN", align: "left" },
      },
      {
        component: "KineticText",
        delayFrames: 273, // 87.366s -> "when should you tell your family and friends"
        position: "bottom",
        props: { lines: ["TIMING MATTERS"], fontSize: 44 },
      },
    ],
  },
];
