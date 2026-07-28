import { createContext, useContext, useState, useEffect } from "react";
import { getT } from "@/lib/i18n";

const LangContext = createContext({ lang: "en", setLang: () => {}, t: getT("en") });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("fg_lang") || "en");

  const setLang = (l) => {
    localStorage.setItem("fg_lang", l);
    setLangState(l);
  };

  const t = getT(lang);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
