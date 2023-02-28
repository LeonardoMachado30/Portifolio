import React from "react";
import Image from "next/image";
import logo_trabalhaBrasil from "@/assets/logo_trabalhaBrasil.jpeg";
import {
  html,
  css,
  gulp,
  javascript,
  next,
  typescript,
} from "@/assets/svg/index";

type Vaga = {
  cargo: string;
  tipo: string;
  periodo: string;
  localizacao: string;
  descricao: string[];
  competencias?: string[];
};

type Empresa = {
  empresa: string;
  logo: string;
  vagas: Vaga[];
};

type Props = {
  empresa: Empresa;
};

const Experience: React.FC<Props> = ({ empresa }) => {
  return (
    <div className="flex flex-col">
      <Image
        src={logo_trabalhaBrasil}
        width={200}
        height={200}
        alt="Logo Trabalha Brasil"
        className="self-center"
      />
      <h3 className="bold text-2xl font-bold">{empresa.empresa}</h3>
      {empresa.vagas.map((vaga, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p>{vaga.cargo}</p>
            <p>{vaga.tipo}</p>
          </div>
          <div className="flex justify-between">
            <p>{vaga.periodo}</p>
            <p>{vaga.localizacao}</p>
          </div>
          <div className="flex flex-col gap-1">
            {vaga.descricao.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Image src={html} alt={"html"} />
            <Image src={css} alt={"css"} />
            <Image src={javascript} alt={"javascript"} />
            <Image src={typescript} alt={"typescript"} />
            <Image src={next} alt={"next"} />
          </div>

          {vaga.competencias && (
            <p>Competências: {vaga.competencias.join(" · ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Experience;
