import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";
interface MyComponentProps {
  children?: ReactElement | string;
  style?: object;
  prop?: string[];
  page?: number;
}

export default function Content({
  children,
  style = {},
  prop = [],
  page = 0,
}: MyComponentProps) {
  const refTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    gsap.fromTo(
      refTitle.current,
      {
        opacity: 0,
        y: "-150%",
        duration: 2,
        ease: "ease-in-out",
      },
      {
        opacity: 1,
        y: "0",
        delay: 1,
        duration: 1,
        ease: "ease-out",
      }
    );
  }, [page]);

  return (
    <div
      className={`relative flex h-screen w-full flex-col items-center text-white  ${prop[0]}`}
      style={style}
    >
      <h2 className="mb-12 text-5xl font-semibold" ref={refTitle}>
        {prop[1]}
      </h2>
      {children}
    </div>
  );
}
