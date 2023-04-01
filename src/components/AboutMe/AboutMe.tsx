import { forwardRef, useImperativeHandle, useRef } from "react";
import useRessource from "@/utils/ressource";
import { entryAnimation } from "@/utils/animations";

interface ChildHandle {
  handleAnimation: () => void;
}

const AboutMe = forwardRef<ChildHandle, any>((props, ref) => {
  const localizer = useRessource("AboutMe");
  const aboutMeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<any>(null);

  const handleAnimation = () => {
    const timeLine = entryAnimation(titleRef?.current, null, 1);
    entryAnimation(aboutMeRef?.current, timeLine, 0);
  };

  useImperativeHandle(ref, () => ({
    handleAnimation,
  }));

  return (
    <>
      <h2 className="mb-12 text-5xl font-semibold" ref={titleRef}>
        {localizer?.title}
      </h2>

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
});

export default AboutMe;
