<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { gsap } from "gsap";
import MobileNavigation from "./MobileNavigation.vue";
import LegacyLogo from "./LegacyLogo.vue";
const emit = defineEmits(["quote"]);
async function requestMobileQuote() {
  menuOpen.value = false;
  await nextTick();
  emit("quote");
}
const menuOpen = ref(false);
const header = ref(null);
let media;
onMounted(() => {
  media = gsap.matchMedia();
  media.add({ compact: "(max-width: 1150px)", mobile: "(max-width: 540px)", desktop: "(min-width: 541px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
    let solid;
    const update = (immediate = false) => {
      const next = window.scrollY > 24 || menuOpen.value;
      if (solid === next && !immediate) return;
      solid = next;
      const palette = getComputedStyle(document.documentElement);
      const primary = palette.getPropertyValue("--brand-primary").trim();
      const pale = palette.getPropertyValue("--surface-muted").trim();
      gsap.to(header.value, {
        "--surface-opacity": next ? 1 : 0,
        "--nav-offset": next ? "0px" : (context.conditions.compact ? "16px" : "24px"),
        "--nav-ink": next ? primary : "#ffffff",
        "--brand-ink": next ? primary : "#ffffff",
        "--nav-muted": next ? primary : pale,
        "--logo-primary": next ? primary : "#ffffff",
        "--logo-secondary": next ? primary : pale,
        "--logo-scale": next ? 1 : (context.conditions.mobile ? 1 : 1.1),
        duration: immediate || context.conditions.reduced ? 0 : 0.45,
        ease: "power2.out",
        overwrite: true,
      });
    };
    // Register event-created tweens with this context for teardown.
    context.add("updateHeader", () => update());
    const onScroll = () => context.updateHeader();
    const stopWatching = watch(menuOpen, onScroll);
    update(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      stopWatching();
    };
  }, header.value);
});
onUnmounted(() => media?.revert());
const links = [
  { text: "About", href: "#about" },
  { text: "Services", href: "#services" },
  { text: "Service Areas", href: "#service-areas" },
  { text: "FAQ", href: "#faq" },
  { text: "Contact", href: "#contact" },
];
function closeMenus() {
  menuOpen.value = false;
}
</script>

<template>
  <header ref="header" class="site-header">
    <nav class="navbar" aria-label="Main navigation" @keydown.esc="closeMenus">
      <a
        class="brand"
        href="#home"
        aria-label="Superior Comfort Heating and Cooling home"
        @click="closeMenus"
      >
        <LegacyLogo />
      </a>
      <div
        class="nav-links"
        
        id="navigation-links"
      >
        <a
          v-for="link in links"
          :key="link.text"
          class="nav-link"
          :href="link.href"
          @click="closeMenus"
          >{{ link.text }}</a
        >
      </div>
      <button
        class="button button-blue nav-quote"
        @click="
          closeMenus();
          $emit('quote');
        "
      >
        Free Estimate
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
      </button>
      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path v-if="menuOpen" d="m6 6 12 12M6 18 18 6" />
          <path v-else d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </nav>
  </header>
  <MobileNavigation v-if="menuOpen" :links="links" @close="closeMenus" @quote="requestMobileQuote" />
</template>

<style scoped>
.site-header { --surface-opacity: 0; --nav-offset: 24px; --nav-base-height: 86px; --nav-ink: #fff; --brand-ink: #fff; --nav-muted: var(--surface-muted); --logo-primary: #fff; --logo-secondary: var(--surface-muted); --logo-scale: 1.1; height: 110px; padding: 0; pointer-events: none; background: transparent; border: 0; box-shadow: none; isolation: isolate; }
.site-header::before { content: ''; position: absolute; inset: 0 0 auto; height: calc(var(--nav-base-height) + var(--nav-offset)); z-index: -1; pointer-events: none; background: #fff; border-bottom: 1px solid var(--surface-muted); box-shadow: 0 4px 24px color-mix(in srgb, var(--brand-primary) 7.1%, transparent); opacity: var(--surface-opacity); }
.navbar { transform: translateY(var(--nav-offset)); pointer-events: auto; width: min(var(--content-max-width), calc(100% - 64px)); max-width: none; min-height: 85px; padding: 0; gap: 36px; background: transparent; border-radius: 0; box-shadow: none; }
.brand { gap: 11px; min-height: 44px; color: var(--brand-ink); transform: scale(var(--logo-scale)); transform-origin: left center; }
.brand-mark { width: 44px; height: 44px; }
.nav-brand-text { display: flex; flex-direction: column; gap: 4px; font-size: 25px; line-height: 1; }
.nav-brand-text small { font-size: 14px; font-weight: 500; letter-spacing: 1.6px; color: var(--nav-muted); }
.nav-links { gap: 32px; }
.nav-link { position: relative; display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 85px; padding: 0; color: var(--nav-ink); font-size: 15px; transition: none; }
.nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--brand-primary); transform: scaleX(0); transition: transform .2s; }
.nav-link:hover, .nav-link:focus-visible { color: var(--nav-ink); background: transparent; }
.nav-link:hover::after, .nav-link:focus-visible::after { transform: scaleX(1); }
.nav-quote { border-radius: var(--radius-control); gap: 20px; min-height: 46px; padding-inline: 20px; font-size: 14px; }
.nav-quote svg { width: 19px; height: 19px; }
.menu-toggle { width: 44px; height: 44px; color: var(--nav-ink); border: 1px solid currentColor; border-radius: var(--radius-control); }
@media (max-width: 1150px) {
  .site-header { --nav-offset: 16px; --nav-base-height: 76px; height: 92px; padding: 0; }
  .navbar { min-height: 75px; gap: 14px; }
  .brand { margin-right: auto; }
  .nav-links { top: 100%; left: 0; right: 0; margin: 0; padding: 16px max(32px, calc((100% - var(--content-max-width)) / 2)); border: 0; border-bottom: 1px solid var(--surface-muted); border-radius: 0; box-shadow: 0 14px 24px color-mix(in srgb, var(--brand-primary) 7.1%, transparent); background: #fff; }
  .nav-links.is-open { gap: 0; }
  .nav-link { color: var(--brand-primary); min-height: 48px; padding: 12px 0; border-radius: 0; }
  .nav-link::after { display: none; }
  .nav-link:hover, .nav-link:focus-visible { color: var(--brand-primary); }
  .nav-quote { min-height: 44px; padding: 10px 16px; font-size: 14px; }
}
@media (max-width: 540px) {
  .site-header { --logo-scale: 1; }
  .navbar { width: calc(100% - 40px); gap: 16px; }
  .brand-mark { width: 35px; height: 35px; }
  .brand { gap: 8px; --legacy-logo-width: clamp(180px, 56vw, 220px); }
  .nav-brand-text { font-size: 22px; }
  .nav-brand-text small { font-size: 14px; letter-spacing: 1px; }
  .nav-quote { padding-inline: 12px; }
  .nav-quote svg { display: none; }
  .nav-links { padding-inline: 20px; }
}
@media (max-width: 1150px) {
  .nav-links { display: none; }
  .menu-toggle { display: grid; place-items: center; padding: 10px; background: transparent; }
  .nav-brand-text small { display: none; }
}
@media (max-width: 540px) {
  .nav-quote { display: none; }
  .navbar { gap: 24px; }
}
@media (max-width: 380px) {
  .brand { transform: none; }
  .nav-brand-text { font-size: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .nav-link::after { transition: none; }
}
</style>
