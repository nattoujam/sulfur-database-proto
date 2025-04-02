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

const activePage = ref<string>('')

watch(
  () => route.path,
  () => {
    activePage.value = route.path
  },
)
</script>

<template>
  <header>
    <nav class="tabs is-centered">
      <ul>
        <li
          v-for="page in PAGE_LINK_LIST"
          :key="page.path"
          :class="activePage === page.path ? 'is-active' : ''"
        >
          <RouterLink :to="page.path">{{ page.displayName }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  height: 5vh;
}

main {
  height: 95vh;
  padding: 2rem;
  overflow-y: scroll;
  padding-top: 30px;
}
</style>
