<template>
    <footer class="bg-[#010024] text-[#FEF3E2]">
        <!-- Main Footer -->
        <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

            <!-- Left Half -->
            <div class="space-y-4">
                <div class="flex items-center gap-4">
                    <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="Kathie’s Kitchen Logo" class="w-14 h-14 rounded-full" />
                    <p class="font-kaushan text-lg">Bringing Home Closer, One Bite at a Time</p>
                </div>


                <!-- Social Icons -->
                <div class="flex gap-2 mt-2">
                    <NuxtLink to="https://instagram.com/kathieskitchen10" target="_blank"
                        class="flex items-center justify-center w-10 h-10">
                        <Instagram class="w-10 h-10 text-[#FEF3E2] hover:opacity-80" />
                    </NuxtLink>
                    <NuxtLink to="https://facebook.com/kathieskitchen10" target="_blank"
                        class="flex items-center justify-center w-10 h-10">
                        <Facebook class="w-8 h-8 text-[#FEF3E2] hover:opacity-80" />
                    </NuxtLink>
                </div>


                <p class="text-sm">Parklands, Cape Town, South Africa</p>
                <p class="text-sm">
                    WhatsApp:
                    <a href="https://wa.me/27715751616" target="_blank" class="underline">+27 71 575 1616</a>
                </p>

                <p class="text-sm">
                    Email:
                    <a href="mailto:info@kathieskitchen.com" class="underline">info@kathieskitchen.com</a>
                </p>


            </div>


            <!-- Right Half -->
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
                <!-- Column 1 -->
                <div>
                    <h3 class="font-righteous text-lg mb-4">Shop</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/catalog" class="hover:underline hover:underline-offset-4">Products
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/bestsellers" class="hover:underline hover:underline-offset-4">Bestsellers
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/new-arrivals" class="hover:underline hover:underline-offset-4">New Arrivals
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Column 2 -->
                <div>
                    <h3 class="font-righteous text-lg mb-4">About</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/our-story" class="hover:underline hover:underline-offset-4">Our Story
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/faq" class="hover:underline hover:underline-offset-4">FAQ</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact" class="hover:underline hover:underline-offset-4">Contact Us
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/wholesale" class="hover:underline hover:underline-offset-4">
                                Wholesale/Partnership</NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Column 3 -->
                <div>
                    <h3 class="font-righteous text-lg mb-4">Legal</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/privacy-policy" class="hover:underline hover:underline-offset-4">Privacy
                                Policy</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/terms" class="hover:underline hover:underline-offset-4">Terms & Conditions
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/refund" class="hover:underline hover:underline-offset-4">Refund/Return Policy
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-[#FEF3E2]/30">
            <div
                class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>© 2025 Kathie’s Kitchen. All rights reserved.</p>

                <!-- EFT Icons -->
                <div class="flex items-center gap-4">
                    <!-- <img src="/images/icons/eft/visa.svg" alt="Visa" class="h-6" />
                    <img src="/images/icons/eft/mastercard.svg" alt="MasterCard" class="h-6" />
                    <img src="/images/icons/eft/amex.svg" alt="Amex" class="h-6" />
                    <img src="/images/icons/eft/paypal.svg" alt="PayPal" class="h-6" />
                    <img src="/images/icons/eft/snapscan.svg" alt="SnapScan" class="h-6" />
                    <img src="/images/icons/eft/ozow.svg" alt="Ozow" class="h-6" /> -->
                    <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="Visa" class="h-6" />
                    <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="MasterCard" class="h-6" />
                    <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="Amex" class="h-6" />
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import Facebook from "@/components/icons/Facebook.vue";
import Instagram from "@/components/icons/Instagram.vue";

import { BASE_ASSETS_URL } from '@/utils/api'
</script>