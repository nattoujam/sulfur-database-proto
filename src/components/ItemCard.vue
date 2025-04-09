<script setup lang="ts">
import { computed } from 'vue'
import { Item } from '@/types/schemaType'

import CommonCard from '@/components/atoms/CommonCard.vue'
import ItemEffectTag from '@/components/ItemEffectTag.vue'

const props = defineProps<{
  item: Item
}>()

const title = computed(() => `【${props.item.size}】 ${props.item.name}`)
const subtitle = computed(() => `S: ￥${props.item.tradeInPrice} (B: ￥${props.item.price})`)
const createdTimestamp = computed(() => new Date(props.item.createdAt).toLocaleString())
</script>

<template>
  <CommonCard
    imageUrl="https://bulma.io/assets/images/placeholders/96x96.png"
    imageAlt="Placeholder image"
    :title="title"
    :subtitle="subtitle"
    :timestamp="createdTimestamp"
  >
    回復量: {{ item.healAmount }}<br />
    回復速度: {{ item.healSecond }}s
    <div class="tags">
      <ItemEffectTag v-for="(effect, index) in item.itemEffectList" :key="index" :effect="effect" />
    </div>
  </CommonCard>
</template>
