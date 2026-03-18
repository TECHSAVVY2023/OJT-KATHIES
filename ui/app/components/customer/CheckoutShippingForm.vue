<template>
  <div class="space-y-8">
    <!-- Delivery Method -->
    <section class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Delivery Method</h2>
      <fieldset class="flex gap-6" role="radiogroup" aria-label="Delivery method">
        <legend class="sr-only">Choose your delivery method</legend>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            :checked="deliveryMethod === 'ship'"
            @change="updateDeliveryMethod('ship')"
            type="radio"
            name="delivery"
            value="ship"
            class="w-4 h-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
          >
          <span class="text-gray-900 font-medium">Ship</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            :checked="deliveryMethod === 'pickup'"
            @change="updateDeliveryMethod('pickup')"
            type="radio"
            name="delivery"
            value="pickup"
            class="w-4 h-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
          >
          <span class="text-gray-900 font-medium">Pick up</span>
        </label>
      </fieldset>
    </section>

    <!-- Shipping Address -->
    <section class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
      <form id="checkout-form" class="space-y-4" @submit.prevent="$emit('place-order')">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              id="firstName"
              :value="form.firstName"
              @input="updateForm({...form, firstName: ($event.target as HTMLInputElement).value})"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              placeholder="First Name"
              required
              aria-required="true"
            >
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              id="lastName"
              :value="form.lastName"
              @input="updateForm({...form, lastName: ($event.target as HTMLInputElement).value})"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              placeholder="Last Name"
              required
              aria-required="true"
            >
          </div>
        </div>
        
        <div>
          <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country / Region</label>
          <select
            id="country"
            v-model="form.country"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none bg-white"
            required
            aria-required="true"
          >
            <option value="">Select country</option>
            <option value="ZA">South Africa</option>
            <option value="PH">Philippines</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
        
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
            placeholder="Address"
            required
            aria-required="true"
          >
        </div>
        
        <div>
          <label for="apartment" class="block text-sm font-medium text-gray-700 mb-1">Apartment, Suite, etc.</label>
          <input
            id="apartment"
            v-model="form.apartment"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
            placeholder="Apartment, Suite, etc."
          >
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              placeholder="City"
              required
              aria-required="true"
            >
          </div>
          <div>
            <label for="province" class="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <select
              id="province"
              v-model="form.province"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none bg-white"
              required
              aria-required="true"
            >
              <option value="">Select province</option>
              <option value="Gauteng">Gauteng</option>
              <option value="Western Cape">Western Cape</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              <option value="Eastern Cape">Eastern Cape</option>
            </select>
          </div>
          <div>
            <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              id="postalCode"
              v-model="form.postalCode"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              placeholder="Postal Code"
              required
              aria-required="true"
            >
          </div>
        </div>
        
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
            placeholder="Phone"
            required
            aria-required="true"
          >
        </div>
        
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            :checked="saveInfo"
            @change="updateSaveInfo(($event.target as HTMLInputElement).checked)"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
          >
          <span class="text-sm text-gray-700">Save This Information For Next Time</span>
        </label>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Props {
  form: {
    firstName: string
    lastName: string
    country: string
    address: string
    apartment: string
    city: string
    province: string
    postalCode: string
    phone: string
  }
  deliveryMethod: 'ship' | 'pickup'
  saveInfo: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:deliveryMethod': [value: 'ship' | 'pickup']
  'update:saveInfo': [value: boolean]
  'update:form': [value: Props['form']]
  'place-order': []
}>()

function updateDeliveryMethod(value: 'ship' | 'pickup') {
  emit('update:deliveryMethod', value)
}

function updateSaveInfo(value: boolean) {
  emit('update:saveInfo', value)
}

function updateForm(value: Props['form']) {
  emit('update:form', value)
}
</script>
