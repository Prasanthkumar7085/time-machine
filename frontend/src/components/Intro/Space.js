import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";
import {
  createAttractor,
  updateAttractor,
  aizawaAttractor,
} from "./attractor.js";

const simulation = () => aizawaAttractor;

function StormLine({ radius, simulation, width, color }) {
  const line = useRef();

  useFrame(() => {
    if (line.current) {
      const nextPosition = updateAttractor(
        currentPosition,
        radius,
        simulation,
        0.003
      );

      line.current.advance(nextPosition);
    }
  });

  const [positions, currentPosition] = useMemo(() => createAttractor(5), []);

  return (
    <mesh>
      <meshLine ref={line} attach="geometry" points={positions} />
      <meshLineMaterial transparent lineWidth={width} color={color} />
    </mesh>
  );
}

function Space({ count, colors, radius = 20 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => {
        return {
          color: Random.pick(colors),
          width: Random.range(0.01, 0.015),
          speed: Random.range(0.001, 0.002),
          simulation: simulation(),
          radius: Random.range(0.5, 1.5) * radius,
        };
      }),
    [count, colors, radius]
  );

  return (
    <group>
      <group>
        {lines.map((props, index) => (
          <StormLine key={index} {...props} />
        ))}
      </group>
    </group>
  );
}

export default Space;
