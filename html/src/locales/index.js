import { createI18n } from "vue-i18n";
import en from "./en.json"
import fr from "./fr.json"

export default createI18n({
  // locale: import.meta.env.VITE_DEFAULT_LOCALE,
  locale: 'fr',
  globalInjection: true,
  messages: {
    fr,
    en,
  },
})