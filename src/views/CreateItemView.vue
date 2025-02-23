<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

const name = ref('')
const tradeInPrice = ref(0)
const size = ref(0)
const healAmount = ref(0)
const healSecond = ref(0)

const posting = ref(false)
const notificationVisible = ref(false)
const error = ref(false)

const price = computed(() => tradeInPrice.value * 2)

const onClear = () => {
  name.value = ''
  tradeInPrice.value = 0
  size.value = 0
  healAmount.value = 0
  healSecond.value = 0
}

const onSubmit = () => {
  posting.value = true
  notificationVisible.value = false
  error.value = false

  console.log({
    name: name.value,
    tradeInPrice: tradeInPrice.value,
    price: price.value,
    size: Number.parseInt(size.value),
    healAmount: healAmount.value,
    healSecond: healSecond.value,
  })

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
</script>

<template>
  <main>
    <div v-if="notificationVisible" class="notification is-success">
      <button class="delete" @click="() => (notificationVisible = false)"></button>
      <strong>Success</strong>: create item
    </div>
    <div v-if="error" class="notification is-danger">
      <button class="delete" @click="() => (error = false)"></button>
      <strong>Failed</strong>: create item
    </div>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="きのこ" v-model="name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Trade in price</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="5"
          :value="tradeInPrice"
          @input="(e) => (tradeInPrice = Number.parseInt(e.target.value))"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input class="input" type="number" placeholder="10" disabled :value="price" />
      </div>
    </div>

    <div class="field">
      <label class="label">Size</label>
      <div class="control">
        <div class="select">
          <select v-model="size">
            <option>1</option>
            <option>2</option>
            <option>4</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Heal amount</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="10"
          :value="healAmount"
          @input="(e) => (healAmount = Number.parseInt(e.target.value))"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Heal second</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="5"
          :value="healSecond"
          @input="(e) => (healSecond = Number.parseInt(e.target.value))"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :disabled="posting" @click="onSubmit">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="onClear">Clear</button>
      </div>
    </div>
  </main>
</template>
