import { createI18n } from "vue-i18n";
import en from "./locales/en.json"
import fr from "./locales/fr.json"

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  globalInjection: true,
  messages: {
    en,
  },
})