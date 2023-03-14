import "./effect";
import Image from "next/image";
import lightBlindsEffect from "@/assets/lightBlindsEffect.png";
export default function BlindsEffect(): JSX.Element {
  return (
    <>
      <canvas></canvas>

      <Image
        alt="Blind Effect"
        className="asset-img opacity-0"
        id="light-img"
        src={lightBlindsEffect}
      />
    </>
  );
}
