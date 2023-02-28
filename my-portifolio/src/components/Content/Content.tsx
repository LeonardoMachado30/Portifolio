import React, { createRef, ReactElement, useEffect, useRef } from "react";

interface MyComponentProps {
  children?: ReactElement | string;
  title?: string;
  className?: string;
  style?: object;
}

export default function Content({
  children = "",
  className = "",
  style = {},
  title = "",
}: MyComponentProps) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center p-4 text-black  ${className}`}
      style={style}
    >
      <h2 className="mb-4 text-5xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
