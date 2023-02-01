import i18next from 'i18next';

i18next.init({
  fallbackLng: 'fi',
  resources: {
    fi: {
      translation: require('./locales/fi/translation.json'),
    },
  },
});

export default i18next.getFixedT('fi');
