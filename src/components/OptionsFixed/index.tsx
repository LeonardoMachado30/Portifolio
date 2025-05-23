import { useRef, useState, useContext } from "react";
import { AnimationContext, LanguageContext } from "@/utils/Context";
import { icons } from "@/assets/svg/index";
import Button from "./Button";
import Image from "next/image";
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
      const phone: string = "5561981095126";
      const text: string =
        "Ol%C3%A1,%20gostaria%20de%20falar%20com%20voc%C3%AA%20sobre%20uma%20oportunidade%20de%20emprego!";
      link = `//https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    } else if (prop === "linkedin") {
      link = `https://www.linkedin.com/flavio-leonardo-ads`;
    } else if (prop === "github") {
      link = `https://github.com/LeonardoMachado30`;
    }
    setOpenModalBar(false);
    window.open(link, "_blank");
  };

  const handleClickAnimation = (): void => {
    setAnimation(!animation);
    setOpenModalSettings(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-20 flex flex-col justify-end  gap-4 md:right-10 lg:bottom-10">
      <div className={`relative`}>
        <Button
          prop={{ src: icons.icon_bar, alt: "bar" }}
          handleClick={handleClickBar}
          className={`${openModalBar && "arrowTop"}`}
        />

        {openModalBar && (
          <div className="absolute bottom-11 left-0 right-0 ml-auto mr-auto flex w-auto flex-col items-center justify-center gap-2 p-2 ">
            {/* <Button
              className={widthHeight}
              prop={{ src: icons.icon_whatsapp, alt: "Whatsapp" }}
              handleClick={() => handleClickRedirect("whatsapp")}
            /> */}
            {/* <Button
              className={widthHeight}
              prop={{ src: icons.icon_redirect, alt: "LinkedIn" }}
              handleClick={() => handleClickRedirect("linkedin")}
            /> */}
            <Button
              className={widthHeight}
              prop={{ src: icons.icon_github, alt: "Github" }}
              handleClick={() => handleClickRedirect("github")}
            />

            <div className="relative">
              <Button
                className={`h-9 w-9 ${openModalEmail && "arrowLeft"}`}
                prop={{ src: icons.icon_email, alt: "Email" }}
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
          prop={{ src: icons.icon_settings, alt: "Opções" }}
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
                src={icons.icon_Bandeiro_Brasil}
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
                src={icons.icon_Bandeira_EUA}
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
              src={icons.icon_cube}
              width={26}
              height={26}
              alt={"Ativar animação"}
              onClick={() => handleClickAnimation()}
            />
          </div>
        )}
      </div>

      <div className={`relative`}>
        <a
          href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=flavio-leonardo-machado"
          target="_blank"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            outline: "none",
            textDecoration: "none",
            color: "#ffffff",
            width: "40px",
            height: "40px",
            borderRadius: "100%",
            fontFamily: "'SF Pro Text', Helvetica, sans-serif",
          }}
        >
          <Image
            src={icons.linkedin}
            alt="linkedin"
            width={40}
            height={40}
            style={{ width: "40px", height: "40px" }}
          ></Image>
        </a>
      </div>

      <div className={`relative`}>
        <a
          href="https://wa.me/5561981095126?text=Ol%C3%A1%20Fl%C3%A1vio%2C%20"
          target="_blank"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            outline: "none",
            textDecoration: "none",
            color: "#ffffff",
            width: "40px",
            height: "40px",
            borderRadius: "100%",
            backgroundColor: "#25D366",
            padding: "8px",
            fontFamily: "'SF Pro Text', Helvetica, sans-serif",
          }}
        >
          <Image
            src={icons.icon_whatsapp}
            alt="linkedin"
            width={40}
            height={40}
            style={{ width: "40px", height: "40px" }}
          ></Image>
        </a>
      </div>
    </div>
  );
}

export default OptionsFixed;
