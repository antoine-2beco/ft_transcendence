import { createI18n } from "vue-i18n";
import en from "./en.json"

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  globalInjection: true,
  messages: {
    en,
  },
})