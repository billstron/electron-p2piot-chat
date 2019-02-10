import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faCog, faChevronLeft, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import SubPage from './components/SubPage';

library.add(faUserPlus);
library.add(faCog);
library.add(faChevronLeft);
library.add(faInfo);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('sub-page', SubPage);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
