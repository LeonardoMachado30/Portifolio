import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { front, back } from "@/assets/svg/index";
import useRessource from "@/utils/ressource";
import { animationSlider } from "@/utils/animations/animationSlider";

interface ChildHandle {
  handleStart: () => void;
  handleEnd: () => void;
}

const ImageDefault = ({ prop }: any) => {
  return (
    prop && (
      <Image
        src={prop.input}
        key={prop[1]}
        alt={prop[1]}
        width={100}
        height={10}
        className="cursor-pointer shadow-lg hover:-translate-y-1 hover:duration-300 hover:ease-in"
        style={{ height: "30px", width: "auto" }}
        // onClick={() => click(match[1])}
      />
    )
  );
};

interface IPropTopicComponente {
  prop: {
    stack: any;
    title: string;
  };
}

const TopicComponente = ({ prop }: IPropTopicComponente) => {
  const formatImportFileImage = (_): string =>
    _?.src.match(/\/media\/([^\.]+)\./);

  return (
    <div className="flex flex-col">
      <h3 className="mb-4 text-center text-3xl">{prop.title}</h3>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {prop.stack !== null &&
          Object.values(prop.stack).map((_) => {
            const _fomated = formatImportFileImage(_);
            return <ImageDefault prop={_fomated} key={_fomated[1]} />;
          })}
      </div>
    </div>
  );
};

const Skills = forwardRef<ChildHandle, any>((props, ref) => {
  const titleRef = useRef<any>(null);
  const listSkillsRef = useRef<HTMLDivElement>(null);
  const localizer = useRessource("Skills");

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

  return (
    <>
      <h2 className="mb-12 text-4xl font-semibold" ref={titleRef}>
        {localizer?.title}
      </h2>
      <div
        className="flex w-full max-w-xl flex-col gap-10 px-6"
        ref={listSkillsRef}
      >
        <TopicComponente prop={{ stack: front, title: "Front-end" }} />
        <TopicComponente prop={{ stack: back, title: "Back-end" }} />
      </div>
    </>
  );
});

Skills.displayName = "Skills";

export default Skills;
