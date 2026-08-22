import { AbsoluteFill } from "remotion";
import { SplitScreen } from "../components/SplitScreen";
import { COLORS } from "../theme";

export const SplitScreenDemo: React.FC<{
  presenterSide: "left" | "right";
  lines: string[];
  accent: string;
}> = ({ presenterSide, lines, accent }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <SplitScreen presenterSide={presenterSide} lines={lines} accent={accent} />
    </AbsoluteFill>
  );
};
