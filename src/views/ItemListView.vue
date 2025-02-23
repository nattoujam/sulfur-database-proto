<script setup>
import axios from 'axios'
import { ref } from 'vue'

const items = ref([])

axios.get(`${import.meta.env.VITE_API_BASE_URL}/item`).then((r) => {
  console.log(r)
  items.value = r.data
})
</script>

<template>
  <div class="column">
    <div v-for="item in items" :key="item.id" class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/assets/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">【{{ item.size }}】{{ item.name }}</p>
            <p class="subtitle is-6">￥{{ item.tradeInPrice }} ({{ item.price }})</p>
          </div>
        </div>

        <div class="content">
          <p>回復量: {{ item.healAmount }} / 回復速度: {{ item.healSecond }}s</p>
          <time>update: {{ new Date(item.createdAt) }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
