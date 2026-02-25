import { createI18n } from "vue-i18n";
import en from "./en.json"
import fr from "./fr.json"

export const i18n = createI18n({
  locale: 'en',
  globalInjection: true,
  messages: {
    fr,
    en,
  },
});

export default i18n;