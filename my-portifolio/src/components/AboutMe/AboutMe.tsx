import { useEffect, useState } from "react";
import { User } from "@/models/user";

export default function AboutMe(): JSX.Element {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      let data;
      data = localStorage.getItem("User");

      if (!data) {
        // console.log("REQUISIÇÂO FEITA");
        const resp = await fetch("/api/User");
        data = await resp.json();
        localStorage.setItem("User", JSON.stringify(data));
      }
      // console.log(JSON.parse(data));
      setUser(JSON.parse(data));
    };

    fetchData();
  }, []);

  return (
    <p>
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
