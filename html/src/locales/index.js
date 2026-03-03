import { createI18n } from "vue-i18n";
import en from "./en.json"
import fr from "./fr.json"
import nl from "./nl.json"

export const i18n = createI18n({
  globalInjection: true,
  messages: {
    fr,
    en,
    nl,
  },
});

export default i18n;