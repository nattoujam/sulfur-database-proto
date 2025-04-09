<script setup lang="ts">
import { computed } from 'vue'
import type { Effect } from '@/types/schemaType'

const props = defineProps<{
  effect: Effect
}>()

const tagValue = computed<string>(() => {
  if ('flag' in props.effect) return props.effect.name
  if ('amount' in props.effect && 'second' in props.effect)
    return `${props.effect.name}: ${props.effect.amount} (${props.effect.second}s)`
  if ('amount' in props.effect) return `${props.effect.name}: ${props.effect.amount}`

  throw new Error(`invalid Effect: ${props.effect}`)
})
</script>

<template>
  <span class="tag">{{ tagValue }}</span>
</template>
