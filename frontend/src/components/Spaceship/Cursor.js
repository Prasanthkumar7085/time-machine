import { useRef } from "react";
import { useGLTF, Edges } from "@react-three/drei";
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
// import { LayerMaterial, Depth, Fresnel } from "lamina";

function Cursor(props) {
  // const ref = useRef();
  const { nodes } = useGLTF("/game/cursor.glb");
  // const gradient = 0.7;

  return (
    <mesh {...props} geometry={nodes.Cube.geometry}>
      {/* <LayerMaterial ref={ref} toneMapped={false}>
        <Depth
          colorA="#ff0080"
          colorB="black"
          alpha={1}
          mode="normal"
          near={0.5 * gradient}
          far={0.5}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA="blue"
          colorB="#f7b955"
          alpha={1}
          mode="add"
          near={2 * gradient}
          far={2}
          origin={[0, 1, 1]}
        />
        <Depth
          colorA="green"
          colorB="#f7b955"
          alpha={1}
          mode="add"
          near={3 * gradient}
          far={3}
          origin={[0, 1, -1]}
        />
        <Depth
          colorA="white"
          colorB="red"
          alpha={1}
          mode="overlay"
          near={1.5 * gradient}
          far={1.5}
          origin={[1, -1, -1]}
        />
        <Fresnel
          mode="add"
          color="white"
          intensity={0.5}
          power={1.5}
          bias={0.05}
        />
      </LayerMaterial> */}
      <Edges color="white" />
    </mesh>
  );
}

export default Cursor;
