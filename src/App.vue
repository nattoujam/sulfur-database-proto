<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const PAGE_LINK_LIST = [
  { displayName: 'Item', path: '/item' },
  { displayName: 'createItem', path: '/item/create' },
  { displayName: 'recipe', path: '/recipe' },
  { displayName: 'createRecipe', path: '/recipe/create' },
]

const route = useRoute()

const activePage = ref<string>('/item')

watch(
  () => route.path,
  () => {
    activePage.value = route.path
  },
)
</script>

<template>
  <header class="hero is-primary is-small">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">SULFUR Database</h1>
        <h2 class="subtitle">- proto -</h2>
      </div>
    </div>

    <div class="hero-foot">
      <nav class="tabs is-boxed is-centered">
        <div class="container">
          <ul>
            <li
              v-for="page in PAGE_LINK_LIST"
              :key="page.path"
              :class="activePage === page.path ? 'is-active' : ''"
            >
              <RouterLink :to="page.path">{{ page.displayName }}</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
}

main {
  max-width: 1280px;
  padding: 2rem;
  overflow-y: scroll;
  padding-top: 30px;
}
</style>
