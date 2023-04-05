import { useRef, useState, useContext, useEffect } from "react";
import { icon_whatsapp, icon_email } from "@/assets/svg/index";
import { ButtonFloat } from "@/components/export";
import {
  icon_settings,
  icon_Bandeiro_Brasil,
  icon_Bandeira_EUA,
  icon_cube,
} from "@/assets/svg/index";
import Image from "next/image";
import { LanguageContext } from "@/utils/Context";

import styled from "styled-components";

const Modal = styled.div`
  // z-index: -1;
  box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  -webkit-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: 16px 17px 34px -4px rgba(0, 0, 0, 0.67);
  max-width: 300px;
  // min-width: 150px;

  @media screen and (max-width: 380px) {
    max-width: 220px;
  }

  @media screen and (max-width: 280px) {
    max-width: 200px;
  }
  // transition: all 1s ease-in-out;
`;

interface IOpenModal {
  whatsapp: boolean;
  email: boolean;
  settings: boolean;
}

function OptionsFixed(): JSX.Element {
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState<IOpenModal>({
    whatsapp: false,
    email: false,
    settings: false,
  });
  const textGeneration =
    "Olá, estou entrando em contato para uma oportunidade de entrevista de emprego.";
  const btnSubmitRef = useRef<HTMLAnchorElement>(null);
  const textareaRef = useRef<any>(null);
  const refButtonClipboard = useRef<HTMLButtonElement>(null);
  const email = "flmp.leonardo@gmail.com";
  const { setLanguage } = useContext(LanguageContext);

  const handleOpenModal = (prop, openModalp) => {
    console.log(prop, openModalp);
    const whatsapp = prop === "whatsapp";
    const email = prop === "email";
    const settings = prop === "settings";
    setOpenModal({
      whatsapp: whatsapp,
      email: email,
      settings: settings,
    });
  };

  const handleClipboard = () => {
    const button = refButtonClipboard?.current;
    if (button) {
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

  const changeText = (e: any) => {
    setDescription(e.target.value);
  };

  //TODO: Adicionar o texto que e gerado dentro do textarea
  return (
    <div>
      <ButtonFloat
        handleOpenModal={handleOpenModal}
        prop={{ src: icon_settings, alt: "settings", bottom: 3 }}
      >
        {openModal.settings && (
          <Modal className="arrowLeftBottom-1 b-3 fixed right-20 z-10 ml-auto mr-auto flex w-auto flex-col items-center justify-center gap-2 rounded !border-0 bg-white p-2">
            <div className="flex items-center gap-2 ">
              <Image
                className="btn-transition cursor-pointer"
                src={icon_Bandeiro_Brasil}
                width={30}
                height={30}
                alt={"bandeira Brasil"}
                onClick={() => setLanguage("pt")}
              />
              <Image
                className="btn-transition cursor-pointer"
                src={icon_Bandeira_EUA}
                width={30}
                height={30}
                alt={"bandeira Brasil"}
                onClick={() => setLanguage("en")}
              />
            </div>
            <Image
              className="btn-transition cursor-pointer"
              src={icon_cube}
              width={30}
              height={30}
              alt={"bandeira Brasil"}
            />
          </Modal>
        )}
      </ButtonFloat>

      <ButtonFloat
        handleOpenModal={handleOpenModal}
        prop={{ src: icon_whatsapp, alt: "whatsapp", bottom: 2 }}
      >
        {openModal.whatsapp && (
          <Modal className="arrowLeftBottom-1 b-2 fixed right-20 z-10 ml-auto mr-auto flex w-auto flex-col items-center justify-center gap-2 rounded !border-0 bg-white p-2">
            <div className="w-ful my-2 flex items-center justify-center border-b-2 border-gray-300">
              <textarea
                x-model="input3"
                className="h-full w-full py-1 text-gray-800 focus:outline-none"
                placeholder="Assunto"
                rows={8}
                onChange={(e) => changeText(e)}
                ref={textareaRef}
              ></textarea>
            </div>

            <div className="flex flex-row gap-2">
              <button
                className="mb-2 inline-flex w-full items-center justify-center rounded border-b-2 border-sky-500 bg-white px-2 py-2 font-bold text-gray-800 shadow-md hover:border-sky-600 hover:bg-sky-500 hover:text-white"
                onClick={() => {
                  textareaRef.current.value = textGeneration;
                }}
              >
                <span className=" md:text-md text-xs">Gerar texto</span>
              </button>

              <button
                className="mb-2 inline-flex w-full items-center justify-center rounded border-b-2 border-sky-500 bg-white px-2 py-2 font-bold text-gray-800 shadow-md hover:border-sky-600 hover:bg-sky-500 hover:text-white"
                onClick={() => {
                  textareaRef.current.value = "";
                }}
              >
                <span className="mr-2 text-xs md:text-sm">Limpar</span>
              </button>
            </div>

            <a
              href={"#"}
              target="_blank"
              className={
                " pointer-events-none inline-flex w-full cursor-pointer items-center justify-center rounded border-b-2 border-green-500 bg-white px-6 py-2 font-bold text-gray-800 opacity-50 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white"
              }
              ref={btnSubmitRef}
            >
              <span className="mr-2 text-xs md:text-sm">Enviar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentcolor"
                  d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                ></path>
              </svg>
            </a>
          </Modal>
        )}
      </ButtonFloat>

      <ButtonFloat
        handleOpenModal={handleOpenModal}
        prop={{ src: icon_email, alt: "email", bottom: 1 }}
      >
        {openModal.email && (
          <Modal
            className={`arrowLeftBottom-1 b-1 fixed right-20 z-10 ml-auto mr-auto flex w-auto flex-col items-center justify-center gap-2 rounded !border-0 bg-white p-2 `}
          >
            <button
              ref={refButtonClipboard}
              onClick={(e) => handleClipboard()}
              className={
                " inline-flex w-full cursor-pointer items-center justify-center rounded border-b-2 border-green-500  bg-white px-6 py-2 font-bold text-gray-800 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white"
              }
            >
              <span className="mr-2 text-xs md:text-sm">{email}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
            </button>
          </Modal>
        )}
      </ButtonFloat>
    </div>
  );
}

export default OptionsFixed;
