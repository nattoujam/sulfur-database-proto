<script setup>
import axios from 'axios'
import { ref } from 'vue'

import RecipeCard from '@/components/RecipeCard.vue'

const recipes = ref([])

axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipe`).then((r) => (recipes.value = r.data))
</script>

<template>
  <div class="grid is-col-min-16">
    <div v-for="recipe in recipes" :key="recipe.id" class="cell">
      <RecipeCard :recipe="recipe" />
    </div>
  </div>
</template>
