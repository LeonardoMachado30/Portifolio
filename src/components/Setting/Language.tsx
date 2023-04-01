import { icon_Bandeiro_Brasil, icon_Bandeira_EUA } from "@/assets/svg/index";

import Image from "next/image";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { LanguageContext } from "@/utils/Contexct";

export default function Language(): JSX.Element {
  const refLangage = useRef<HTMLDivElement>(null);
  const { setLanguage } = useContext(LanguageContext);

  // useEffect(() => {
  //   if (openSetting) {
  //     gsap.fromTo(
  //       refLangage?.current,
  //       { y: "50%", opacity: 0, delay: 0.1 },
  //       { y: 0, opacity: 1 }
  //     );
  //   }
  // }, [openSetting]);

  return (
    <div
      className="flex items-center justify-center gap-2 rounded border bg-white px-0.5 py-1 shadow-md"
      ref={refLangage}
    >
      <Image
        src={icon_Bandeiro_Brasil}
        alt={"Bandeira do Brasil"}
        className="cursor-pointer"
        width={30}
        height={30}
        title="Bandeira do Brasil"
        onClick={() => {
          setLanguage("pt");
        }}
      />

      <Image
        src={icon_Bandeira_EUA}
        alt={"Bandeira dos Estados Unidos"}
        className="cursor-pointer"
        width={30}
        height={30}
        title="Bandeira dos Estados Unidos"
        onClick={() => {
          setLanguage("en");
        }}
      />
    </div>
  );
}
