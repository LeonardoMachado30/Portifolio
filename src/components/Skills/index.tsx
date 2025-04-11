import Image from "next/image";
import { front, back, mobile, other } from "@/assets/svg/index";
import useRessource from "@/utils/ressource";
import { useEffect, useState } from "react";

export interface Image {
  width: number;
  height: number;
  0: string;
  1: string;
  groups: undefined;
  index: number;
  input: string;
  length: 2;
}

const ImageDefault = ({ prop, index }: any) => {
  const formatImportFileImage = (image): Image => {
    return image?.src ? image?.src.match(/\/media\/([^\.]+)\./) : image;
  };

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Esse código só será executado no cliente
      const handleResize = () => {
        console.log(window.innerWidth);
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize(); // Chamada inicial para definir o tamanho
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const media = formatImportFileImage(prop);

  return (
    prop && (
      <Image
        src={media.input}
        key={index}
        alt={media[1]}
        width={0}
        height={0}
        className="resize-image border-1 cursor-pointer border-solid border-black shadow-lg hover:-translate-y-1 hover:duration-300 hover:ease-in "
        style={{ width: `auto` }}
      />
    )
  );
};

interface IPropTopicComponente {
  prop: {
    stack: any;
    title: string;
  };
}

const TopicComponente = ({ prop }: IPropTopicComponente) => {
  return (
    <div className="flex flex-col gap-0">
      <h3 className="m-0 mb-2 text-center text-xl">{prop.title}</h3>
      <div className="flex w-full flex-wrap justify-center">
        {prop.stack !== null &&
          Object.values(prop.stack).map((image, index) => {
            return <ImageDefault prop={image} key={index} />;
          })}
      </div>
    </div>
  );
};

export default function Skills() {
  const localizer = useRessource("Skills");

  return (
    <>
      <h2 className="mb-12 text-center text-4xl font-semibold">
        {localizer?.title}
      </h2>
      <div className="flex w-full max-w-xl flex-col gap-5">
        <TopicComponente prop={{ stack: front, title: "Front-end" }} />
        <TopicComponente prop={{ stack: mobile, title: "Mobile" }} />
        <TopicComponente prop={{ stack: back, title: "Back-end" }} />
        <TopicComponente prop={{ stack: other, title: "Outros" }} />
      </div>
    </>
  );
}
