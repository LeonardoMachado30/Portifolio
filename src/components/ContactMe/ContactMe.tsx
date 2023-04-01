import { useRef, useState } from "react";
import { icon_whatsapp, icon_email, icon_cube } from "@/assets/svg/index";
import { ButtonFloat } from "@/components/export";

function ContactMe(): JSX.Element {
  const [description, setDescription] = useState<string>("");
  const textGeneration =
    "Olá, estou entrando em contato para uma oportunidade de entrevista de emprego.";
  const btnSubmitRef = useRef<HTMLAnchorElement>(null);
  const textareaRef = useRef<any>(null);
  const refButtonClipboard = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const email = "flmp.leonardo@gmail.com";

  const changeText = (e: any) => {
    setDescription(e.target.value);
  };

  //TODO: Adicionar o texto que e gerado dentro do textarea
  return (
    <div>
      <ButtonFloat
        prop={{
          src: icon_whatsapp,
          alt: "email",
          bottom: 2,
        }}
        classNameModal="flex flex-col justify-between"
      >
        <div className="w-ful my-2 flex h-full items-center justify-center border-b-2 border-gray-300">
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
            className="mb-2 inline-flex w-full items-center justify-center rounded border-b-2 border-sky-500 bg-white py-2 px-2 font-bold text-gray-800 shadow-md hover:border-sky-600 hover:bg-sky-500 hover:text-white"
            onClick={() => {
              textareaRef.current.value = textGeneration;
            }}
          >
            <span className=" md:text-md text-xs">Gerar texto</span>
          </button>

          <button
            className="mb-2 inline-flex w-full items-center justify-center rounded border-b-2 border-sky-500 bg-white py-2 px-2 font-bold text-gray-800 shadow-md hover:border-sky-600 hover:bg-sky-500 hover:text-white"
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
            " pointer-events-none inline-flex w-full cursor-pointer items-center justify-center rounded border-b-2 border-green-500 bg-white py-2 px-6 font-bold text-gray-800 opacity-50 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white"
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
      </ButtonFloat>

      <ButtonFloat
        prop={{ src: icon_email, alt: "email", bottom: 1 }}
        classNameModal="flex h-full w-full flex-col justify-between p-2"
      >
        <p className="p-2 text-sm text-gray-500 md:text-lg">{email}</p>

        <button
          ref={refButtonClipboard}
          className="w-full rounded  bg-teal-500 p-2 text-sm text-white md:text-lg"
          onClick={(e) => {
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
              }, 3000);
            }
          }}
        >
          Copiar
        </button>
      </ButtonFloat>
    </div>
  );
}

export default ContactMe;
