import { initReactI18next } from "react-i18next";
import i18next from "i18next";

// Import translation files
import { en, es, lt, ru } from "../locales/lang";
import useStore from "../store"; // Import your Zustand store

// Get initial language from Zustand store
const initialLang = useStore.getState().appStore.lang;
i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    lt: { translation: lt },
    es: { translation: es },
  },
  lng: initialLang, // Set initial language from localStorage or default to 'en'
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  react: {
    useSuspense: false, // Disable suspense if you're not using it
  },
});

export default i18next;
