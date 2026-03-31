import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ApodList from '../views/ApodView.vue';
import MarsList from '../views/MarsView.vue';
import AsteroidList from '../views/AsteroidView.vue';
import ItemDetail from '../views/ItemDetailView.vue';
import Page_404 from '../views/NotFoundView.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/apod', 
    name: 'Apod', 
    component: ApodList 
  },
  { 
    path: '/mars', 
    name: 'Mars', 
    component: MarsList 
  },
  { 
    path: '/asteroids', 
    name: 'Asteroids', 
    component: AsteroidList 
  },
  { 
    path: '/detail/:id', 
    name: 'Details', 
    component: ItemDetail, 
    props: true 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: Page_404 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;