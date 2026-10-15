<script setup lang="ts">
/**
 * Savings calculator — turns "live margins" into dollars and hours.
 *
 * Every assumption lives in the constants below and is disclosed in the
 * "How we calculate this" panel, so the numbers stay honest. Update them
 * here (and nowhere else) when we have real customer data.
 *
 * Inputs are per location; every output scales by the number of locations,
 * and Pro is billed per location, so ratios (return, payback) don't change.
 */
const { t, locale } = useI18n()

// --- Assumptions -----------------------------------------------------------
// Overcharges in invoice audits run ~1.5% of invoice value; we show a
// prudent band around it instead of a single optimistic number.
const RECOVERY_LOW = 0.01
const RECOVERY_HIGH = 0.02
// Minutes per invoice: typing it into a sheet vs. scan + one-tap approve.
const MANUAL_MIN_PER_INVOICE = 3
const SCAN_MIN_PER_INVOICE = 1
// Typical independent full-service restaurant.
const FOOD_COST_RATIO = 0.32
const NET_MARGIN = 0.04
const WEEKS_PER_MONTH = 4.33
// Pro list price per location (keep in step with pricing.proMonthly).
const PRO_PRICE = 39
const SOURCE_URL = 'https://www.foodservicedirector.com/colleges-universities/analysis-35-of-college-food-invoices-have-overcharges'

// --- Inputs ----------------------------------------------------------------
const spend = ref(20000) // monthly food purchases, per location
const invoicesPerWeek = ref(15) // per location
const locations = ref(1)

// --- Outputs ---------------------------------------------------------------
const totalSpend = computed(() => spend.value * locations.value)
const proCost = computed(() => PRO_PRICE * locations.value)

const moneyLow = computed(() => totalSpend.value * RECOVERY_LOW)
const moneyHigh = computed(() => totalSpend.value * RECOVERY_HIGH)
const moneyMid = computed(() => (moneyLow.value + moneyHigh.value) / 2)

const hoursSaved = computed(
  () =>
    (invoicesPerWeek.value * locations.value * WEEKS_PER_MONTH * (MANUAL_MIN_PER_INVOICE - SCAN_MIN_PER_INVOICE)) / 60,
)

// Estimated sales implied by the purchases (purchases ÷ food-cost ratio).
const monthlySales = computed(() => totalSpend.value / FOOD_COST_RATIO)
const monthlyProfit = computed(() => monthlySales.value * NET_MARGIN)
const profitUpliftPct = computed(() => Math.round((moneyMid.value / monthlyProfit.value) * 100))

// What one point of food cost is worth: 1% of sales. No savings claim attached.
const pointPerMonth = computed(() => monthlySales.value * 0.01)
const pointPerYear = computed(() => pointPerMonth.value * 12)

// Return on the Pro subscription, from the midpoint estimate.
const returnMultiple = computed(() => moneyMid.value / proCost.value)
const paybackDays = computed(() => Math.max(1, Math.round(proCost.value / (moneyMid.value / 30))))

// --- Formatting ------------------------------------------------------------
const numberLocale = computed(() => (locale.value === 'es' ? 'es-US' : 'en-US'))
const usd = computed(
  () => new Intl.NumberFormat(numberLocale.value, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
)
const oneDecimal = computed(() => new Intl.NumberFormat(numberLocale.value, { maximumFractionDigits: 1 }))
const pct = (n: number) => `${Math.round(n * 100)}`
const pctFlat = (n: number) => `${n * 100}`

const moneyRange = computed(() => `${usd.value.format(moneyLow.value)}–${usd.value.format(moneyHigh.value)}`)
const netRange = computed(
  () => `${usd.value.format(Math.max(0, moneyLow.value - proCost.value))}–${usd.value.format(Math.max(0, moneyHigh.value - proCost.value))}`,
)
</script>

<template>
  <div class="depth-card-lg rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
    <!--
      WebMCP Declarative API: exposes the estimator as a structured tool for
      browser-based AI agents. Results update reactively, so submit is a no-op.
    -->
    <form
      class="grid gap-8 lg:grid-cols-2 lg:gap-12"
      toolname="estimateTeremuSavings"
      tooldescription="Estimate how much money and time a restaurant could recover with Teremu. Provide monthly food purchases per location in US dollars, the number of supplier invoices received per week per location, and the number of locations."
      @submit.prevent
    >
      <!-- Controls -->
      <div class="space-y-8">
        <div>
          <div class="flex items-baseline justify-between gap-4">
            <label for="calc-spend" class="text-sm font-medium text-stone-900">{{ t('home.calcSpendLabel') }}</label>
            <output for="calc-spend" class="num-display text-2xl font-bold text-stone-900">{{ usd.format(spend) }}</output>
          </div>
          <input
            id="calc-spend"
            v-model.number="spend"
            type="range"
            name="monthlyFoodPurchasesPerLocation"
            toolparamdescription="Monthly food purchases per location in US dollars (5000 to 60000)."
            min="5000"
            max="60000"
            step="500"
            :aria-valuetext="usd.format(spend)"
            class="mt-3 w-full accent-primary-500"
          >
          <div class="mt-1 flex justify-between text-xs text-stone-500" aria-hidden="true">
            <span>{{ usd.format(5000) }}</span>
            <span>{{ usd.format(60000) }}</span>
          </div>
        </div>

        <div>
          <div class="flex items-baseline justify-between gap-4">
            <label for="calc-invoices" class="text-sm font-medium text-stone-900">{{ t('home.calcInvoicesLabel') }}</label>
            <output for="calc-invoices" class="num-display text-2xl font-bold text-stone-900">{{ invoicesPerWeek }}</output>
          </div>
          <input
            id="calc-invoices"
            v-model.number="invoicesPerWeek"
            type="range"
            name="invoicesPerWeekPerLocation"
            toolparamdescription="Number of supplier invoices received per week per location (2 to 40)."
            min="2"
            max="40"
            step="1"
            :aria-valuetext="String(invoicesPerWeek)"
            class="mt-3 w-full accent-primary-500"
          >
          <div class="mt-1 flex justify-between text-xs text-stone-500" aria-hidden="true">
            <span>2</span>
            <span>40</span>
          </div>
        </div>

        <div>
          <div class="flex items-baseline justify-between gap-4">
            <label for="calc-locations" class="text-sm font-medium text-stone-900">{{ t('home.calcLocationsLabel') }}</label>
            <output for="calc-locations" class="num-display text-2xl font-bold text-stone-900">{{ locations }}</output>
          </div>
          <input
            id="calc-locations"
            v-model.number="locations"
            type="range"
            name="locations"
            toolparamdescription="Number of restaurant locations (1 to 10)."
            min="1"
            max="10"
            step="1"
            :aria-valuetext="String(locations)"
            class="mt-3 w-full accent-primary-500"
          >
          <div class="mt-1 flex justify-between text-xs text-stone-500" aria-hidden="true">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <details class="rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
          <summary class="cursor-pointer font-medium text-stone-800">{{ t('home.calcHowSummary') }}</summary>
          <ul class="mt-3 list-disc space-y-2 pl-5">
            <li>
              {{ t('home.calcHow1', { low: pctFlat(RECOVERY_LOW), high: pctFlat(RECOVERY_HIGH) }) }}
              <a :href="SOURCE_URL" target="_blank" rel="noopener noreferrer" class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800">{{ t('home.calcHowSource') }}</a>
            </li>
            <li>{{ t('home.calcHow2', { manual: MANUAL_MIN_PER_INVOICE, scan: SCAN_MIN_PER_INVOICE }) }}</li>
            <li>{{ t('home.calcHow3', { cost: pct(FOOD_COST_RATIO), margin: pct(NET_MARGIN) }) }}</li>
            <li>{{ t('home.calcHow5', { cost: pct(FOOD_COST_RATIO) }) }}</li>
            <li>{{ t('home.calcHow4') }}</li>
          </ul>
        </details>
      </div>

      <!-- Results -->
      <div class="flex flex-col gap-4" role="status" aria-live="polite" aria-atomic="true">
        <div class="rounded-2xl bg-herb-50 p-5 ring-1 ring-herb-100">
          <p class="text-sm font-medium text-herb-800">{{ t('home.calcMoneyLabel') }}</p>
          <p class="num-display mt-1 text-4xl font-bold leading-none text-herb-700 sm:text-5xl">{{ moneyRange }}</p>
          <p class="mt-2 text-sm text-stone-600">
            {{ t('home.calcMoneyNote', { low: pctFlat(RECOVERY_LOW), high: pctFlat(RECOVERY_HIGH) }) }}
          </p>
        </div>

        <div class="rounded-2xl bg-ember-50 p-5 ring-1 ring-ember-100">
          <p class="text-sm font-medium text-ember-800">{{ t('home.calcTimeLabel') }}</p>
          <p class="num-display mt-1 text-4xl font-bold leading-none text-ember-700 sm:text-5xl">
            {{ oneDecimal.format(hoursSaved) }} {{ t('home.calcHoursUnit') }}
          </p>
          <p class="mt-2 text-sm text-stone-600">{{ t('home.calcTimeNote') }}</p>
        </div>

        <!-- One point of food cost: framing only, no savings claim attached. -->
        <div class="rounded-2xl border border-stone-200 p-5">
          <p class="text-sm font-medium text-stone-900">{{ t('home.calcPointLabel') }}</p>
          <p class="num-display mt-1 text-3xl font-bold leading-none text-stone-900">
            {{ usd.format(pointPerMonth) }}<span class="text-base font-medium text-stone-500"> {{ t('home.calcPerMonth') }}</span>
          </p>
          <p class="mt-2 text-sm text-stone-600">
            {{ t('home.calcPointNote', { year: usd.format(pointPerYear) }) }}
          </p>
        </div>

        <div class="rounded-2xl border border-stone-200 p-5 text-sm text-stone-600">
          <p>
            <span class="font-medium text-stone-900">{{ t('home.calcProfitLabel') }}: </span>
            {{ t('home.calcProfitNote', { pct: profitUpliftPct, cost: pct(FOOD_COST_RATIO), margin: pct(NET_MARGIN) }) }}
          </p>
          <p class="mt-3">
            <span class="font-medium text-stone-900">{{ t('home.calcNetLabel', { price: usd.format(proCost) }) }}: </span>
            <span class="num-display text-lg font-bold text-stone-900">{{ netRange }}</span>
          </p>
          <p class="mt-3">
            <span class="font-medium text-stone-900">{{ t('home.calcReturnLabel') }}: </span>
            {{ t('home.calcReturnNote', { multiple: oneDecimal.format(returnMultiple), days: paybackDays }) }}
          </p>
        </div>
      </div>
    </form>

    <p class="mt-6 text-xs text-stone-500">{{ t('home.calcDisclaimer') }}</p>
  </div>
</template>
