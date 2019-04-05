import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import Vue2Filters from "vue2-filters";
import VueNumeric from 'vue-numeric';

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";


Vue.use(Vue2Filters);
Vue.use(VueNumeric);

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

 