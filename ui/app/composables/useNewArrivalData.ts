import type { NewArrivalItem } from '~/types/catalog'
import newarrivalJson from '~/data/newarrival.json'

/** Birahon ang data gikan sa newarrival.json – whatever you put in that JSON gets to the frontend */
export function useNewArrivalData() {
  const newArrivals = shallowRef<NewArrivalItem[]>(newarrivalJson as NewArrivalItem[])

  return {
    newArrivals: readonly(newArrivals)
  }
}
