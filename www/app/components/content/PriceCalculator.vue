<script setup lang="ts">
/**
 * Selling-price calculator: cost of a recipe or batch → cost per unit actually
 * sold → price for a target ingredient-cost %. Works for a loaf, a taco, a
 * cocktail or a plate. Usable in markdown as `::price-calculator` and on the
 * tools page. Pure arithmetic, nothing leaves the browser.
 */
const { t } = useI18n()
const { usd, pct } = useCalcFormat()

const v = reactive({
  batchCost: 4.37, // ingredients for the whole recipe or batch
  made: 20, // units the recipe yields
  sold: 18, // units you actually sell (after burnt, misshapen, leftover)
  target: 30, // target ingredient cost as % of price
  current: 1, // price you charge today (optional, 0 = skip)
})

const unitCost = computed(() => (v.sold > 0 ? v.batchCost / v.sold : 0))
const idealUnitCost = computed(() => (v.made > 0 ? v.batchCost / v.made : 0))
const price = computed(() => (v.target > 0 ? unitCost.value / (v.target / 100) : 0))
const options = computed(() => [25, 30, 35].map(p => ({ p, price: unitCost.value / (p / 100) })))
const currentPct = computed(() => (v.current > 0 ? unitCost.value / v.current : 0))
const currentMargin = computed(() => v.current - unitCost.value)
const valid = computed(() => v.batchCost > 0 && v.sold > 0 && v.target > 0 && v.target < 100)
</script>

<template>
  <div class="not-prose my-8 rounded-3xl border border-stone-200 bg-white p-6 depth-card sm:p-8">
    <p class="eyebrow">{{ t('tools.freeBadge') }}</p>
    <h3 class="mt-1 text-xl font-bold text-stone-900">{{ t('tools.priceTitle') }}</h3>
    <!-- WebMCP Declarative API: exposes the calculator as a tool for browser AI agents. -->
    <form
      class="mt-6 grid gap-8 md:grid-cols-2"
      toolname="calculateFoodSellingPrice"
      tooldescription="Calculate the cost per unit and the selling price of a food or drink item. Provide the ingredient cost of the whole recipe or batch in US dollars, how many units it makes, how many of those are actually sold, the target ingredient cost as a percentage of price, and optionally the current price."
      @submit.prevent
    >
      <div class="grid gap-4">
        <CalcInput id="pc-batch" v-model="v.batchCost" name="batchIngredientCost" :label="t('tools.priceBatch')" description="Total ingredient cost of the recipe or batch, in US dollars." prefix="$" :step="0.01" />
        <div class="grid grid-cols-2 gap-4">
          <CalcInput id="pc-made" v-model="v.made" name="unitsMade" :label="t('tools.priceMade')" description="Units the recipe or batch produces." :step="1" :min="1" />
          <CalcInput id="pc-sold" v-model="v.sold" name="unitsSold" :label="t('tools.priceSold')" description="Units actually sold, after burnt, misshapen or leftover units." :step="1" :min="1" />
        </div>
        <CalcInput id="pc-target" v-model="v.target" name="targetCostPercent" :label="t('tools.priceTarget')" description="Target ingredient cost as a percentage of the selling price, for example 30." suffix="%" :step="1" :min="1" :max="99" :hint="t('tools.priceTargetHint')" />
        <CalcInput id="pc-current" v-model="v.current" name="currentPrice" :label="t('tools.priceCurrent')" description="Current selling price in US dollars, or 0 to skip." prefix="$" :step="0.01" />
      </div>

      <div class="flex flex-col gap-4" role="status" aria-live="polite" aria-atomic="true">
        <template v-if="valid">
          <div class="rounded-2xl bg-ember-50 p-5 ring-1 ring-ember-100">
            <p class="text-sm font-medium text-ember-800">{{ t('tools.priceSuggested', { pct: v.target }) }}</p>
            <p class="num-display mt-1 text-4xl font-bold leading-none text-ember-700">{{ usd(price) }}</p>
            <p class="mt-2 text-sm text-stone-600">{{ t('tools.priceUnitCost', { cost: usd(unitCost), ideal: usd(idealUnitCost) }) }}</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-5">
            <p class="text-sm font-medium text-stone-900">{{ t('tools.priceOptions') }}</p>
            <ul class="mt-2 grid grid-cols-3 gap-2 text-center">
              <li v-for="o in options" :key="o.p" class="rounded-xl bg-stone-50 p-2">
                <span class="block text-xs text-stone-500">{{ o.p }}%</span>
                <span class="num-display text-lg font-bold text-stone-900">{{ usd(o.price) }}</span>
              </li>
            </ul>
          </div>
          <div v-if="v.current > 0" class="rounded-2xl p-5 ring-1" :class="currentPct > v.target / 100 ? 'bg-coral-50 ring-coral-100' : 'bg-herb-50 ring-herb-100'">
            <p class="text-sm text-stone-700">
              {{ t('tools.priceCurrentResult', { pct: pct(currentPct), margin: usd(currentMargin) }) }}
            </p>
          </div>
        </template>
        <p v-else class="rounded-2xl bg-stone-50 p-5 text-sm text-stone-600">{{ t('tools.invalid') }}</p>
        <CalcCta />
      </div>
    </form>
  </div>
</template>
