import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en.json";
import el from "./locales/el.json";
import pl from "./locales/pl.json";
import it from "./locales/it.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import pt from "./locales/pt.json";
import nl from "./locales/nl.json";
import fr from "./locales/fr.json";
import ro from "./locales/ro.json";
import zhTw from "./locales/zh-tw.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      el: { translation: el },
      pl: { translation: pl },
      it: { translation: it },
      es: { translation: es },
      de: { translation: de },
      pt: { translation: pt },
      nl: { translation: nl },
      fr: { translation: fr },
      ro: { translation: ro },
      zh: { translation: zhTw },
      "zh-tw": { translation: zhTw },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
