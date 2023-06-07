import { useRef, useState, useContext, useEffect } from "react";

import { ButtonFloat } from "@/components/export";
import Button from "./Button";
import imgs from "@/assets/svg/index";
import Image from "next/image";
import { AnimationContext, LanguageContext } from "@/utils/Context";

import styled from "styled-components";

const Modal = styled.div`
  // z-index: -1;
  // box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  // -webkit-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  // -moz-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  // max-width: 300px;
  // min-width: 150px;

  // @media screen and (max-width: 380px) {
  //   max-width: 220px;
  // }

  // @media screen and (max-width: 280px) {
  //   max-width: 200px;
  // }
  // transition: all 1s ease-in-out;
`;

interface IOpenModal {
  bar?: boolean;
  settings?: boolean;
}

function OptionsFixed(): JSX.Element {
  const [openModalBar, setOpenModalBar] = useState<boolean>(false);
  const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
  const [openModalEmail, setOpenModalEmail] = useState<boolean>(false);
  const refButtonClipboard = useRef<HTMLButtonElement>(null);
  const email = "flmp.leonardo@gmail.com";
  const { language, setLanguage } = useContext(LanguageContext);
  const { animation, setAnimation } = useContext(AnimationContext);
  const widthHeight: string = "h-8 w-8";

  const handleClipboard = () => {
    if (refButtonClipboard) {
      const button = refButtonClipboard?.current;
      navigator.clipboard
        .writeText(email)
        .then(() => {
          button?.classList.add("border-sky-500");
          button?.classList.add("pointer-events-none");
          button?.classList.add("opacity-70");
          button?.classList.remove("border-green-500");
          button.children[0].textContent = "Copiado";
        })
        .catch((err) => {
          button?.classList.add("border-red-500");
          button?.classList.remove("pointer-events-none");
          button?.classList.remove("opacity-70");
          button?.classList.remove("border-sky-500");
          button?.classList.remove("border-green-500");
          button.children[0].textContent = "Erro ao copiar";
        });
      setTimeout(() => {
        button?.classList.add("border-green-500");
        button?.classList.remove("pointer-events-none");
        button?.classList.remove("opacity-70");
        button?.classList.remove("border-sky-500");
        button.children[0].textContent = email;
      }, 3000);
    }
  };

  const handleClickBar = () => {
    setOpenModalBar(!openModalBar);
    if (!openModalBar) setOpenModalSettings(false);
    if (!openModalBar) setOpenModalEmail(false);
  };

  const handleClickSetting = () => {
    setOpenModalSettings(!openModalSettings);
    if (!openModalSettings) setOpenModalBar(false);
  };

  const handleClickEmail = () => {
    setOpenModalEmail(!openModalEmail);
  };

  const handleClickRedirect = (prop: string): void => {
    let link: string = "";

    if (prop === "whatsapp") {
      const phone: string = "5561984847214";
      const text: string =
        "Ol%C3%A1,%20gostaria%20de%20falar%20com%20voc%C3%AA%20sobre%20uma%20oportunidade%20de%20emprego!";
      link = `//https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    } else if (prop === "linkedin") {
      link = `https://www.linkedin.com/flavio-leonardo-ads`;
    } else if (prop === "github") {
      link = `https://www.github.com.br/LeonardoMachado30`;
    }
    setOpenModalBar(false);
    window.open(link, "_blank");
  };

  const handleClickAnimation = (): void => {
    setAnimation(!animation);
    setOpenModalSettings(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-20 flex flex-col gap-2  md:right-10 lg:bottom-10">
      <div className={`relative`}>
        <Button
          prop={{ src: imgs.icons.icon_bar, alt: "bar" }}
          handleClick={handleClickBar}
          className={`${openModalBar && "arrowTop"}`}
        />

        {openModalBar && (
          <div className="absolute bottom-11 left-0 right-0 ml-auto mr-auto flex w-auto flex-col items-center justify-center gap-2 p-2 ">
            <Button
              className={widthHeight}
              prop={{ src: imgs.icons.icon_whatsapp, alt: "Whatsapp" }}
              handleClick={() => handleClickRedirect("whatsapp")}
            />
            <Button
              className={widthHeight}
              prop={{ src: imgs.icons.icon_redirect, alt: "LinkedIn" }}
              handleClick={() => handleClickRedirect("linkedin")}
            />
            <Button
              className={widthHeight}
              prop={{ src: imgs.icons.icon_github, alt: "Github" }}
              handleClick={() => handleClickRedirect("github")}
            />
            <div className="relative">
              <Button
                className={`h-9 w-9 ${openModalEmail && "arrowLeft"}`}
                prop={{ src: imgs.icons.icon_email, alt: "Email" }}
                handleClick={handleClickEmail}
              />
              <div
                className={`t-open absolute bottom-0 right-14 flex flex-col items-center justify-center gap-2 rounded !border-0 bg-white p-1 ${
                  !openModalEmail && "hidden"
                }`}
              >
                <button
                  ref={refButtonClipboard}
                  onClick={() => handleClipboard()}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded border-b-2 border-green-500  bg-white px-3 py-2 font-bold text-gray-800 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white"
                >
                  <span className="mr-2 text-xs md:text-sm">{email}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`relative`}>
        <Button
          prop={{ src: imgs.icons.icon_settings, alt: "Opções" }}
          handleClick={handleClickSetting}
          className={`${openModalSettings && "arrowLeft"}`}
        />

        {openModalSettings && (
          <div
            className="absolute bottom-0 right-12 flex flex-col items-center justify-center gap-2 rounded !border-0 bg-white p-2"
            style={{ minWidth: "90px" }}
          >
            <div className="flex items-center gap-2">
              <Image
                className={`btn-transition cursor-pointer ${
                  language === "pt" && "pointer-events-none opacity-60"
                }`}
                src={imgs.icons.icon_Bandeiro_Brasil}
                width={24}
                height={26}
                alt={"bandeira Brasil"}
                onClick={() => {
                  setLanguage("pt");
                  setOpenModalSettings(false);
                }}
              />
              <Image
                className={`btn-transition cursor-pointer ${
                  language === "en" && "pointer-events-none opacity-60"
                }`}
                src={imgs.icons.icon_Bandeira_EUA}
                width={28}
                height={30}
                alt={"bandeira Estados Unidos"}
                onClick={() => {
                  setLanguage("en");
                  setOpenModalSettings(false);
                }}
              />
            </div>
            <Image
              className="btn-transition cursor-pointer"
              src={imgs.icons.icon_cube}
              width={26}
              height={26}
              alt={"Ativar animação"}
              onClick={() => handleClickAnimation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionsFixed;
