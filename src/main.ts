import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';

import messagesEn from '@/assets/locales/en';
import messagesDe from '@/assets/locales/de';
import messagesIt from '@/assets/locales/it';

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: messagesEn,
    de: messagesDe,
    it: messagesIt,
  },
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
