<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

import FormField from '@/components/atoms/FormField.vue'
import FormInput from '@/components/atoms/FormInput.vue'
import FormSelect from '@/components/atoms/FormSelect.vue'
import FormButton from '@/components/atoms/FormButton.vue'

const resultId = ref(0)
const amount = ref(0)
const materials = ref([])

const selectItemId = ref(0)

const items = ref([])

const posting = ref(false)
const notificationVisible = ref(false)
const error = ref(false)

const materialItems = computed(() => {
  return items.value.filter((item) => {
    return !materials.value.map((material) => material.itemId).includes(item.id)
  })
})

const onDeleteMaterial = (index) => {
  materials.value = materials.value.toSpliced(index, 1)
}

const onAddMaterial = () => {
  const item = items.value.find((item) => item.id === selectItemId.value)
  materials.value.push({ itemId: selectItemId.value, amount: 1, name: item.name })
}

const onClear = () => {
  resultId.value = 0
  amount.value = 0
  materials.value = []
}

const onSubmit = () => {
  posting.value = true
  notificationVisible.value = false
  error.value = false

  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/recipe`, {
      resultId: resultId.value,
      amount: amount.value,
      materials: materials.value.map((material) => ({
        itemId: material.itemId,
        amount: material.amount,
      })),
    })
    .then((r) => {
      notificationVisible.value = true
    })
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      posting.value = false
    })
}

axios.get(`${import.meta.env.VITE_API_BASE_URL}/item`).then((r) => (items.value = r.data))
</script>

<template>
  <div>
    <div v-if="notificationVisible" class="notification is-success">
      <button class="delete" @click="() => (notificationVisible = false)"></button>
      <strong>Success</strong>: create item
    </div>
    <div v-if="error" class="notification is-danger">
      <button class="delete" @click="() => (error = false)"></button>
      <strong>Failed</strong>: create item
    </div>

    <FormField label-text="Result">
      <FormSelect
        v-model="resultId"
        :option-list="items.map((item) => ({ value: item.id, name: item.name }))"
      />
    </FormField>

    <FormField label-text="Amount">
      <FormInput v-model="amount" type="number" placeholder="1" />
    </FormField>

    <FormField label-text="Materials">
      <div class="field has-addons">
        <FormSelect
          v-model="selectItemId"
          :option-list="
            materialItems.map((materialItem) => ({
              value: materialItem.id,
              name: materialItem.name,
            }))
          "
        />
        <FormButton @click="onAddMaterial">+ add</FormButton>
      </div>
    </FormField>

    <div
      v-for="(material, index) in materials"
      :key="`material${material.itemId}`"
      class="field is-horizontal"
    >
      <div class="field-label is-small">
        <label class="label">{{ material.name }}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <FormInput
            v-model="material.amount"
            input-style="is-small"
            type="number"
            placeholder="8"
          />
        </div>
      </div>
      <button class="delete" @click="() => onDeleteMaterial(index)"></button>
    </div>

    <div class="field is-grouped">
      <FormButton button-style="is-link" :disabled="posting" @click="onSubmit">Submit</FormButton>
      <FormButton button-style="is-link is-light" @click="onClear">Clear</FormButton>
    </div>
  </div>
</template>
