import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SurveyView from "../views/SurveyView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import AssessmentView from '@/views/AssessmentView.vue'
import CreateAssessmentView from "@/views/CreateAssessmentView.vue";
import ChooseAltView from '@/views/ChooseAltView.vue'

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
      component: ChooseAltView,
    },
    {
      path: '/assessments',
      name: 'assessments',
      component: AssessmentView,
    },
    {
      path: '/assessments/create',
      name: 'assessments-create',
      component: CreateAssessmentView,
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
