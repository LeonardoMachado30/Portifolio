import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import useRessource from "@/utils/ressource";
import profile from "@/assets/profile.jpg";
import { animationSlider } from "@/utils/animations";

interface ChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}
const Welcome = forwardRef<ChildHandle, any>((props, ref) => {
  const localizer = useRessource("Welcome");
  const myNameRef = useRef<HTMLParagraphElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleStart = () => {
    const TimelineName = animationSlider(
      myNameRef?.current,
      null,
      {
        from: "100%",
        to: 0,
      },
      1
    );
    const TimelineWelcome = animationSlider(welcomeRef?.current, TimelineName, {
      from: "100%",
      to: 0,
    });
    animationSlider(imageRef?.current, TimelineWelcome, {
      from: "-100%",
      to: 0,
    });
  };

  const handleEnd = () => {
    const TimelineName = animationSlider(
      myNameRef?.current,
      null,
      { from: 0, to: "-100%" },
      1
    );
    const TimelineWelcome = animationSlider(welcomeRef?.current, TimelineName, {
      from: 0,
      to: "-100%",
    });
    animationSlider(imageRef?.current, TimelineWelcome, {
      from: 0,
      to: "100%",
    });
  };

  useImperativeHandle(ref, () => ({
    handleStart,
    handleEnd,
  }));

  return (
    <>
      <Image
        ref={imageRef}
        src={profile ? profile : "profle"}
        alt={localizer?.altProfileImage}
        width={200}
        height={200}
        className="mb-20 mt-20"
        style={{ borderRadius: "100%" }}
      />
      <div className="flex flex-col gap-2 px-6 text-center md:px-0">
        <p ref={myNameRef} className="text-3xl font-bold uppercase md:text-5xl">
          {localizer?.myName}
        </p>
        <p
          ref={welcomeRef}
          className="text-3xl font-bold uppercase md:text-5xl"
        >
          {localizer?.welcome}
        </p>
      </div>
    </>
  );
});

export default Welcome;
