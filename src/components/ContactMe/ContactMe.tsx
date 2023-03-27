import Image from "next/image";
import { icon_whatsapp, icon_email } from "@/assets/svg/index";
import { useEffect, useRef, useState } from "react";

function ContactMe(): JSX.Element {
  const [openModalWhatsapp, setOpenModalWhatsapp] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [textGeneration, setTextGeneration] = useState<string>("");
  const email = "flmp.leonardo@gmail.com";
  const refButtonClipboard = useRef<HTMLButtonElement>(null);
  const opacityHandle = openModalEmail ? "opacity-100" : "opacity-60";

  return (
    <div className="fixed bottom-10 right-6 z-10 md:right-9">
      <Image
        className={`icon mb-2 cursor-pointer hover:opacity-100 ${opacityHandle}`}
        src={icon_email}
        alt="email"
        width={30}
        height={30}
        onClick={() => {
          setOpenModalEmail(!openModalEmail);
          setOpenModalWhatsapp(false);
        }}
      />
      {openModalEmail && (
        <div
          className={`arrowLeftBottom-1 absolute bottom-10 right-9 rounded bg-white p-2`}
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
        </div>
      )}

      <Image
        className={`icon cursor-pointer hover:opacity-100 ${opacityHandle}`}
        src={icon_whatsapp}
        alt="whatsapp"
        width={30}
        height={30}
        onClick={() => {
          setOpenModalEmail(false);
          setOpenModalWhatsapp(!openModalWhatsapp);
        }}
      />
      {openModalWhatsapp && (
        <div
          className={`arrowLeftBottom-2 absolute bottom-0 right-9 rounded bg-white p-2 md:!w-48`}
          style={{ width: "70vw" }}
        >
          <section className="flex w-full flex-col">
            {/* ASSUNTO */}
            <div className="my-2 flex w-full w-10/12  items-center justify-center border-b-2 border-gray-300">
              <textarea
                x-model="input3"
                className="w-full py-1 text-gray-800 focus:outline-none"
                placeholder="Assunto"
                rows={10}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                value={subject}
              >
                {subject}
              </textarea>
            </div>
            <button
              onClick={() => {
                setSubject(
                  "Olá, estou entrando em contato para uma oportunidade de entrevista de emprego."
                );
              }}
              className="mb-2 inline-flex w-full items-center justify-center rounded border-b-2 border-sky-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-sky-600 hover:bg-sky-500 hover:text-white"
            >
              <span className="mr-2 text-xs md:text-sm">Gerar texto</span>
            </button>
            {/* BOTÃO ENVIAR EMAIL */}
            <div>
              <a
                href={`https://api.whatsapp.com/send?phone=5561984847214&text=${subject}`}
                target="_blank"
                className={`${subject === "" && "pointer-events-none opacity-50"
                  } inline-flex w-full items-center justify-center rounded border-b-2 border-green-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white`}
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
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ContactMe;
