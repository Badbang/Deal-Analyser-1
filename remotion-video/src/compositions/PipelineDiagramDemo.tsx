import { AbsoluteFill } from "remotion";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { COLORS } from "../theme";

const DURATION = 150;

export const PipelineDiagramDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, alignItems: "center", justifyContent: "center" }}>
      <PipelineDiagram
        durationInFrames={DURATION}
        steps={[
          { icon: "📄", label: "Script" },
          { icon: "🔊", label: "WhisperX" },
          { icon: "▶️", label: "Remotion" },
        ]}
      />
    </AbsoluteFill>
  );
};
