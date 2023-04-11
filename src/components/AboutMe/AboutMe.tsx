import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import useRessource from "@/utils/ressource";
import { animationSlider } from "@/utils/animations/animationSlider";

interface IChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}
const AboutMe = forwardRef<IChildHandle, any>((props, ref) => {
  const localizer = useRessource("AboutMe");
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<any>(null);

  const handleStart = () => {
    const TimelineTitle = animationSlider(
      titleRef?.current,
      null,
      {
        from: "100%",
        to: 0,
      },
      0.6
    );
    animationSlider(
      paragraphRef?.current,
      TimelineTitle,
      {
        from: "100%",
        to: 0,
      },
      0
    );
  };

  const handleEnd = () => {
    const TimelineTitle = animationSlider(
      paragraphRef?.current,
      null,
      {
        from: "-100%",
        to: 0,
      },
      0.6
    );
    animationSlider(
      titleRef?.current,
      TimelineTitle,
      {
        from: "-100%",
        to: 0,
      },
      0
    );
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

      <div className="scroll-custom flex w-full items-center justify-center overflow-auto bg-scroll !px-4 !mb-20 text-center md:!px-72 z-50">
        <p
          className={`h-full w-full px-4 text-justify text-xs  md:text-sm`}
          style={{ lineHeight: "20px" }}
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
      </div>
    </>
  );
});

export default AboutMe;
