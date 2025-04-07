<script setup lang="ts">
const props = defineProps<{
  imageUrl: Url
  imageAlt: string
  title: string
  subtitle: string
  timestamp: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="imageUrl" :alt="imageAlt" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">{{ props.title }}</p>
          <p class="subtitle is-6">{{ props.subtitle }}</p>
        </div>
      </div>

      <div class="content">
        <slot> </slot>
        <p class="has-text-right is-size-7 has-text-grey">
          {{ timestamp }}
        </p>
      </div>
    </div>
  </div>
</template>
