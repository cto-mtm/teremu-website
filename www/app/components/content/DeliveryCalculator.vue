<script setup lang="ts">
/**
 * Delivery-app commission calculator: what a dish really earns after the
 * app's cut, its real food cost %, and the menu price that keeps a target
 * cost % on what you actually receive. Markdown: `::delivery-calculator`.
 */
const { t } = useI18n()
const { usd, pct } = useCalcFormat()

const v = reactive({
  price: 14, // menu price on the app
  cost: 4.5, // ingredients + packaging
  commission: 25, // % the app keeps
  target: 35, // target cost % of what you receive
})

const received = computed(() => v.price * (1 - v.commission / 100))
const commissionAmt = computed(() => v.price - received.value)
const realPct = computed(() => (received.value > 0 ? v.cost / received.value : 0))
const menuPct = computed(() => (v.price > 0 ? v.cost / v.price : 0))
const leftOver = computed(() => received.value - v.cost)
// Price p such that cost / (p × (1 − c)) = target.
const neededPrice = computed(() => v.cost / ((v.target / 100) * (1 - v.commission / 100)))
const valid = computed(() => v.price > 0 && v.cost >= 0 && v.commission >= 0 && v.commission < 100 && v.target > 0 && v.target < 100)
</script>

<template>
  <div class="not-prose my-8 rounded-3xl border border-stone-200 bg-white p-6 depth-card sm:p-8">
    <p class="eyebrow">{{ t('tools.freeBadge') }}</p>
    <h3 class="mt-1 text-xl font-bold text-stone-900">{{ t('tools.deliveryTitle') }}</h3>
    <!-- WebMCP Declarative API: exposes the calculator as a tool for browser AI agents. -->
    <form
      class="mt-6 grid gap-8 md:grid-cols-2"
      toolname="calculateDeliveryAppMargin"
      tooldescription="Calculate what a dish really earns on a delivery app after the app's commission, its real food cost percentage, and the menu price needed to keep a target food cost. Provide the menu price on the app and the dish cost including packaging in US dollars, the commission percentage, and the target cost percentage."
      @submit.prevent
    >
      <div class="grid gap-4">
        <CalcInput id="dc-price" v-model="v.price" name="appMenuPrice" :label="t('tools.deliveryPrice')" description="Menu price of the dish on the delivery app, in US dollars." prefix="$" :step="0.01" />
        <CalcInput id="dc-cost" v-model="v.cost" name="dishCost" :label="t('tools.deliveryCost')" description="Cost of the dish including packaging, in US dollars." prefix="$" :step="0.01" />
        <CalcInput id="dc-commission" v-model="v.commission" name="commissionPercent" :label="t('tools.deliveryCommission')" description="Commission the delivery app keeps, as a percentage of the menu price." suffix="%" :step="0.5" :max="99" :hint="t('tools.deliveryCommissionHint')" />
        <CalcInput id="dc-target" v-model="v.target" name="targetCostPercent" :label="t('tools.deliveryTarget')" description="Target cost as a percentage of what you receive after commission." suffix="%" :step="1" :min="1" :max="99" />
      </div>

      <div class="flex flex-col gap-4" role="status" aria-live="polite" aria-atomic="true">
        <template v-if="valid">
          <div class="rounded-2xl bg-ember-50 p-5 ring-1 ring-ember-100">
            <p class="text-sm font-medium text-ember-800">{{ t('tools.deliveryReceived') }}</p>
            <p class="num-display mt-1 text-4xl font-bold leading-none text-ember-700">{{ usd(received) }}</p>
            <p class="mt-2 text-sm text-stone-600">{{ t('tools.deliveryReceivedNote', { commission: usd(commissionAmt), left: usd(leftOver) }) }}</p>
          </div>
          <div class="rounded-2xl p-5 ring-1" :class="realPct > v.target / 100 ? 'bg-coral-50 ring-coral-100' : 'bg-herb-50 ring-herb-100'">
            <p class="text-sm text-stone-700">{{ t('tools.deliveryRealPct', { real: pct(realPct), menu: pct(menuPct) }) }}</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-5">
            <p class="text-sm font-medium text-stone-900">{{ t('tools.deliveryNeeded', { pct: v.target }) }}</p>
            <p class="num-display mt-1 text-3xl font-bold text-stone-900">{{ usd(neededPrice) }}</p>
          </div>
        </template>
        <p v-else class="rounded-2xl bg-stone-50 p-5 text-sm text-stone-600">{{ t('tools.invalid') }}</p>
        <CalcCta />
      </div>
    </form>
  </div>
</template>
