import { useCallback, useContext, useEffect, useState } from "react";
import { LanguageContext } from "./Context";

/**
 *
 * @param filePT - get file ressource pt
 * @param fileEN get file ressource en
 *
 **/
export default function useRessource(path: string) {
  const { language } = useContext(LanguageContext);
  const [localizer, setLocalizer] = useState<any>();

  const languageRequest = useCallback(() => {
    if (language === "en") {
      import(`@/components/${path}/ressourceEN.ts`).then((resp) => {
        setLocalizer(resp.localizer);
      });
    } else {
      import(`@/components/${path}/ressourcePT.ts`).then((resp) => {
        setLocalizer(resp.localizer);
      });
    }
  }, [language]);

  useEffect(() => {
    languageRequest();
  }, [language]);

  return localizer;
}

