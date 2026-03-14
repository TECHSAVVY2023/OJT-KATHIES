import type { LandingData } from '~/types/landing'
import landingJson from '~/data/landing.json'


export function useLandingData() {
  const landing = shallowRef<LandingData>(landingJson as LandingData)

  return {
    landing: readonly(landing),
    header: computed(() => landing.value.header),
    heroSection: computed(() => landing.value.heroSection),
    aboutSection: computed(() => landing.value.aboutSection),
    whyChooseUs: computed(() => landing.value.whyChooseUs),
    topCategories: computed(() => landing.value.topCategories),
    newArrivals: computed(() => landing.value.newArrivals),
    upcomingStocks: computed(() => landing.value.upcomingStocks),
    faqSection: computed(() => landing.value.faqSection),
    contactSection: computed(() => landing.value.contactSection),
    footer: computed(() => landing.value.footer)
  }
}
