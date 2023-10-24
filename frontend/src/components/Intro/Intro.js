import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshLine, MeshLineMaterial } from "./MeshLine";
import Space from "./Space";
import Details from "./Details";
import { Stars } from "@react-three/drei";
import { useSelector } from "react-redux";

extend({ MeshLine, MeshLineMaterial, OrbitControls });

const colors = {
  sunnyRainbow: ["#fff"],
};

export default function Intro() {
  const scientistName = useSelector((state) => state.user.scientistName);
  const selectedGameId = useSelector((state) => state.game.selectedGameId);
  const selectedType = useSelector((state) => state.game.selectedType);

  return (
    <div className="w-full h-[calc(100%-4rem)]">
      <Canvas
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl, size, camera }) => {
          if (size.width < 600) {
            camera.position.z = 45;
          }
          gl.setClearColor(new THREE.Color("#080f24"));
        }}
      >
        <Space count={1000} colors={colors.sunnyRainbow} />
        <Stars radius={100} depth={50} count={5000} factor={2} />
      </Canvas>
      <Details
        scientistName={scientistName}
        gameId={selectedGameId}
        selectedType={selectedType}
      />
    </div>
  );
}
