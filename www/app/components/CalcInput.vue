<script setup lang="ts">
// One labelled number field for the free calculators. `name` and
// `description` double as the WebMCP tool parameter (toolparamdescription).
defineProps<{
  id: string
  name: string
  label: string
  description: string
  prefix?: string
  suffix?: string
  min?: number
  max?: number
  step?: number
  hint?: string
}>()
const model = defineModel<number>({ required: true })
</script>

<template>
  <div>
    <label :for="id" class="text-sm font-medium text-stone-900">{{ label }}</label>
    <div class="mt-1.5 flex items-center rounded-xl border border-stone-300 bg-white focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
      <span v-if="prefix" class="pl-3 text-stone-500" aria-hidden="true">{{ prefix }}</span>
      <input
        :id="id"
        v-model.number="model"
        type="number"
        inputmode="decimal"
        :name="name"
        :toolparamdescription="description"
        :min="min ?? 0"
        :max="max"
        :step="step ?? 'any'"
        required
        class="w-full min-w-0 rounded-xl bg-transparent px-3 py-2.5 text-base text-stone-900 outline-none"
      >
      <span v-if="suffix" class="pr-3 text-stone-500" aria-hidden="true">{{ suffix }}</span>
    </div>
    <p v-if="hint" class="mt-1 text-xs text-stone-500">{{ hint }}</p>
  </div>
</template>
