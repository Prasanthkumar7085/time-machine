import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SoftShadows, Stars, Text } from "@react-three/drei";
import { Instances, Computers } from "./Computers";

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
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
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

export default function Spaceship({ number, setRunCounter }) {
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
      <pointLight position={[-20, -10, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
      <group position={[0, -2, 0]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color="#080f24" />
          {/* <shadowMaterial attach="material" opacity={0.8} color="red" /> */}
        </mesh>
        <Spheres number={number} setRunCounter={setRunCounter} />
        <group rotation={[0, -Math.PI / 7, 0]}>
          <Text
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 6.7, 0]}
            scale={0.3}
          >
            Welcome, Dr. Van Nostrand.
          </Text>
          <Text
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 6.2, 0]}
            scale={0.3}
          >
            Please step into time machine.
          </Text>
        </group>
      </group>
      <Instances>
        <Computers
          scale={2}
          position={[1, -3.5, -2]}
          rotation={[0, -Math.PI / 8, 0]}
          name="Dr.Van Nostrand"
        />
      </Instances>

      <Stars radius={300} depth={50} count={4000} factor={10} />
    </Canvas>
  );
}
