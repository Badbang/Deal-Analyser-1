import { AbsoluteFill } from "remotion";
import { GateCards } from "../components/GateCards";
import { COLORS } from "../theme";

export const GateCardsDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, alignItems: "center", justifyContent: "center" }}>
      <GateCards
        steps={[
          { number: 1, sublabel: "Background" },
          { number: 2, sublabel: "Midground" },
          { number: 3, sublabel: "Foreground" },
        ]}
      />
    </AbsoluteFill>
  );
};
