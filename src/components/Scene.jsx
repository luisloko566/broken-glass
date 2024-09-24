import { Canvas } from "@react-three/fiber";
import { Glass } from "./Glass";
import { Environment } from "@react-three/drei";

export function Scene() {
  return (
    <Canvas style={{ backgroundColor: "black" }}>
      <Environment preset="city" />
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Glass />
    </Canvas>
  );
}
