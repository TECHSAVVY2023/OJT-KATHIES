<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/contact" />

    <div class="pt-16">
      <section class="py-14 md:py-20">
        <div class="container mx-auto px-6 max-w-6xl">

          <!-- Header -->
          <ContactHeader :contact-section="contactSection" />

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            <!-- Left: Contact Info + Form -->
            <div class="space-y-6">
              <ContactForm :contact-section="contactSection" @submit="onSubmit" />
            </div>

            <!-- Right: Map -->
            <ContactMap :contact-section="contactSection" />

          </div>
        </div>
      </section>
    </div>

    <!-- Success Modal -->
    <ContactSuccessModal :show="contactSuccess" @close="contactSuccess = false" />
  </div>
</template>

<script setup lang="ts">
const { contactSection } = useLandingData()

const contactSuccess = ref(false)

function onSubmit() {
  contactSuccess.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root, .page-root * {
  font-family: 'Poppins', sans-serif;
}
</style>