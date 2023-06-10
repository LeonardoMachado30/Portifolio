import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { front, back } from "@/assets/svg/index";
import useRessource from "@/utils/ressource";
import { animationSlider } from "@/utils/animations/animationSlider";

interface ChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}

const Skills = forwardRef<ChildHandle, any>((props, ref) => {
  const titleRef = useRef<any>(null);
  const listSkillsRef = useRef<HTMLDivElement>(null);
  const localizer = useRessource("Skills");
  const frontImg = Object.values(front);
  const backImg = Object.values(back);

  console.log(frontImg);

  const handleStart = () => {
    const TimelineName = animationSlider(
      titleRef?.current,
      null,
      {
        from: "100%",
        to: 0,
      },
      0.3
    );
    animationSlider(
      listSkillsRef?.current,
      TimelineName,
      {
        from: "100%",
        to: 0,
      },
      0.3
    );
  };

  const handleEnd = () => {
    const TimelineName = animationSlider(
      listSkillsRef?.current,
      null,
      {
        from: "-100%",
        to: 0,
      },
      0.4
    );
    animationSlider(
      titleRef?.current,
      TimelineName,
      { from: "-100%", to: 0 },
      0
    );
  };

  useImperativeHandle(ref, () => ({
    handleStart,
    handleEnd,
  }));

  async function click(type) {
    await fetch(
      "https://drive.google.com/file/d/10BDqUf0z-juh3lsaQ_PmzbqaWvucmNx3/view"
    ).then((data) => console.log(data.json()));
  }

  function ImageDefault(item: any) {
    const regex = /\/media\/([^\.]+)\./;
    const match = item?.src.match(regex);
    return (
      <Image
        src={item}
        key={match[1]}
        onClick={() => click(match[1])}
        alt={match[1]}
        width={100}
        height={10}
        className="cursor-pointer shadow-lg hover:-translate-y-1 hover:duration-300 hover:ease-in"
        style={{ height: "30px", width: "auto" }}
      />
    );
  }

  return (
    <>
      <h2 className="mb-12 text-4xl font-semibold" ref={titleRef}>
        {localizer?.title}
      </h2>
      <div
        className="flex w-full max-w-xl flex-col gap-10 px-6"
        ref={listSkillsRef}
      >
        <div className="flex flex-col">
          <h3 className="mb-4 text-center text-3xl">Front-end</h3>
          <div className="flex w-full flex-wrap justify-center gap-2">
            {frontImg !== null ? (
              frontImg.map((item: string, index: number) => {
                return ImageDefault(item);
              })
            ) : (
              <div> Loading</div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 text-center text-3xl">Back-end</h3>
          <div className="flex w-full flex-wrap justify-center gap-2">
            {frontImg !== null ? (
              backImg.map((item: string, index: number) => {
                return ImageDefault(item);
              })
            ) : (
              <div> Loading</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default Skills;
