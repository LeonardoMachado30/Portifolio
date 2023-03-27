import Image from "next/image";
import profile from "@/assets/profile.jpg";
import useRessource from "@/utils/ressource";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { entryAnimation } from "@/utils/animations";
// import "./effect";

export default function Welcome({ page }: any): JSX.Element {
  const localizer = useRessource("Welcome");
  const myNameRef = useRef<HTMLParagraphElement>(null)
  const welcomeRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (page === 0) {
      entryAnimation(myNameRef?.current)
      entryAnimation(welcomeRef?.current)
      entryAnimation(imageRef?.current)
    }
  }, [page]);

  return (
    <>
      {/* <div className={`absolute px-4 text-center md:px-0`}> */}
      <Image
        ref={imageRef}
        src={profile}
        alt={localizer?.altProfileImage}
        width={200}
        height={200}
        className="mb-20 mt-20"
        style={{ borderRadius: "100%" }}
      />
      <div className="flex flex-col gap-2 text-center px-6 md:px-0">
        <p ref={myNameRef} className="font-bold uppercase text-3xl md:text-5xl">{localizer?.myName}</p>
        <p ref={welcomeRef} className="font-bold uppercase text-3xl md:text-5xl">{localizer?.welcome}</p>
      </div>

      {/* </div> */}
      {/* <div>
        <canvas></canvas>

        <Image
          alt="Blind Effect"
          className="asset-img h-3/4 opacity-0 md:h-3/5"
          id="light-img"
          src={lightBlindsEffect}
          style={{ width: "100%" }}
        />
      </div> */}
    </>
  );
}
