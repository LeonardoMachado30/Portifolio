import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  html,
  css,
  gulp,
  sass,
  javascript,
  next,
  typescript,
  bootstrap,
  jquery,
  react,
  csharp,
  php,
  gsap,
} from "@/assets/svg/index";
import useRessource from "@/utils/ressource";
import { entryAnimation } from "@/utils/animations";

function Skills({ page }: any): JSX.Element {
  const listSkillsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<any>(null);
  const localizer = useRessource("Skills");
  useEffect(() => {
    if (page === 2 && titleRef && listSkillsRef) {
      entryAnimation(titleRef?.current)
      entryAnimation(listSkillsRef?.current)
    }
  }, [page]);
  return (
    <>
      <h2 className="mb-12 text-5xl font-semibold" ref={titleRef}>{localizer?.title}</h2>

      <section className="card box flex flex-col">
        <div
          className="flex w-full max-w-xl flex-col gap-10"
          ref={listSkillsRef}
        >
          <div className="flex flex-col">
            <h3 className="mb-4 text-center text-3xl">Front-end</h3>
            <div className="flex w-full flex-wrap justify-center gap-2">
              <Image src={html} alt={"html"} />
              <Image src={css} alt={"css"} />
              <Image src={javascript} alt={"javascript"} />
              <Image src={react} alt={"react"} />
              <Image src={typescript} alt={"typescript"} />
              <Image src={bootstrap} alt={"bootstrap"} />
              <Image src={jquery} alt={"jquery"} />
              <Image src={sass} alt={"sass"} />
              <Image src={gsap} alt={"gsap"} />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-center text-3xl">Back-end</h3>
            <div className="flex w-full flex-wrap justify-center gap-2">
              <Image src={csharp} alt={"csharp"} />
              <Image src={php} alt={"php"} />
              <Image src={next} alt={"next"} />
              <Image src={gulp} alt={"gulp"} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;