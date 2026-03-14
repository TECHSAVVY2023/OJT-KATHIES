import type { CatalogFiltersConfig } from '~/types/catalog'
import catalogJson from '~/data/catalog.json'

/** Birahon ang catalog page config gikan sa catalog.json (filters label, price ranges). */
export function useCatalogData() {
  const config = shallowRef<{ filters: CatalogFiltersConfig }>(catalogJson as { filters: CatalogFiltersConfig })

  return {
    filtersConfig: computed(() => config.value.filters),
    customFilterLabel: computed(() => config.value.filters?.customFilterLabel ?? 'Special'),
    priceRanges: computed(() => config.value.filters?.priceRanges ?? [
      { label: 'R50', max: 50 },
      { label: 'R60', max: 60 },
      { label: 'R80', max: 80 }
    ])
  }
}
