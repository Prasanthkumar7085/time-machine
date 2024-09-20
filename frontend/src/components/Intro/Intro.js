import { extend } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Details from "./Details";
import { MeshLine, MeshLineMaterial } from "./MeshLine";

extend({ MeshLine, MeshLineMaterial, OrbitControls });

const colors = {
  sunnyRainbow: ["#fff"],
};

export default function Intro() {
  const scientistName = useSelector((state) => state.user.scientistName);
  const selectedGameId = useSelector((state) => state.game.selectedGameId);
  const selectedType = useSelector((state) => state.game.selectedType);

  return (
    <div className="w-full h-[calc(100%-5rem)]">
      <Details
        scientistName={scientistName}
        gameId={selectedGameId}
        selectedType={selectedType}
      />
    </div>
  );
}
