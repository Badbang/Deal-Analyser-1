import { SceneConfig } from "./types";

// The 6 HERO black-screen moments that carry this video's visual identity.
// Everything else is presenter footage plus sparse keyword pops (see
// keywordMoments.ts) -- deliberately reduced from the earlier dense
// scene-by-scene build, per direction to let the presenter carry the video.
//
// Frame numbers come from the actual final-SRT cue containing each hero
// moment's narration (verified directly against src/data/
// keep-quiet-youtube-final.json), not hand-converted timecodes, since a
// couple of the originally-given timecodes for these moments didn't quite
// line up with the actual cue boundaries.

export const heroScenes: SceneConfig[] = [
  {
    id: 101,
    name: "HERO 1 — WAIT",
    startFrame: 256, // 8.533s
    durationInFrames: 330 - 256, // -> 11.0s
    mode: "black",
    sfx: ["HERO_IMPACT"],
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        props: { lines: ["WAIT."], fontSize: 140, accentLine: true },
      },
    ],
  },
  {
    id: 102,
    name: "HERO 2 — PAST → FUTURE",
    startFrame: 522, // 17.4s
    durationInFrames: 670 - 522, // -> 22.333s
    mode: "black",
    sfx: ["HERO_IMPACT"],
    beats: [
      {
        component: "KineticText",
        delayFrames: 0,
        durationInFrames: 20,
        props: { lines: ["THEY SEE YOUR"], fontSize: 64 },
      },
      {
        component: "Comparison",
        delayFrames: 20,
        durationInFrames: 100,
        props: { leftText: "PAST", rightText: "FUTURE", style: "clash", winner: "right" },
      },
      {
        component: "KineticText",
        delayFrames: 120,
        props: { lines: ["YOU ARE", "MOVING →"], fontSize: 40 },
      },
    ],
  },
  {
    id: 103,
    name: "HERO 3 — BORROWED DOUBT",
    startFrame: 3311, // 110.366s
    durationInFrames: 3793 - 3311, // -> 126.433s
    mode: "black",
    sfx: ["LOW_THUMP"],
    beats: [
      {
        component: "ThoughtParticles",
        delayFrames: 0,
        durationInFrames: 200,
        props: {
          centerText: "BORROWED DOUBT",
          particles: ["DOUBT", "NEGATIVE", "QUESTION", "FEAR"],
          accent: "DOUBT",
        },
      },
      {
        component: "HeroStatement",
        delayFrames: 200,
        props: {
          lines: [{ text: "BORROWED" }, { text: "DOUBT", color: "red", punch: true }],
        },
      },
    ],
  },
  {
    id: 104,
    name: "HERO 4 — QUESTION → DOUBT",
    startFrame: 5071, // 169.033s
    durationInFrames: 5476 - 5071, // -> 182.533s
    mode: "black",
    sfx: ["DIGITAL_CLICK", "LOW_THUMP"],
    beats: [
      {
        component: "FlowDiagram",
        delayFrames: 0,
        props: {
          nodes: ["QUESTION", "MENTAL BLOCKAGE", "NEGATIVE THOUGHT", "DOUBT"],
          accentNode: "DOUBT",
          direction: "vertical",
        },
      },
    ],
  },
  {
    id: 105,
    name: "HERO 5 — CONFIDENCE",
    startFrame: 6524, // 217.466s
    durationInFrames: 6829 - 6524, // -> 227.633s
    mode: "black",
    sfx: ["SHORT_WHOOSH", "LOW_THUMP", "UPLOAD_CLICK"],
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        durationInFrames: 70,
        props: { lines: ["CONFIDENCE"], fontSize: 110 },
      },
      {
        component: "TextStrike",
        delayFrames: 70,
        durationInFrames: 70,
        props: { lines: ["COMPLIMENTS"], fontSize: 90 },
      },
      {
        component: "HeroText",
        delayFrames: 140,
        durationInFrames: 70,
        props: { lines: ["= CONSISTENCY"], fontSize: 90 },
      },
      {
        component: "KineticText",
        delayFrames: 210,
        props: { lines: ["KEEP", "UPLOADING."], fontSize: 90 },
      },
    ],
  },
  {
    id: 106,
    name: "HERO 6 — FEAR → YOUR FUTURE (MAIN HERO)",
    startFrame: 12394, // 413.133s
    durationInFrames: 12539 - 12394, // -> 417.966s
    mode: "black",
    sfx: ["UI_TICK", "HERO_IMPACT"],
    note: "Main climax. No YouTube icon, no other graphics, no footage visible.",
    beats: [
      {
        component: "HeroStatement",
        delayFrames: 0,
        props: {
          lines: [
            { text: "DON'T LET" },
            { text: "SOMEONE ELSE'S" },
            { text: "FEAR", color: "red", punch: true },
            { text: "BECOME" },
            { text: "YOUR FUTURE.", punch: true },
          ],
          fontSize: 100,
        },
      },
    ],
  },
];
