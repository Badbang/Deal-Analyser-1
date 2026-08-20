import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CoffeeBag } from "../components/CoffeeBag";
import { CoffeeBean } from "../components/CoffeeBean";

const BEANS = [
  { radius: 230, angle: 20, size: 70, bobSpeed: 0.9, bobAmount: 14, spinSpeed: 18 },
  { radius: 260, angle: 100, size: 60, bobSpeed: 0.7, bobAmount: 18, spinSpeed: -22 },
  { radius: 210, angle: 165, size: 55, bobSpeed: 1.1, bobAmount: 12, spinSpeed: 26 },
  { radius: 250, angle: 230, size: 65, bobSpeed: 0.8, bobAmount: 16, spinSpeed: -16 },
  { radius: 200, angle: 300, size: 50, bobSpeed: 1.0, bobAmount: 10, spinSpeed: 20 },
];

const ORBIT_DEGREES_PER_SECOND = 8;

export const CoffeeFloat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const orbitAngle = t * ORBIT_DEGREES_PER_SECOND;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #4f7d76 0%, #2c4f49 55%, #16302c 100%)",
      }}
    >
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <CoffeeBag size={180} />
      </AbsoluteFill>

      {BEANS.map((bean, i) => {
        const angle = ((bean.angle + orbitAngle) * Math.PI) / 180;
        const bob = Math.sin(t * bean.bobSpeed * Math.PI * 2 + i) * bean.bobAmount;
        const x = width / 2 + Math.cos(angle) * bean.radius - bean.size / 2;
        const y =
          height / 2 + Math.sin(angle) * bean.radius * 0.6 + bob - (bean.size * 1.3) / 2;
        const rotation = t * bean.spinSpeed;

        return (
          <div key={i} style={{ position: "absolute", left: x, top: y }}>
            <CoffeeBean size={bean.size} rotation={rotation} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
