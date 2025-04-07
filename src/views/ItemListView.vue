<script setup>
import axios from 'axios'
import { ref } from 'vue'

import ItemCard from '@/components/ItemCard.vue'

const items = ref([])

axios.get(`${import.meta.env.VITE_API_BASE_URL}/item`).then((r) => {
  console.log(r)
  items.value = r.data
})
</script>

<template>
  <div class="grid is-col-min-16">
    <div v-for="item in items" :key="item.id" class="cell">
      <ItemCard :item="item" />
    </div>
  </div>
</template>

<style scoped></style>
