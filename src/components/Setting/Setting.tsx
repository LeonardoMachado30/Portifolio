import Language from "./Language";
import { icon_settings, icon_cube } from "@/assets/svg/index";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LanguageContext } from "@/utils/Context";

function Setting(): JSX.Element {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const refBtnSettings = useRef<HTMLImageElement>(null);
  const { language } = useContext(LanguageContext);

  function handle() {
    setOpenSetting(!openSetting);
  }

  useEffect(() => {
    if (openSetting) setOpenSetting(!openSetting);
  }, [language]);


  return (
    <>
      {/* <Image
        src={icon_settings}
        width={30}
        height={30}
        alt="setting"
        className="cursor-pointer fixed bottom-28 right-6 md:right-10 z-10 opacity-60 hover:opacity-100"
        onClick={() => {
          handle();
        }}
        ref={refBtnSettings}
      /> */}
      {/* {openSetting &&
        <div className="arrowLeftBottom-3 fixed bottom-36 !mb-1 !mr-1 right-6 md:right-10 z-10 flex flex-col items-center justify-center gap-2 rounded border bg-white px-0.5 py-1 shadow-md"
        >

          <Language />

          <button title={"desativar animações"}>
            <Image src={icon_cube} alt="Desativar animações" width={30} height={30} />
          </button>
        </div>
      } */}
    </>
  );
}

export default Setting;
