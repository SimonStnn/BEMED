import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SurveyView from "../views/SurveyView.vue";
import AlternativesView from "../views/AlternativesView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import AssesmentView from '@/views/AssesmentView.vue'
import CreateAssesmentView from "@/views/CreateAssesmentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/survey",
      name: "survey",
      component: SurveyView,
    },
    {
      path: "/alternatives",
      name: "alternatives",
      component: AlternativesView,
    },
    {
      path: '/assesments',
      name: 'assesments',
      component: AssesmentView,
    },
    {
      path: '/assesments/create',
      name: 'assessments-create',
      component: CreateAssesmentView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
    },

    {
      path: "/product",
      name: "product-details",
      component: ProductDetailsView,
    },
  ],
});

export default router;
