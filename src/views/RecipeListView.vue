<script setup>
import axios from 'axios'
import { ref } from 'vue'

const recipes = ref([])

const calculateRewards = (recipe) => {
  const sumMaterialTradeInPrice = recipe.materials.map(m => m.item.tradeInPrice * m.amount).reduce((sum, ele) => sum + ele, 0)
  return recipe.result.tradeInPrice - sumMaterialTradeInPrice
}

axios.get(`${import.meta.env.VITE_API_BASE_URL}/recipe`).then((r) => {
  console.log(r)
  recipes.value = r.data
})
</script>

<template>
  <main>
    <div v-for="recipe in recipes" :key="recipe.id" class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>【{{ recipe.result.size }}】{{ recipe.result.name }}</strong>
              <small>￥{{ recipe.result.tradeInPrice }} ({{ recipe.result.price }})</small>
              <ul>
                <li v-for="(material) in recipe.materials" :key="`${recipe.id}-${material.id}`" >
                  {{ material.amount }} - {{ material.item.name }} (￥{{ material.item.tradeInPrice }})
                </li>
              </ul>
            </p>
            <p v-if="calculateRewards(recipe) > 0">Rewards: ￥{{ calculateRewards(recipe) }}</p>
            <p v-else class="has-text-danger">Rewards: ￥{{ calculateRewards(recipe) }}</p>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>
