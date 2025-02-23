import { createRouter, createWebHistory } from 'vue-router'
import ItemListView from '@/views/ItemListView.vue'
import CreateRecipeView from '@/views/CreateRecipeView.vue'
import RecipeListView from '@/views/RecipeListView.vue'
import CreateItemView from '@/views/CreateItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ItemListView,
    },
    {
      path: '/item',
      name: 'itemList',
      component: ItemListView,
    },
    {
      path: '/item/create',
      name: 'createItem',
      component: CreateItemView,
    },
    {
      path: '/recipe',
      name: 'recipeList',
      component: RecipeListView,
    },
    {
      path: '/recipe/create',
      name: 'createRecipe',
      component: CreateRecipeView,
    },
  ],
})

export default router
