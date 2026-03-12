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
              Kathie’s <span class="text-[#DD0303] drop-shadow-sm">Kitchen</span>
            </p>
            <p class="font-kaushan text-xs text-gray-700">Bringing Home Closer, One Bite at a Time</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Download PDF Button -->
      <a :href="`${BASE_ASSETS_URL}/files/Kathies_Kitchen_Privacy_Policy.pdf`" download
        class="bg-[#010024] text-[#FEF3E2] px-5 py-2 rounded-lg font-semibold hover:bg-[#272760] transition-all shadow-md">
        Download PDF
      </a>
    </header>

    <!-- Privacy Policy Content -->
    <main class="flex-1 px-6 md:px-20 py-16">
      <div class="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-md p-10 leading-relaxed">
        <h1 class="text-4xl font-righteous mb-10 text-center">Privacy Policy</h1>

        <div class="space-y-8 text-gray-800 text-justify font-inter">

          <section>
            <h2 class="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Kathie’s Kitchen (“we”, “us”, “our”) is committed to protecting and respecting your privacy.
              This Privacy Policy sets out how we collect, use, disclose, store, and protect your personal
              information when you interact with our website, mobile applications, services, or otherwise
              provide us your personal information. We comply with South Africa’s Protection of Personal
              Information Act, 4 of 2013 (“POPIA”).
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">2. Scope</h2>
            <p>This policy applies to all personal information processed by or on behalf of Kathie’s Kitchen in relation
              to:</p>
            <ul class="list-disc pl-6">
              <li>visitors to our website</li>
              <li>customers who register, place orders, subscribe to newsletters</li>
              <li>other third parties whose information we may collect</li>
            </ul>
            <p>It covers both automated and non-automated processing where personal information is recorded in a record.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">3. Definitions</h2>
            <p><strong>Personal Information</strong> means any information relating to an identifiable, living, natural
              person (or where applicable, a juristic person) including but not limited to name, email, phone number,
              address, payment details.</p>
            <p><strong>Processing</strong> means collecting, recording, organising, structuring, storing, adapting,
              altering, retrieving, consulting, using, disclosing by transmission, distributing, or otherwise making
              available, aligning, merging, restricting, erasing or destroying of personal information.</p>
            <p><strong>Responsible Party</strong> means Kathie’s Kitchen, which determines the purpose and means of
              processing personal information.</p>
            <p><strong>Operator</strong> means any third party who processes personal information on behalf of the
              Responsible Party, under contract and in compliance with this Privacy Policy and POPIA.</p>
            <p><strong>Data Subject</strong> means you — the person whose personal information is being processed.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">4. Information Officer</h2>
            <p>In terms of POPIA, you may contact the owner directly at:
            </p>
            <p>Name: Katherine De Leon-Small</p>
            <p>Email: info@kathieskitchen.com</p>
            <p>Postal Address: Parklands, Cape Town, South Africa</p>
            <p>Phone: +27715751616</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">5. What information we collect</h2>
            <p>We collect and process the following types of personal information:</p>
            <table class="w-full border border-gray-300 mt-4 text-sm">
              <thead class="bg-[#FA812F]/20">
                <tr>
                  <th class="border px-4 py-2 text-left">Category</th>
                  <th class="border px-4 py-2 text-left">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">Identity and contact information</td>
                  <td class="border px-4 py-2">Full name, email address, phone number, delivery address</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">Account & transaction data</td>
                  <td class="border px-4 py-2">User login credentials, order history, payment method details (note: we
                    do not store full payment card numbers)</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">Newsletters & marketing preferences</td>
                  <td class="border px-4 py-2">Email addresses, marketing opt-in preferences</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">Technical & usage data</td>
                  <td class="border px-4 py-2">IP address, device type, browser, website interactions</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">Cookies and similar technologies</td>
                  <td class="border px-4 py-2">Session cookies, preference cookies, analytics cookies</td>
                </tr>
                <tr>
                  <td class="border px-4 py-2">Optional/sensitive</td>
                  <td class="border px-4 py-2">Dietary preferences, uploaded photos or messages</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">6. How we collect information</h2>
            <ul class="list-disc pl-6">
              <li>Directly from you via forms (registration, checkout, newsletter signup, contact)</li>
              <li>Automatically via website/app interactions, cookies, analytics tools</li>
              <li>From third parties such as payment processors, delivery partners, or service providers (only to the
                extent needed for fulfilling service)</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">7. Legal basis for processing</h2>
            <p>Under POPIA, we rely on one or more of the following lawful bases for processing personal information:
            </p>
            <ul class="list-disc pl-6">
              <li>Your consent (for example for newsletters or marketing)</li>
              <li>Performance of contract (e.g. to fulfil orders, deliver products)</li>
              <li>Compliance with a legal obligation</li>
              <li>Legitimate interests (e.g. to maintain security, improve our services), provided these are balanced
                against your privacy rights</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">8. Purposes of processing</h2>
            <ul class="list-disc pl-6">
              <li>Processing and fulfilling your orders (including delivery, refunds, etc.)</li>
              <li>Managing your account and customer service</li>
              <li>Sending newsletters, promotions, updates (only if you opt in)</li>
              <li>Improving our website or app UX, security, and services</li>
              <li>Complying with legal or financial obligations and dispute resolution</li>
              <li>Preventing fraud, abuse or unauthorised access</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">9. Data sharing & third parties</h2>
            <p>We may share or disclose your personal information:</p>
            <ul class="list-disc pl-6">
              <li>With service providers (payment processors, couriers, hosting providers, email services)</li>
              <li>With legal or regulatory authorities where required by law</li>
              <li>With marketing/advertising partners only with your consent</li>
              <li>With third parties in event of a business transfer or sale (with appropriate protections)</li>
            </ul>
            <p>We do not sell your personal information to unrelated third parties.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">10. Data retention</h2>
            <p>We retain personal information only as long as necessary for the purposes for which it was collected, or
              to comply with legal requirements.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">11. Security measures</h2>
            <ul class="list-disc pl-6">
              <li>Encrypting data in transit (e.g., HTTPS)</li>
              <li>Secure storage, access controls</li>
              <li>Regular audits of security practices</li>
              <li>Staff training and policies</li>
              <li>Trusted third-party processors compliant with POPIA</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">12. Rights of data subjects</h2>
            <ul class="list-disc pl-6">
              <li>Right to be informed</li>
              <li>Right of access</li>
              <li>Right to correct or delete inaccurate data</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
              <li>Right to lodge a complaint with the Information Regulator</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">13. Cookies & similar technologies</h2>
            <p>We use cookies, tracking and analytics tools. You may adjust your browser to disable non-essential
              cookies.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">14. International transfers</h2>
            <p>If any personal information is transferred outside South Africa, we ensure compliance with POPIA for data
              protection.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">15. Children</h2>
            <p>We do not knowingly collect personal information from children under 18 without parental consent. If we
              have done so, please contact our Information Officer.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">16. Changes to this policy</h2>
            <p>We may update this Privacy Policy periodically. Updated versions will be posted on this site with the
              “Last updated” date.</p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold mb-2">17. Contact information</h2>
            <p>Name: Katherine De Leon-Small</p>
            <p>Email: info@kathieskitchen.com</p>
            <p>Postal Address: Parklands, Cape Town, South Africa</p>
            <p>Phone: +27715751616</p>
            <p>Information Regulator of South Africa: <a href="https://inforegulator.org.za/"
                class="text-[#FA812F] underline">https://inforegulator.org.za/</a></p>
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
