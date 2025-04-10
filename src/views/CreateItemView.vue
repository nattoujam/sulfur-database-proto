<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

import FormField from '@/components/atoms/FormField.vue'
import FormInput from '@/components/atoms/FormInput.vue'
import FormSelect from '@/components/atoms/FormSelect.vue'
import FormButton from '@/components/atoms/FormButton.vue'

const name = ref('')
const tradeInPrice = ref(0)
const size = ref(1)
const healAmount = ref(0)
const healSecond = ref(0.0)

const posting = ref(false)
const notificationVisible = ref(false)
const hasError = ref(false)

const price = computed(() => tradeInPrice.value * 2)

const onClear = () => {
  name.value = ''
  tradeInPrice.value = 0
  size.value = 0
  healAmount.value = 0
  healSecond.value = 0.0
}

const onSubmit = () => {
  posting.value = true
  notificationVisible.value = false
  hasError.value = false

  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/item`, {
      name: name.value,
      tradeInPrice: tradeInPrice.value,
      price: price.value,
      size: Number.parseInt(size.value),
      healAmount: healAmount.value,
      healSecond: healSecond.value,
    })
    .then((r) => {
      notificationVisible.value = true
    })
    .catch(() => {
      hasError.value = true
    })
    .finally(() => {
      posting.value = false
    })
}
</script>

<template>
  <div>
    <div v-if="notificationVisible" class="notification is-success">
      <button class="delete" @click="() => (notificationVisible = false)"></button>
      <strong>Success</strong>: create item
    </div>
    <div v-if="hasError" class="notification is-danger">
      <button class="delete" @click="() => (hasError = false)"></button>
      <strong>Failed</strong>: create item
    </div>

    <FormField label-text="Name">
      <FormInput v-model="name" placeholder="きのこ" />
    </FormField>

    <div class="field is-horizontal">
      <div class="field-body">
        <FormField label-text="Trade in price">
          <FormInput v-model="tradeInPrice" type="number" placeholder="5" />
        </FormField>
        <FormField label-text="Price">
          <FormInput v-model="price" placeholder="10" disabled />
        </FormField>
      </div>
    </div>

    <FormField label-text="Size">
      <FormSelect
        v-model="size"
        :option-list="
          [1, 2, 4].map((n) => ({
            value: n,
            name: n,
          }))
        "
      />
    </FormField>

    <FormField label-text="Heal amount">
      <FormInput v-model="healAmount" type="number" placeholder="10" />
    </FormField>

    <FormField label-text="Heal second">
      <FormInput v-model="healSecond" type="number" placeholder="5" />
    </FormField>

    <div class="field is-grouped is-grouped-centered">
      <FormButton button-style="is-link" :disabled="posting" @click="onSubmit">Submit</FormButton>
      <FormButton button-style="is-link is-light" @click="onClear">Clear</FormButton>
    </div>
  </div>
</template>
