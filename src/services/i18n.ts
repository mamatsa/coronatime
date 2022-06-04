import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// "Inline" English and Arabic translations.
// We can localize to any language and any number of languages.

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: 'en',
    supportedLngs: ['en', 'geo'],
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;
