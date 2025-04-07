<script setup lang="ts">
import { computed } from 'vue'
import { Recipe } from '@/types/schemaType'

import CommonCard from '@/components/atoms/CommonCard.vue'

const props = defineProps<{
  recipe: Recipe
}>()

const title = computed(
  () => `【${props.recipe.result.size}】 ${props.recipe.result.name} × ${props.recipe.amount}`,
)
const subtitle = computed(
  () => `S: ￥${props.recipe.result.tradeInPrice} (B: ￥${props.recipe.result.price})`,
)
const createdTimestamp = computed(() => new Date(props.recipe.createdAt).toLocaleString())

const reward = computed(() => {
  const sumMaterialTradeInPrice = props.recipe.materials
    .map((m) => m.item.tradeInPrice * m.amount)
    .reduce((sum, ele) => sum + ele, 0)
  const sumResultTradeInPrice = props.recipe.result.tradeInPrice * props.recipe.amount
  return sumResultTradeInPrice - sumMaterialTradeInPrice
})
</script>

<template>
  <CommonCard
    imageUrl="https://bulma.io/assets/images/placeholders/96x96.png"
    imageAlt="Image"
    :title="title"
    :subtitle="subtitle"
    :timestamp="createdTimestamp"
  >
    <ul>
      <li v-for="material in recipe.materials" :key="`${recipe.id}-${material.id}`">
        {{ material.item.name }} × {{ material.amount }} (S: ￥{{ material.item.tradeInPrice }})
      </li>
    </ul>
    <p v-if="reward > 0">Rewards: ￥{{ reward }}</p>
    <p v-else class="has-text-danger">Rewards: ￥{{ reward }}</p>
  </CommonCard>
</template>
