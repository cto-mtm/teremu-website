// Number formatting shared by the free calculators (prices are in US dollars).
export function useCalcFormat() {
  const { locale } = useI18n()
  const tag = computed(() => (locale.value === 'es' ? 'es-US' : 'en-US'))
  const money = computed(() => new Intl.NumberFormat(tag.value, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  const percent = computed(() => new Intl.NumberFormat(tag.value, { style: 'percent', maximumFractionDigits: 1 }))
  return {
    usd: (n: number) => money.value.format(Number.isFinite(n) ? n : 0),
    pct: (ratio: number) => percent.value.format(Number.isFinite(ratio) ? ratio : 0),
  }
}
