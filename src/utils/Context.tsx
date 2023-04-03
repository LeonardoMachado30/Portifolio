import { createContext, useContext } from "react";

interface UserContextValue {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<UserContextValue>({
  language: "pt",
  setLanguage: () => {},
});

export { LanguageContext };
