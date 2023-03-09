import React, { createRef, ReactElement, useEffect, useRef } from "react";

interface MyComponentProps {
  children?: ReactElement | string;
  title?: string;
  className?: string;
  style?: object;
}

export default function Content({
  children,
  className = "",
  style = {},
  title = "",
}: MyComponentProps) {
  return (
    <div
      className={`relative flex h-screen w-full flex-col items-center   text-white  ${className}`}
      style={style}
    >
      <h2 className="mb-12 text-5xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
