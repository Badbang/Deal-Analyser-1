import { SceneConfig } from "./types";

// Batch 2: Scenes 11-20, per the full 49-scene master spec. Frame numbers
// computed directly from the spec's timecodes (30fps), which are already
// synced to the final SRT.
//
// Deviation note: the spec's Scene 13 ("NOT TALENT") occupies the exact
// same time window as Scene 12 and is explicitly described as "an overlay
// evolution of Scene 12, not a separate cut." Rather than build true
// simultaneous scene layering, it's folded into Scene 12 as two additional
// sequential beats -- consistent with how this project already implements
// "evolving" scenes (nested beats within one scene) elsewhere.

const s11Start = 2794; // 01:33.133
const s12Start = 2934; // 01:37.800
const s14Start = 3311; // 01:50.366
const s15Start = 3793; // 02:06.433
const s16Start = 4312; // 02:23.733
const s17Start = 4495; // 02:29.833
const s18Start = 5071; // 02:49.033
const s19Start = 5476; // 03:02.533
const s20Start = 5632; // 03:07.733
const s20End = 5831; // 03:14.366

export const scenes11to20: SceneConfig[] = [
  {
    id: 11,
    name: "RETENTION OPEN LOOP",
    startFrame: s11Start,
    durationInFrames: s12Start - s11Start,
    mode: "black",
    sfx: ["LOW_RISER", "HERO_IMPACT"],
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        durationInFrames: 60,
        props: { lines: ["THINK THIS", "WAS HARD?"], fontSize: 90 },
      },
      {
        component: "HeroText",
        delayFrames: 68,
        props: { lines: ["WAIT."], fontSize: 140 },
      },
    ],
  },
  {
    id: 12,
    name: "IT HAPPENS IN YOUR MIND / NOT TALENT",
    startFrame: s12Start,
    durationInFrames: s14Start - s12Start,
    mode: "black",
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        durationInFrames: 90,
        props: { lines: ["IT STARTS", "IN YOUR MIND."], fontSize: 90 },
      },
      {
        component: "HeroText",
        delayFrames: 90,
        durationInFrames: 90,
        props: { lines: ["BORROWED", "DOUBT"], accent: "DOUBT", fontSize: 90 },
      },
      {
        component: "TextStrike",
        delayFrames: 180,
        durationInFrames: 100,
        props: { lines: ["NOT BECAUSE", "THEY'RE NOT TALENTED."], fontSize: 64 },
      },
      {
        component: "KineticText",
        delayFrames: 280,
        props: { lines: ["SOMETHING ELSE."], fontSize: 72 },
      },
    ],
  },
  {
    id: 14,
    name: "BORROWED DOUBT",
    startFrame: s14Start,
    durationInFrames: s15Start - s14Start,
    mode: "black",
    sfx: ["LOW_THUMP"],
    beats: [
      {
        component: "ThoughtParticles",
        delayFrames: 0,
        durationInFrames: 140,
        props: {
          centerText: "BORROWED DOUBT",
          particles: ["DOUBT", "NEGATIVE", "QUESTION"],
          accent: "DOUBT",
        },
      },
      {
        component: "HeroStatement",
        delayFrames: 140,
        props: {
          lines: [
            { text: "BORROWED" },
            { text: "DOUBT", color: "red", punch: true },
          ],
        },
      },
    ],
  },
  {
    id: 15,
    name: "YOUR ENVIRONMENT",
    startFrame: s15Start,
    durationInFrames: s16Start - s15Start,
    mode: "transparent",
    beats: [
      {
        component: "FlowDiagram",
        delayFrames: 0,
        position: "left",
        props: {
          nodes: ["YOU", "ENVIRONMENT"],
          accentNode: "ENVIRONMENT",
          direction: "vertical",
          mainText: {
            lines: ["YOUR ENVIRONMENT", "INFLUENCES YOU."],
            accent: "INFLUENCES",
          },
        },
      },
    ],
  },
  {
    id: 16,
    name: "TIMING AGAIN",
    startFrame: s16Start,
    durationInFrames: s17Start - s16Start,
    mode: "presenter",
    sfx: ["UI_TICK"],
    beats: [
      {
        component: "KeywordPop",
        delayFrames: 0,
        position: "left",
        props: { lines: ["TIMING", "MATTERS."], align: "left" },
      },
    ],
  },
  {
    id: 17,
    name: "CLOSE PEOPLE / QUESTIONS",
    startFrame: s17Start,
    durationInFrames: s18Start - s17Start,
    mode: "presenter",
    sfx: ["UI_TICK"],
    beats: [
      {
        component: "ThoughtParticles",
        delayFrames: 0,
        position: "left",
        props: {
          centerText: "WHAT IF THEY'RE RIGHT?",
          particles: ["?", "?", "?"],
        },
      },
    ],
  },
  {
    id: 18,
    name: "MENTAL BLOCKAGE",
    startFrame: s18Start,
    durationInFrames: s19Start - s18Start,
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
    id: 19,
    name: "INNER VOICE",
    startFrame: s19Start,
    durationInFrames: s20Start - s19Start,
    mode: "black",
    beats: [
      {
        component: "HeroText",
        delayFrames: 0,
        props: { lines: ["YOUR INNER", "VOICE"], fontSize: 110 },
      },
    ],
  },
  {
    id: 20,
    name: "NEGATIVE ASPECTS",
    startFrame: s20Start,
    durationInFrames: s20End - s20Start,
    mode: "presenter",
    beats: [
      {
        component: "PresenterOverlay",
        delayFrames: 0,
        position: "left",
        props: {
          markers: ["ERROR", "SLOW", "BAD"],
          mainText: { lines: ["YOU START SEEING", "EVERYTHING WRONG."], accent: "WRONG" },
        },
      },
    ],
  },
];
