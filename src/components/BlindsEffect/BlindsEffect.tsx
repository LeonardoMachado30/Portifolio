import "./effect";
import Image from "next/image";
import lightBlindsEffect from "@/assets/lightBlindsEffect.png";
export default function BlindsEffect(): JSX.Element {
  return (
    <>
      <canvas></canvas>

      <Image
        alt="Blind Effect"
        className="asset-img h-3/4 opacity-0 md:h-3/5"
        id="light-img"
        src={lightBlindsEffect}
        style={{ width: "100%" }}
      />
    </>
  );
}
