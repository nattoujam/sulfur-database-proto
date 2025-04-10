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

// Effects
const poisonedRemovable = ref(false)
const burningRemovable = ref(false)
const frozenRemovable = ref(false)
const poisonResistance = ref(undefined)
const poisonResistanceSecond = ref(undefined)
const fireResistance = ref(undefined)
const fireResistanceSecond = ref(undefined)
const frostResistance = ref(undefined)
const frostResistanceSecond = ref(undefined)
const electricResistance = ref(undefined)
const electricResistanceSecond = ref(undefined)
const slowMotionPercentage = ref(undefined)
const slowMotionSecond = ref(undefined)
const movementSpeedPercentage = ref(undefined)
const movementSpeedSecond = ref(undefined)
const dashBonus = ref(undefined)
const accuracyPercentage = ref(undefined)
const accuracySecond = ref(undefined)

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

  const itemEffects = {
    poisonedRemovable: poisonedRemovable.value,
    burningRemovable: burningRemovable.value,
    frozenRemovable: frozenRemovable.value,
    poisonResistance: poisonResistance.value,
    poisonResistanceSecond: poisonResistanceSecond.value,
    fireResistance: fireResistance.value,
    fireResistanceSecond: fireResistanceSecond.value,
    frostResistance: frostResistance.value,
    frostResistanceSecond: frostResistanceSecond.value,
    electricResistance: electricResistance.value,
    fireResistanceSecond: fireResistanceSecond.value,
    fireResistanceSecond: fireResistanceSecond.value,
    electricResistanceSecond: electricResistanceSecond.value,
    slowMotionPercentage: slowMotionPercentage.value,
    slowMotionSecond: slowMotionSecond.value,
    movementSpeedPercentage: movementSpeedPercentage.value,
    movementSpeedSecond: movementSpeedSecond.value,
    dashBonus: dashBonus.value,
    accuracyPercentage: accuracyPercentage.value,
    accuracySecond: accuracySecond.value,
  }

  const removeUndefined = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))

  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/item`, {
      name: name.value,
      tradeInPrice: tradeInPrice.value,
      price: price.value,
      size: Number.parseInt(size.value),
      healAmount: healAmount.value,
      healSecond: healSecond.value,
      itemEffect: {
        create: removeUndefined(itemEffects),
      },
    })
    .then((r) => {
      notificationVisible.value = true
    })
    .catch((e) => {
      hasError.value = true
      console.error(e)
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

    <div class="field is-horizontal">
      <div class="field-body">
        <FormField label-text="Heal amount">
          <FormInput v-model="healAmount" type="number" placeholder="10" />
        </FormField>
        <FormField label-text="Heal second">
          <FormInput v-model="healSecond" type="number" placeholder="5" />
        </FormField>
      </div>
    </div>

    <FormField label-text="Effects">
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Removable</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control">
              <input type="checkbox" v-model="poisonedRemovable" /> 中毒削除
            </div>
            <div class="control"><input type="checkbox" v-model="burningRemovable" /> 燃焼削除</div>
            <div class="control"><input type="checkbox" v-model="frozenRemovable" /> 凍結削除</div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">毒抵抗力</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="poisonResistance" type="number" placeholder="amount" />
          </div>
          <div class="field">
            <FormInput v-model="poisonResistanceSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">炎抵抗力</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="fireResistance" type="number" placeholder="amount" />
          </div>
          <div class="field">
            <FormInput v-model="fireResistanceSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">霧抵抗力</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="frostResistance" type="number" placeholder="amount" />
          </div>
          <div class="field">
            <FormInput v-model="frostResistanceSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">電気抵抗力</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="electricResistance" type="number" placeholder="amount" />
          </div>
          <div class="field">
            <FormInput v-model="electricResistanceSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">スローモーション</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="slowMotionPercentage" type="number" placeholder="percent" />
          </div>
          <div class="field">
            <FormInput v-model="slowMotionSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">移動速度</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="movementSpeedPercentage" type="number" placeholder="percent" />
          </div>
          <div class="field">
            <FormInput v-model="movementSpeedSecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">ダッシュボーナス</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="dashBonus" type="number" placeholder="amount" />
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">移動時精度</label>
        </div>
        <div class="field-body">
          <div class="field">
            <FormInput v-model="accuracyPercentage" type="number" placeholder="percent" />
          </div>
          <div class="field">
            <FormInput v-model="accuracySecond" type="number" placeholder="second" />
          </div>
        </div>
      </div>
    </FormField>

    <div class="field is-grouped is-grouped-centered">
      <FormButton button-style="is-link" :disabled="posting" @click="onSubmit">Submit</FormButton>
      <FormButton button-style="is-link is-light" @click="onClear">Clear</FormButton>
    </div>
  </div>
</template>
