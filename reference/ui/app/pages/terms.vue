<template>
  <div class="min-h-screen flex flex-col text-[#010024] bg-gradient-to-br from-[#FEF3E2] via-[#FFE9C7] to-[#E3D9CB]">
    <!-- Header -->
    <header
      class="sticky top-0 z-50 font-righteous py-3 px-6 flex justify-between items-center bg-white/90 backdrop-blur-sm shadow-md">
      <!-- Back Button -->
      <button @click="$router.back()"
        class="flex items-center gap-2 text-[#010024] font-semibold hover:text-[#FA812F] transition">
        ← Back
      </button>

      <!-- Logo -->
      <NuxtLink to="/">
        <div class="flex items-center gap-8">
          <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" class="w-12 drop-shadow-lg rounded-full" />
          <div>
            <p class="text-xl font-extrabold tracking-wide">
              Kathie’s
              <span class="text-[#DD0303] drop-shadow-sm">Kitchen</span>
            </p>
            <p class="font-kaushan text-xs text-gray-700">
              Bringing Home Closer, One Bite at a Time
            </p>
          </div>
        </div>
      </NuxtLink>

      <!-- Download PDF Button -->
      <a :href="`${BASE_ASSETS_URL}/files/Kathies_Kitchen_Terms_and_Conditions.pdf`" download
        class="bg-[#010024] text-[#FEF3E2] px-5 py-2 rounded-lg font-semibold hover:bg-[#272760] transition-all shadow-md">
        Download PDF
      </a>
    </header>

    <!-- Terms and Conditions Content -->
    <main class="flex-1 px-6 md:px-20 py-16">
      <div class="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-md p-10 leading-relaxed">
        <h1 class="text-4xl font-righteous mb-10 text-center">
          Terms and Conditions
        </h1>

        <div class="space-y-8 text-gray-800 text-justify font-inter">
          <section>
            <h2 class="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to Kathie’s Kitchen (“we”, “us”, “our”). These Terms and
              Conditions (“Terms”) govern your access to and use of our website,
              mobile applications, and services (collectively, the “Platform”).
              By using our Platform, you agree to be bound by these Terms. If
              you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">2. Definitions</h2>
            <ul class="list-disc pl-6">
              <li>
                “Customer”, “you”, “your” – refers to any person accessing or
                purchasing through our Platform.
              </li>
              <li>
                “Products” – means all food, beverages, and related goods sold
                by Kathie’s Kitchen.
              </li>
              <li>
                “Order” – refers to your purchase request submitted via our
                website or other sales channels.
              </li>
              <li>“POPIA” – Protection of Personal Information Act, 4 of 2013.</li>
              <li>“CPA” – Consumer Protection Act, 68 of 2008.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">3. Eligibility</h2>
            <ul class="list-disc pl-6">
              <li>You must be at least 18 years of age.</li>
              <li>You must reside in or be able to receive goods in South Africa.</li>
              <li>Use of the Platform must be lawful and personal.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">4. Products and Availability</h2>
            <p>
              We strive to ensure product information, pricing, and availability
              are accurate. However, all products are subject to availability
              and may be discontinued or updated without notice.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">5. Orders and Payment</h2>
            <ul class="list-disc pl-6">
              <li>Orders can be placed through our website or authorized resellers.</li>
              <li>Payments may be made via EFT, debit/credit card, or cash on delivery.</li>
              <li>Payment is securely processed through third-party gateways.</li>
              <li>
                We reserve the right to cancel orders due to stock issues or suspected fraud.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">6. Pricing and Taxes</h2>
            <p>
              Prices are quoted in South African Rand (ZAR) and include VAT unless stated otherwise. We reserve the
              right to correct pricing errors before order completion.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">7. Delivery and Collection</h2>
            <ul class="list-disc pl-6">
              <li>Delivery times are estimates only.</li>
              <li>Ownership passes upon delivery or collection.</li>
              <li>We are not liable for courier delays or incorrect addresses.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">8. Returns and Refunds</h2>
            <p>
              Under the Consumer Protection Act, perishable goods cannot be returned unless defective. Non-perishable
              goods may be returned within 7 days if unopened and unused.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">9. Promotions and Discounts</h2>
            <p>
              Promotions are subject to specific terms and limited availability.
              We may withdraw or change promotions at any time.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">10. Intellectual Property</h2>
            <p>
              All content, including text, logos, and designs, is owned by
              Kathie’s Kitchen. Unauthorised reproduction or modification is
              prohibited.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">11. User Conduct</h2>
            <ul class="list-disc pl-6">
              <li>No fraudulent, abusive, or unlawful activity.</li>
              <li>No uploading malicious code or interfering with operations.</li>
              <li>No defamatory, misleading, or infringing content.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">12. Data Protection and Privacy</h2>
            <p>
              Use of our Platform is governed by our
              <NuxtLink to="/privacy-policy" class="text-[#FA812F] underline">Privacy Policy</NuxtLink>, which complies
              with the Protection of Personal Information Act
              (POPIA).
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">13. Limitation of Liability</h2>
            <p>
              We are not liable for indirect or consequential damages arising
              from the use of our services. Our total liability will not exceed
              the value of your order.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">14. Indemnification</h2>
            <p>
              You agree to indemnify Kathie’s Kitchen from claims or damages
              resulting from your misuse or breach of these Terms.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">15. Force Majeure</h2>
            <p>
              We are not liable for delays or failures caused by events beyond
              our control, such as natural disasters or strikes.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">
              16. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by South African law. Disputes shall be
              resolved amicably or, if necessary, by the courts of Cape Town.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">17. Changes to These Terms</h2>
            <p>
              We may update these Terms periodically. The latest version will be
              available on our website, and continued use constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">18. Contact Information</h2>
            <p>Kathie’s Kitchen – Information Officer</p>
            <p>Email: info@kathieskitchen.com</p>
            <p>Phone: +27 71 575 1616</p>
            <p>Address: Parklands, Cape Town, South Africa</p>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#010024] text-[#FEF3E2] py-6 text-center shadow-inner">
      <p class="text-sm">© 2025 Kathie’s Kitchen. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { BASE_ASSETS_URL } from '@/utils/api'
</script>
