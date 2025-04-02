<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

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

  console.log({
    resultId: resultId.value,
    amount: amount.value,
    materials: materials.value.map((material) => ({
      itemId: material.itemId,
      amount: material.amount,
    })),
  })

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
      console.log(r)
      notificationVisible.value = true
    })
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      posting.value = false
    })
}

axios.get(`${import.meta.env.VITE_API_BASE_URL}/item`).then((r) => {
  console.log(r)
  items.value = r.data
})
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

    <div class="field">
      <label class="label">Result</label>
      <div class="control">
        <div class="select">
          <select v-model="resultId">
            <option v-for="item in items" :key="`item${item.id}`" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Amount</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="1"
          :value="amount"
          @input="(e) => (amount = Number.parseInt(e.target.value))"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Materials</label>
      <div class="field has-addons">
        <div class="control">
          <div class="select">
            <select v-model="selectItemId">
              <option v-for="item in materialItems" :key="`item${item.id}`" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <button class="button" @click="onAddMaterial">+ add</button>
        </div>
      </div>
    </div>

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
          <div class="control">
            <input
              class="input is-small"
              type="number"
              placeholder="8"
              :value="material.amount"
              @input="(e) => (materials[index].amount = Number.parseInt(e.target.value))"
            />
          </div>
        </div>
      </div>
      <button class="delete" @click="() => onDeleteMaterial(index)"></button>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="posting" @click="onSubmit">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="onClear">Clear</button>
      </div>
    </div>
  </div>
</template>
