import React, { createRef, ReactElement, useEffect, useRef } from "react";

interface MyComponentProps {
  children?: ReactElement | string;
  title?: string;
  className?: string;
}

export default function Content({
  children = "",
  className = "",
  title = "",
}: MyComponentProps) {
  return (
    <div className={`fixed h-screen w-full p-4 text-white ${className}`}>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
