#!/usr/bin/env node
// Converts a .srt subtitle file into the { captions: [{ text, start, end }] }
// JSON format used by the CaptionOverlay / MasterVideo compositions.
//
// Usage: node scripts/srt-to-captions.cjs <input.srt> <output.json>

const fs = require("fs");
const path = require("path");

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/srt-to-captions.cjs <input.srt> <output.json>");
  process.exit(1);
}

const timeToSeconds = (timecode) => {
  const [h, m, rest] = timecode.split(":");
  const [s, ms] = rest.split(",");
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
};

const raw = fs.readFileSync(inputPath, "utf8").replace(/\r\n/g, "\n");
const blocks = raw
  .split(/\n\n+/)
  .map((block) => block.trim())
  .filter(Boolean);

const captions = blocks.map((block) => {
  const lines = block.split("\n");
  const timecodeLine = lines.find((line) => line.includes("-->"));

  if (!timecodeLine) {
    throw new Error(`Couldn't find a timecode line in this cue:\n${block}`);
  }

  const timecodeIndex = lines.indexOf(timecodeLine);
  const [startRaw, endRaw] = timecodeLine.split("-->").map((s) => s.trim());
  const text = lines
    .slice(timecodeIndex + 1)
    .join(" ")
    .replace(/<[^>]+>/g, "") // strip SRT formatting tags like <i>...</i>
    .trim();

  return {
    text,
    start: Number(timeToSeconds(startRaw).toFixed(3)),
    end: Number(timeToSeconds(endRaw).toFixed(3)),
  };
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify({ captions }, null, 2) + "\n");

console.log(`Wrote ${captions.length} captions to ${outputPath}`);
