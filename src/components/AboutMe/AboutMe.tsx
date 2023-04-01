import { forwardRef, useImperativeHandle, useRef } from "react";
import useRessource from "@/utils/ressource";
import { animationSlider } from "@/utils/animations";
interface IChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}
const AboutMe = forwardRef<IChildHandle, any>((props, ref) => {
  const localizer = useRessource("AboutMe");
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleStart = () => {
    const TimelineTitle = animationSlider(
      titleRef?.current,
      null,
      {
        from: "300%",
        to: 0,
      },
      1.1
    );
    animationSlider(
      paragraphRef?.current,
      TimelineTitle,
      {
        from: "60%",
        to: 0,
      },
      0
    );
  };

  const handleEnd = () => {
    const TimelineTitle = animationSlider(
      titleRef?.current,
      null,
      {
        from: 0,
        to: "60%",
      },
      0,
      2
    );
    animationSlider(paragraphRef?.current, TimelineTitle, {
      from: 0,
      to: "100%",
    });
  };

  useImperativeHandle(ref, () => ({
    handleEnd,
    handleStart,
  }));

  return (
    <>
      <h2 className="mb-12 text-5xl font-semibold" ref={titleRef}>
        {localizer?.title}
      </h2>

      <p
        className={`mb:mb-0 scroll-custom mx-12 overflow-auto bg-scroll px-4 text-center md:max-w-4xl`}
        ref={paragraphRef}
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
