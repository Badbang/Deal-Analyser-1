import { COLORS } from "../theme";

// Renders a line of text, coloring `accent` (a word or phrase within it) red.
// Case-insensitive match; falls back to plain white text if accent isn't found.
export const AccentText: React.FC<{ text: string; accent?: string }> = ({
  text,
  accent,
}) => {
  if (!accent) return <>{text}</>;

  const index = text.toLowerCase().indexOf(accent.toLowerCase());
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + accent.length);
  const after = text.slice(index + accent.length);

  return (
    <>
      {before}
      <span style={{ color: COLORS.red }}>{match}</span>
      {after}
    </>
  );
};
