import { loadFont } from "@remotion/google-fonts/Montserrat";

// Master visual system: lock these down once, every scene component reads
// from here. Never hardcode a color or font elsewhere.

export const COLORS = {
  black: "#000000",
  white: "#FFFFFF",
  whiteSecondary70: "rgba(255,255,255,0.7)",
  whiteSecondary40: "rgba(255,255,255,0.4)",
  red: "#FF2B2B",
} as const;

export const { fontFamily: MONTSERRAT } = loadFont("normal", {
  weights: ["500", "800", "900"],
});

export const WEIGHT = {
  medium: 500,
  extraBold: 800,
  black: 900,
} as const;

// Standard entrance used by most text: opacity 0->1, translateY +30->0,
// scale 0.92->1.00. HeroText/HeroStatement use a punchier scale curve
// (0.82 -> 1.08 -> 1.00) defined locally where it's used.
export const ENTRANCE = {
  translateYFrom: 30,
  scaleFrom: 0.92,
  scaleTo: 1,
} as const;
