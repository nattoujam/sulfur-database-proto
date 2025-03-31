<script setup lang="ts">
import { computed } from 'vue'
import { Recipe } from '@/types/schemaType'

const props = defineProps<{
  recipe: Recipe
}>()

const reward = computed(() => {
  const sumMaterialTradeInPrice = props.recipe.materials
    .map((m) => m.item.tradeInPrice * m.amount)
    .reduce((sum, ele) => sum + ele, 0)
  const sumResultTradeInPrice = props.recipe.result.tradeInPrice * props.recipe.amount
  return sumResultTradeInPrice - sumMaterialTradeInPrice
})
</script>

<template>
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
          * {{ recipe.amount }}
          <small>￥{{ recipe.result.tradeInPrice }} ({{ recipe.result.price }})</small>
        </p>
        <ul>
          <li v-for="material in recipe.materials" :key="`${recipe.id}-${material.id}`">
            {{ material.item.name }} * {{ material.amount }} (￥{{ material.item.tradeInPrice }})
          </li>
        </ul>
        <p v-if="reward > 0">Rewards: ￥{{ reward }}</p>
        <p v-else class="has-text-danger">Rewards: ￥{{ reward }}</p>
      </div>
    </div>
  </article>
</template>
