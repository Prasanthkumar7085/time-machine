import { SoftShadows, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Computers, Instances } from "./Computers";
import Cursor from "./Cursor";

function Sphere({ position = [0, 0, 0], setRunCounter, ...props }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame((state) => {
    ref.current.position.y = props.number;
    ref.current.scale.y = 3;
  });
  return (
    <mesh
      ref={ref}
      position={position}
      {...props}
      castShadow
      receiveShadow
      onClick={() => {
        setRunCounter(true);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="lightblue"
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  );
}

function Spheres({ number, setRunCounter }) {
  const ref = useRef();
  return (
    <group ref={ref} position={[0, 1.5, 0]}>
      <Sphere
        position={[0, 0, 0]}
        number={number}
        setRunCounter={setRunCounter}
      />
    </group>
  );
}

export default function Spaceship({ number, setRunCounter, scientistName }) {
  return (
    <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
      <SoftShadows />
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[10, 20, 10]}
        angle={0.12}
        penumbra={1}
        intensity={5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[0, 0, 0]} color="red" intensity={40} />
      <pointLight position={[0, 0, 0]} intensity={20} />
      <group position={[0, -2, 0]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color="#080f24" />
          {/* <shadowMaterial attach="material" opacity={0.8} color="red" /> */}
        </mesh>
        <Spheres number={number} setRunCounter={setRunCounter} />
        <group rotation={[0, -Math.PI / 7, 0]}>
          <Text
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 7, 0]}
            scale={0.5}
          >
            Welcome, {scientistName}.
          </Text>
          <Text
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 6.5, 0]}
            scale={0.5}
          >
            Please step into the time machine.
          </Text>
          <Cursor
            scale={[0.3, 0.4, 0.3]}
            position={[0, 5.6, 0]}
            rotation={[0, -Math.PI / 2, -Math.PI]}
          />
        </group>
      </group>
      <Instances>
        <Computers
          scale={2}
          position={[1, -3.5, -2]}
          rotation={[0, -Math.PI / 8, 0]}
          name={scientistName}
        />
      </Instances>
      {/* Postprocessing */}

      <Stars radius={300} depth={50} count={4000} factor={10} />
    </Canvas>
  );
}
