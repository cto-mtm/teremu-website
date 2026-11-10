<script setup lang="ts">
/**
 * Food cost % for a period: (opening inventory + purchases − closing
 * inventory) ÷ food sales, against the 28–35% band Teremu's dashboard uses.
 * Markdown: `::food-cost-calculator`.
 */
const { t } = useI18n()
const { usd, pct } = useCalcFormat()

const BAND_LOW = 0.28
const BAND_HIGH = 0.35

const v = reactive({
  opening: 3000, // inventory at the start of the period
  purchases: 6000, // food purchases during the period
  closing: 2800, // inventory at the end of the period
  sales: 20000, // food sales in the period
})

const used = computed(() => v.opening + v.purchases - v.closing)
const ratio = computed(() => (v.sales > 0 ? used.value / v.sales : 0))
const status = computed(() => (ratio.value < BAND_LOW ? 'low' : ratio.value > BAND_HIGH ? 'high' : 'ok'))
// What each point above the band's top costs in money for these sales.
const overBand = computed(() => Math.max(0, used.value - v.sales * BAND_HIGH))
const valid = computed(() => v.sales > 0 && used.value >= 0)
</script>

<template>
  <div class="not-prose my-8 rounded-3xl border border-stone-200 bg-white p-6 depth-card sm:p-8">
    <p class="eyebrow">{{ t('tools.freeBadge') }}</p>
    <h3 class="mt-1 text-xl font-bold text-stone-900">{{ t('tools.foodCostTitle') }}</h3>
    <!-- WebMCP Declarative API: exposes the calculator as a tool for browser AI agents. -->
    <form
      class="mt-6 grid gap-8 md:grid-cols-2"
      toolname="calculateFoodCostPercentage"
      tooldescription="Calculate food cost percentage for a period: opening inventory plus purchases minus closing inventory, divided by food sales. Provide all four values in US dollars."
      @submit.prevent
    >
      <div class="grid gap-4">
        <CalcInput id="fc-opening" v-model="v.opening" name="openingInventory" :label="t('tools.foodCostOpening')" description="Value of food inventory at the start of the period, in US dollars." prefix="$" :step="1" />
        <CalcInput id="fc-purchases" v-model="v.purchases" name="purchases" :label="t('tools.foodCostPurchases')" description="Food purchases during the period, in US dollars." prefix="$" :step="1" />
        <CalcInput id="fc-closing" v-model="v.closing" name="closingInventory" :label="t('tools.foodCostClosing')" description="Value of food inventory at the end of the period, in US dollars." prefix="$" :step="1" />
        <CalcInput id="fc-sales" v-model="v.sales" name="foodSales" :label="t('tools.foodCostSales')" description="Food sales in the period, in US dollars." prefix="$" :step="1" :min="1" />
      </div>

      <div class="flex flex-col gap-4" role="status" aria-live="polite" aria-atomic="true">
        <template v-if="valid">
          <div
            class="rounded-2xl p-5 ring-1"
            :class="status === 'ok' ? 'bg-herb-50 ring-herb-100' : status === 'high' ? 'bg-coral-50 ring-coral-100' : 'bg-ember-50 ring-ember-100'"
          >
            <p class="text-sm font-medium text-stone-800">{{ t('tools.foodCostResult') }}</p>
            <p class="num-display mt-1 text-4xl font-bold leading-none text-stone-900">{{ pct(ratio) }}</p>
            <p class="mt-2 text-sm text-stone-600">{{ t(`tools.foodCostStatus_${status}`, { over: usd(overBand) }) }}</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-5 text-sm text-stone-600">
            {{ t('tools.foodCostUsed', { used: usd(used) }) }}
          </div>
        </template>
        <p v-else class="rounded-2xl bg-stone-50 p-5 text-sm text-stone-600">{{ t('tools.invalid') }}</p>
        <CalcCta />
      </div>
    </form>
  </div>
</template>
