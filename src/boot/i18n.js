import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { LocalStorage } from 'quasar';

let currentLocale = 'ru';
LocalStorage.has('currentLocale')
  ? (currentLocale = LocalStorage.getItem('currentLocale'))
  : (currentLocale = 'ru');

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: currentLocale,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
