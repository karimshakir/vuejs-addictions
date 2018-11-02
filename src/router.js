import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import AddictionsNew from './views/AddictionsNew.vue';
import CircumstancesNew from './views/CircumstancesNew.vue';
import AddictionOccurrencesNew from './views/AddictionOccurrencesNew.vue';
import Stats from './views/Stats.vue';

import Signup from './views/Signup.vue';
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

import Testpage from "./views/Testpage.vue";



Vue.use(Router);

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/addictions/new',name: 'addictions-new',component: AddictionsNew},
    {path: '/circumstances/new',name: 'circumstances-new',component: CircumstancesNew},
    {path: '/addiction_occurrences/new',name: 'addiction-occurrences-new',component: AddictionOccurrencesNew},
    {path: '/stats',name: 'stats',component: Stats},

    { path: '/signup', name: 'signup', component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },

    { path: "/testpage", name: "testpage", component: Testpage }
  ]
});
