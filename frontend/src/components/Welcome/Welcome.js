import { OrbitControls } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Landing from "../../assets/images/Landing.webp";
import { MeshLine, MeshLineMaterial } from "../Intro/MeshLine";

extend({ MeshLine, MeshLineMaterial, OrbitControls });

const colors = {
  sunnyRainbow: ["#fff"],
};

let timer;
const easeInOutCubic = (t) => {
  return t / 25;
};

export default function Welcome() {
  const [counterState, setCounter] = React.useState(0.4);
  const [runCounter, setRunCounter] = React.useState(false);
  const scientistName = useSelector((state) => state.user.scientistName);
  const navigate = useNavigate();

  const figStyle =
    "relative w-full transition-all duration-300 cursor-pointer group cursor-pointer indicator ";

  useEffect(() => {
    if (!scientistName) {
      navigate("/scientist-name");
    }
  }, []);

  useEffect(() => {
    if (!runCounter) return;
    clearInterval(timer);
    timer = setInterval(() => {
      if (counterState >= 10) {
        clearInterval(timer);
        navigate("/intro");
        return;
      }
      setCounter((prev) => prev + easeInOutCubic(prev));
    }, 10);

    return () => clearInterval(timer);
  }, [counterState, runCounter]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full ">
      {/* <Canvas
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
      </Canvas> */}
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white text-[20px] font-menlo tracking-[.10rem] font-bold ">
          Welcome, Dr.{scientistName}.
        </h3>
        <h3 className="text-white text-[20px] font-menlo tracking-[.10rem] font-bold ">
          Please step into the time machine
        </h3>
      </div>
      <figure className={figStyle}>
        <button
          class="btn  bg-[#1e1e1e] absolute top-[47%] left-[45%] w-[144px] h-9 bg-white/10 rounded-[23px] border border-white backdrop-blur-sm text-[#fff] hover:bg-white/10 "
          onClick={() => {
            navigate("/intro");
          }}
        >
          Enter game
        </button>
        <div className="w-full h-[calc(100vh-11rem)]">
          <img
            src={Landing}
            alt="US Poverty"
            className="object-fill h-full w-[100%]"
          />
        </div>
      </figure>
    </div>
  );
}
