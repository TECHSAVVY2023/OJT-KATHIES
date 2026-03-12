<template>
  <div
    class="min-h-screen flex flex-col text-[#010024] bg-gradient-to-br from-[#FEF3E2] via-[#FFE9C7] to-[#E3D9CB]"
  >
    <!-- Header -->
    <header
      class="sticky top-0 z-50 font-righteous py-3 px-6 flex justify-between items-center bg-white/90 backdrop-blur-sm shadow-md"
    >
      <!-- Back Button -->
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-[#010024] font-semibold hover:text-[#FA812F] transition"
      >
        ← Back
      </button>

      <!-- Logo -->
      <NuxtLink to="/">
        <div class="flex items-center gap-8">
          <img
            :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`"
            class="w-12 drop-shadow-lg rounded-full"
          />
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
      <a
        :href="`${BASE_ASSETS_URL}/files/Kathies_Kitchen_Refund_and_Return_Policy.pdf`"
        download
        class="bg-[#010024] text-[#FEF3E2] px-5 py-2 rounded-lg font-semibold hover:bg-[#272760] transition-all shadow-md"
      >
        Download PDF
      </a>
    </header>

    <!-- Refund Policy Content -->
    <main class="flex-1 px-6 md:px-20 py-16">
      <div
        class="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-md p-10 leading-relaxed"
      >
        <h1 class="text-4xl font-righteous mb-10 text-center">
          Refund and Return Policy
        </h1>

        <div class="space-y-8 text-gray-800 text-justify font-inter">
          <section>
            <h2 class="text-2xl font-semibold mb-2">1. Overview</h2>
            <p>
              At Kathie’s Kitchen, we value your satisfaction. Our refund and return policy ensures fairness and transparency for all purchases made through our website, partner shops, or direct orders. Please review the following guidelines before making a purchase.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">2. Perishable Items</h2>
            <p>
              Due to the nature of our products — which include food items and perishables — we generally <b>do not accept returns or exchanges</b> once the product has been opened, consumed, or stored improperly.  
              However, if you receive a defective, expired, or wrong product, you are eligible for a replacement or refund under the conditions below.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">3. Return Eligibility</h2>
            <ul class="list-disc pl-6">
              <li>The product was received in a damaged or spoiled condition upon delivery.</li>
              <li>The wrong item was sent compared to your order confirmation.</li>
              <li>The product was not as described on the website.</li>
              <li>Return requests are made within <b>48 hours</b> from receipt of order.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">4. Non-Returnable Items</h2>
            <p>
              For hygiene and safety reasons, the following items are <b>not eligible for return</b>:
            </p>
            <ul class="list-disc pl-6">
              <li>Opened or partially consumed food products.</li>
              <li>Products damaged due to customer mishandling or improper storage.</li>
              <li>Items purchased during special promotions or marked as “Final Sale.”</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">5. Refund Process</h2>
            <p>
              Once your return request is approved, we will initiate a refund through your original payment method.  
              Refunds typically take <b>5–10 working days</b> to process, depending on your bank or payment provider.
            </p>
            <ul class="list-disc pl-6 mt-2">
              <li>Refunds will only cover the product cost; delivery fees are non-refundable.</li>
              <li>We may issue <b>shop credit or product replacement</b> for certain cases.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">6. Replacement Policy</h2>
            <p>
              If your order meets the replacement criteria, we will send a new product at no extra charge.  
              Please ensure that damaged or incorrect items are photographed and reported to our support team for verification.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">7. How to Request a Refund or Return</h2>
            <ol class="list-decimal pl-6 space-y-1">
              <li>E-mail us at <span class="font-semibold">support@kathieskitchen.com</span> with your order details and proof (photo/video).</li>
              <li>Include your full name, contact number, and order reference number.</li>
              <li>Our team will review your case within 24–48 hours and contact you with instructions.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">8. Cancellation Policy</h2>
            <p>
              Orders may be canceled <b>within 1 hour of placement</b>, provided they have not yet been processed or prepared for despatch. Once food preparation has begun, cancellations will no longer be accepted.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">9. Exceptions</h2>
            <p>
              In special cases — such as delivery service errors, food safety issues, or defective packaging — we reserve the right to approve exceptions even beyond the standard return window.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">10. Contact Us</h2>
            <p>
              For any refund, replacement, or policy-related concerns, contact us through:
            </p>
            <ul class="list-none mt-2">
              <li><strong>Email:</strong> support@kathieskitchen.com</li>
              <li><strong>Phone:</strong> +63 912 345 6789</li>
              <li><strong>Address:</strong> Ozamiz City, Misamis Occidental, Philippines</li>
            </ul>
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
