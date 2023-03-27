import { useEffect, useRef } from "react";
// import { LanguageContext } from "@/utils/Contexct";
import useRessource from "@/utils/ressource";
import { entryAnimation } from "@/utils/animations";
export default function AboutMe({ page }: any): JSX.Element {
  const aboutMeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<any>(null);
  const localizer = useRessource("AboutMe");

  useEffect(() => {
    if (page === 1 && titleRef && aboutMeRef) {
      entryAnimation(titleRef?.current)
      entryAnimation(aboutMeRef?.current)
    }
  }, [page]);
  return (
    <>
      <h2 className="mb-12 text-5xl font-semibold" ref={titleRef}>{localizer?.title}</h2>

      <p
        className={`mb:mb-0 scroll-custom mx-12 overflow-auto bg-scroll px-4 text-center md:max-w-4xl`}
        ref={aboutMeRef}
      >
        {localizer?.p1}
        <br />
        <br />
        {localizer?.p2}
        <br />
        <br />
        {localizer?.p3}
      </p>
    </>
  );
}
