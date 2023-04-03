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

  const handleOpenModal = (prop) => {
    setOpenModal({
      whatsapp: prop === "whatsapp",
      email: prop === "email",
      settings: prop === "settings",
    });
  };

  const handleClipboard = () => {
    const button = refButtonClipboard?.current;
    if (button) {
      navigator.clipboard.writeText(email).then(
        function () {
          button?.classList.remove("bg-teal-500");
          button?.classList.remove("bg-red-500");
          button?.classList.add("bg-green-500");
          button.textContent = "copiado";
        },
        function (err) {
          button?.classList.remove("bg-teal-500");
          button?.classList.add("bg-red-500");
          button.textContent = "Erro ao copiar";
        }
      );
      setTimeout(() => {
        button?.classList.add("bg-teal-500");
        button?.classList.remove("bg-red-500");
        button?.classList.remove("bg-green-500");
        button.textContent = "copiar";
      }, 2000);
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
            <p className="p-2 text-sm text-gray-500 md:text-lg">{email}</p>

            <button
              ref={refButtonClipboard}
              className="w-full rounded  bg-teal-500 p-2 text-sm text-white md:text-lg"
              onClick={(e) => handleClipboard()}
            >
              Copiar
            </button>
          </Modal>
        )}
      </ButtonFloat>
    </div>
  );
}

export default OptionsFixed;
