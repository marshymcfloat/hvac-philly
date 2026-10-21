<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useSmoothScroll } from "./composables/useSmoothScroll.js";
import SiteNavbar from "./components/SiteNavbar.vue";
import HeroSection from "./components/HeroSection.vue";
import MissionSection from "./components/MissionSection.vue";
import ServicesSection from "./components/ServicesSection.vue";
import ServiceAreaSection from "./components/ServiceAreaSection.vue";
import CustomerStories from "./components/CustomerStories.vue";
import BenefitsSection from "./components/BenefitsSection.vue";
import FaqSection from "./components/FaqSection.vue";
import ContactSection from "./components/ContactSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import QuoteDialog from "./components/QuoteDialog.vue";

const quoteDialog = ref(null);
const customerStories = ref(null);
useSmoothScroll();
const openQuote = (email = "", service = "") =>
  quoteDialog.value.open(email, service);
const quoteForService = (service = "") => openQuote("", service);
let observer;

onMounted(() => {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.06 },
  );
  document.querySelectorAll("section.page-section").forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteNavbar @quote="openQuote()" />
  <main id="main">
    <HeroSection @quote="openQuote" />
    <MissionSection />
    <BenefitsSection />
    <ServicesSection @quote="quoteForService" />
    <ServiceAreaSection />
    <FaqSection @quote="openQuote()" />
    <ContactSection />
  </main>
  <SiteFooter @quote="quoteForService" @reviews="customerStories.open()" />
  <CustomerStories ref="customerStories" />
  <QuoteDialog ref="quoteDialog" />
</template>
