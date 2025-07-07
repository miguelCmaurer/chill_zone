import { useState } from "react";
import { useSearchParams } from "react-router";
import { LoadImg } from "./LoadImg";
import { FireFlyAnimation } from "./FireFlyAnimation";
import { SmokeAnimation } from "./SmokeAnimation";
import { SparkAnimation } from "./SparksAnimation";

export function Zone() {
  const [searchParams] = useSearchParams();
  const base = searchParams.get("base");
  const [fireFly, setFireFly] = useState(0);

  const getButtonText = () => {
    switch (fireFly) {
      case 0:
        return "FireFly";
      case 1:
        return "Smoke";
      case 2:
        return "Spark";
      default:
        return "Unknown";
    }
  };

  const handleButtonClick = () => {
    setFireFly((prevState) => (prevState + 1) % 3); // Cycle through 0, 1, 2
  };

  return (
    <div className="h-full w-full bg-black relative">
      <LoadImg
        img={base}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      <FireFlyAnimation
        className={`${fireFly !== 0 && "pointer-events-none"} w-full h-full`}
      />
      <SmokeAnimation
        className={`${fireFly !== 1 && "pointer-events-none"} w-full h-full`}
      />
      <SparkAnimation
        className={`${fireFly !== 2 && "pointer-events-none"} w-full h-full`}
      />
      <button
        onClick={handleButtonClick}
        className="absolute bg-red-600 h-fit w-fit"
      >
        {getButtonText()}
      </button>
    </div>
  );
}
