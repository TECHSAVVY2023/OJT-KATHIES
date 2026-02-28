/** Header */
export interface NavLink {
  label: string
  path: string
}

export interface UtilityLink {
  type: 'icon' | 'button'
  icon?: string
  label?: string
  path: string
}

export interface HeaderData {
  logo: {
    text: string
    iconPath: string
  }
  navLinks: NavLink[]
  utilityLinks: UtilityLink[]
  /** Optional: custom cart icon image (e.g. white cart on dark). Else uses inline SVG. */
  cartIconPath?: string
}

/** Hero */
export interface HeroCarouselProduct {
  id: string
  name: string
  image?: string
  images?: string[]
  price: string
  buttonLabel: string
  buttonPath: string
  backgroundColorClass: string
}

export interface HeroSectionData {
  headline: string
  tagline: string
  ctaButton: {
    label: string
    path: string
  }
  carouselProducts: HeroCarouselProduct[]
}

/** Why Choose Us */
export interface WhyChooseUsFeature {
  id: string
  icon: string
  name: string
  description: string
}

export interface WhyChooseUsData {
  title: string
  centerImage: string
  features: WhyChooseUsFeature[]
}

/** Top Categories */
export interface CategoryItem {
  id: string
  name: string
  image: string
  path: string
}

export interface TopCategoriesData {
  title: string
  viewAllPath: string
  viewAllLabel?: string
  categories: CategoryItem[]
}

/** New Arrivals */
export interface NewArrivalProduct {
  id: string
  name: string
  image: string
  price: string
  inStock: boolean
  isNew: boolean
  category?: string
  brand?: string
}

export interface NewArrivalsData {
  title: string
  searchPlaceholder?: string
  products: NewArrivalProduct[]
}

/** Upcoming Stocks */
export interface UpcomingStockProduct {
  id: string
  name: string
  image: string
  description: string
  buttonLabel: string
  buttonPath: string
}

export interface UpcomingStocksData {
  title: string
  products: UpcomingStockProduct[]
}

/** FAQ */
export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqInfoItem {
  id: string
  iconType: 'website' | 'email' | 'phone' | 'facebook'
  label: string
  value: string
}

export interface FaqSectionData {
  title: string
  subtitle: string
  infoBackgroundImage?: string
  infoTitle: string
  infoSubtitle: string
  infoItems: FaqInfoItem[]
  faqs: FaqItem[]
}

/** Contact / Get in touch */
export interface ContactField {
  id: string
  name: string
  label: string
  type: 'text' | 'tel' | 'email' | 'textarea'
  placeholder?: string
}

export interface ContactSectionData {
  title: string
  highlight: string
  subtitle: string
  submitLabel: string
  /** Static map image fallback when no embed URL */
  mapImage: string
  /** Google Maps embed URL (iframe src) – when set, shown instead of mapImage */
  mapEmbedUrl?: string
  fields: ContactField[]
}

/** Footer */
export interface FooterLink {
  label: string
  path: string
}

export interface FooterSocialLink {
  id: string
  name: string
  url: string
  icon: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'wordpress'
}

export interface FooterData {
  logo: {
    imagePath: string
    text: string
    tagline: string
  }
  shopLinks: FooterLink[]
  aboutLinks: FooterLink[]
  phone: string
  whatsapp: string
  socialLinks: FooterSocialLink[]
  copyright: string
}

/** About section */
export interface AboutSectionData {
  images: string[]
}

/** Full landing data (birahon) */
export interface LandingData {
  header: HeaderData
  heroSection: HeroSectionData
  aboutSection?: AboutSectionData
  whyChooseUs: WhyChooseUsData
  topCategories: TopCategoriesData
  newArrivals: NewArrivalsData
  upcomingStocks: UpcomingStocksData
  faqSection: FaqSectionData
  contactSection: ContactSectionData
  footer: FooterData
}
