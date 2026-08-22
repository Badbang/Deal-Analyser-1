// Sparse keyword pops over presenter footage -- the only graphic treatment
// for most of the video besides the 6 hero scenes. Frame numbers are each
// keyword's actual cue window in the final SRT (see keep-quiet-youtube-
// final.json), not estimates. "READY" is intentionally omitted: its cue
// (17.4s) is the same moment HERO 2 (PAST -> FUTURE) begins, so a separate
// pop there would collide with the hero scene.
export const keywordMoments: { word: string; startFrame: number; endFrame: number }[] = [
  { word: "KEEP QUIET", startFrame: 433, endFrame: 503 }, // 14.433-16.766s
  { word: "COMPARE", startFrame: 994, endFrame: 1070 }, // 33.133-35.666s
  { word: "PROTECT", startFrame: 1200, endFrame: 1303 }, // 40.0-43.433s
  { word: "TIMING", startFrame: 2519, endFrame: 2620 }, // 83.966-87.333s
  { word: "DOUBT", startFrame: 5316, endFrame: 5390 }, // 177.2-179.666s
  { word: "APPROVAL", startFrame: 12238, endFrame: 12347 }, // 407.933-411.566s
  { word: "RESULT", startFrame: 12871, endFrame: 12936 }, // 429.033-431.2s
];
