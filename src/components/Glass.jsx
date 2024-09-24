import { MeshTransmissionMaterial, Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

export function Glass() {
  const { nodes } = useGLTF("/glass3.glb");
  const { viewport } = useThree();

  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },
  //   backside: { value: true },
  // });

  const textRef = useRef();
  const glassRef = useRef();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const cursor = {};
  cursor.x = 0;
  cursor.y = 0;

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });

  useFrame((state, delta) => {
    const parallaxX = -cursor.x * 0.5;
    const parallaxY = cursor.y * 0.5;

    state.camera.position.x +=
      (parallaxX - state.camera.position.x) * 5 * delta;
    state.camera.position.y +=
      (parallaxY - state.camera.position.y) * 5 * delta;
  });

  return (
    <group position={[0, -1.5, 3.4]} scale={[1.5, 1.5, 1.5]}>
      <Text
        ref={textRef}
        font="/Giphurs-Bold.ttf"
        fontSize={viewport.width / 15}
        position={[0, 0.5, -3.4]}
        rotation={[0, 0, -0.05]}
      >
        luis munhoz
      </Text>
      <mesh ref={glassRef} {...nodes.Plane} scale={(1.2, 1.2, 1.2)}>
        <MeshTransmissionMaterial
          thickness={3}
          roughness={0}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.05}
          backside
        />
      </mesh>
    </group>
  );
}
