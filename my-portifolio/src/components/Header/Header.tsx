import React, { useState, ReactElement, Dispatch, SetStateAction } from "react";

interface MyComponentProps {
  activeTab: string;
  onClick: (valur: string) => void;
}

function Header({ activeTab, onClick }: MyComponentProps) {
  const Arr: Array<string> = [
    "Perfil",
    "Experiencias",
    "Escolaridade",
    "Projetos",
  ];

  return (
    <header className="fixed z-50 flex w-full items-center justify-center bg-blue-200 p-4">
      <nav className="flex space-x-4">
        {Arr.map((item, index) => {
          return (
            <button
              key={index}
              className={`rounded-none py-2 px-4  ${
                activeTab === item ? "bg-blue-600 text-white" : "text-black"
              } hover:text-blue-600 focus:text-white`}
              onClick={() => onClick(item)}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
