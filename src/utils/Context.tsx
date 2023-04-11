import { createContext, useContext } from "react";

interface ILanguage {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<ILanguage>({
  language: "pt",
  setLanguage: () => {},
});

export { LanguageContext };

interface IAnimation {
  animation: boolean;
  setAnimation: (language: boolean) => void;
}

const AnimationContext = createContext<IAnimation>({
  animation: true,
  setAnimation: () => {},
});

export { AnimationContext };
