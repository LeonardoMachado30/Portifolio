import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutMe({ page }: any): JSX.Element {
  const aboutMeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (page === 1) {
      gsap.fromTo(
        aboutMeRef.current,
        {
          opacity: 0,
          x: "150%",
          duration: 1,
          ease: "ease",
        },
        {
          opacity: 1,
          x: "0",
          delay: 1,
          duration: 0.5,
          ease: "ease-in",

          onComplete: () => {
            aboutMeRef?.current?.classList.add("animation-horizontal");
          },
        }
      );
    }
  }, [page]);

  return (
    <p
      className={`mb:mb-0 scroll-custom mb-20 overflow-auto bg-scroll pr-4 `}
      ref={aboutMeRef}
    >
      Olá, meu nome é Flávio Leonardo. Iniciei minha jornada na tecnologia
      trabalhando com reparos em dispositivos eletrônicos, como notebooks,
      computadores, celulares e outros. Realizei um estágio no Colégio Objetivo
      por 6 meses como suporte técnico, ajudando os funcionários durante a
      pandemia com as aulas online. Minhas responsabilidades incluíam suporte
      aos aplicativos do pacote Office, configurações das aulas em plataformas
      como Meet, Zoom e Teams, bem como a formatação e manutenção dos
      equipamentos da escola. Após a experiência como suporte, comecei a
      trabalhar como programador no site "Trabalha Brasil" como desenvolvedor
      front-end. Aprendi sobre a criação de landing pages, telas dinâmicas,
      transferência de dados, consumo de APIs, otimização de navegação e SEO.
      <br />
      Minha meta profissional é me tornar um desenvolvedor de jogos, usando meus
      conhecimentos e habilidades para criar soluções inovadoras e proporcionar
      experiências incríveis aos jogadores. Para alcançar este objetivo, estou
      sempre buscando novos desafios e oportunidades de aprendizado na área de
      desenvolvimento de jogos. Acredito que minhas habilidades em programação,
      criação de landing pages e otimização de navegação serão valiosas na
      criação de jogos dinâmicos e interativos. Além disso, meu conhecimento em
      tecnologias como React e NextJs, bem como meu trabalho anterior como
      suporte técnico, me permitirão ajudar a resolver problemas de maneira
      eficiente e garantir a qualidade final do produto. <br />
      Estou animado com a possibilidade de usar minhas habilidades para
      contribuir com a criação de jogos que possam ser apreciados por pessoas de
      todas as idades e lugares. Acredito que a combinação de minhas habilidades
      técnicas e minha paixão por jogos tornará possível alcançar meu objetivo
      de se tornar um desenvolvedor de jogos de sucesso.
    </p>
  );
}
