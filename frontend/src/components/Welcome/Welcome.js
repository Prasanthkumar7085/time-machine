import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeMachineImage from "../../assets/images/TimeMachineImage.png";
import { MeshLine, MeshLineMaterial } from "../Intro/MeshLine";
import Space from "../Intro/Space";
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
    "relative w-full transition-all duration-300 group indicator ";

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
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white font-[700] font-primary   md:text-[15px] xl:text-[17px] xxl:text-[20px] ">
          Welcome, Dr.{scientistName}.
        </h3>
        <h3 className="text-white  leading-8 font-primary md:text-[15px] xl:text-[17px] xxl:text-[20px]  font-[700] ">
          Please step into the time machine
        </h3>
      </div>

      <figure className={figStyle}>
        <div className="absolute w-full h-full">
          <Canvas
            camera={{ fov: 100, position: [0, 0, 30] }}
            onCreated={({ gl, size, camera }) => {
              if (size.width < 600) {
                camera.position.z = 45;
              }
            }}
          >
            <Space count={1000} colors={colors.sunnyRainbow} />
          </Canvas>
        </div>
        <button
          class="btn md:text-[14px] xl:text-[16px] xxl:text-[19px] font-primary absolute top-[47%] left-[45%] w-[144px] h-10 bg-white bg-opacity-10 rounded-[23px] border border-white backdrop-blur-[2px] border-r-0 text-[#fff] hover:bg-white/10 "
          onClick={() => {
            navigate("/intro");
          }}
        >
          Enter game
        </button>

        <div className="w-full mb-4">
          <img
            src={TimeMachineImage}
            alt="US Poverty"
            className="object-fill h-full w-[100%]"
          />
        </div>
      </figure>
    </div>
  );
}
