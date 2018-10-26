import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddictionsNew from './views/AddictionsNew.vue';
import CircumstancesNew from './views/CircumstancesNew.vue';
import AddictionOccurrencesNew from './views/AddictionOccurrencesNew.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/addictions/new',name: 'addictions-new',component: AddictionsNew},
    {path: '/circumstances/new',name: 'circumstances-new',component: CircumstancesNew},
    {path: '/addictionOccurrences/new',name: 'addictionOccurrences-new',component: AddictionOccurrencesNew}

  ]
});
