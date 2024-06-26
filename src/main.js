import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false


import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

Vue.prototype.$dayjs = dayjs;


Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
