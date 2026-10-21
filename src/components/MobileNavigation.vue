<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import SiteIcon from "./SiteIcon.vue";
import LegacyLogo from "./LegacyLogo.vue";
import { business } from "../siteContent.js";
import { gsap } from "gsap";
import { useLockScroll } from "../composables/useLockScroll.ts";
import { getLenis } from "../composables/useSmoothScroll.js";
defineProps({ links: { type: Array, required: true } });
const emit = defineEmits(["close", "quote"]);
const sheet = ref(null);
const closeButton = ref(null);
const { lock, unlock } = useLockScroll();
let previousFocus;
let app;
let previousInert;
let desktop;
let animation;
let closing = false;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function resize() { if (desktop.matches) closeSheet(); }
function closeSheet(action = "") {
  if (closing) return;
  closing = true;
  animation?.kill();
  animation = gsap.to(sheet.value, {
    yPercent: -6,
    opacity: 0,
    duration: reducedMotion() ? 0 : 0.28,
    ease: "power2.in",
    onComplete: () => finishClose(action),
  });
}
async function finishClose(action) {
  if (action === "quote") { emit("quote"); return; }
  emit("close");
  await nextTick();
  if (action) scrollToSection(action);
}
function navigate(href) { closeSheet(href); }
function scrollToSection(href) {
  const target = document.querySelector(href);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (getLenis()) getLenis().scrollTo(target, { offset: -90, immediate: reduced });
  else target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
}
function handleKey(event) {
  if (event.key === "Escape") { event.preventDefault(); closeSheet(); }
  if (event.key !== "Tab") return;
  const controls = [...sheet.value.querySelectorAll("a[href], button")];
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
onMounted(() => {
  previousFocus = document.activeElement;
  app = document.getElementById("app");
  previousInert = app?.inert;
  lock();
  closeButton.value.focus();
  if (app) app.inert = true;
  desktop = window.matchMedia("(min-width: 1151px)");
  desktop.addEventListener("change", resize);
  if (!reducedMotion()) {
    const items = sheet.value.querySelectorAll(".sheet-navlinks > a, .sheet-quote");
    animation = gsap.timeline()
      .fromTo(sheet.value, { yPercent: -8, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.42, ease: "power3.out" })
      .fromTo(items, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, stagger: 0.035, ease: "power2.out", clearProps: "transform,opacity" }, 0.12);
  }
});
onUnmounted(() => {
  animation?.kill();
  desktop?.removeEventListener("change", resize);
  if (app) app.inert = previousInert;
  unlock();
  previousFocus?.focus({ preventScroll: true });
});
function requestQuote() { closeSheet("quote"); }
</script>

<template>
  <Teleport to="body">
    <div id="mobile-navigation" ref="sheet" class="mobile-sheet" role="dialog" aria-modal="true" aria-label="Main navigation" data-lenis-prevent @keydown="handleKey">
      <header class="sheet-header">
        <a href="#home" class="sheet-brand" aria-label="Superior Comfort Heating and Cooling home" @click.prevent="navigate('#home')"><LegacyLogo /></a>
        <button ref="closeButton" type="button" aria-label="Close navigation" @click="closeSheet()"><SiteIcon name="close" /></button>
      </header>
      <nav class="sheet-navlinks" aria-label="Mobile navigation" data-lenis-prevent>
        <a v-for="(link, index) in links" :key="link.href" :href="link.href" @click.prevent="navigate(link.href)"><span class="sheet-number">0{{ index + 1 }}</span><span>{{ link.text }}</span><SiteIcon /></a>
        <button type="button" class="button button-blue sheet-quote" @click="requestQuote">Request a Free Estimate<SiteIcon /></button>
      </nav>
      <footer class="sheet-footer">
        <a :href="business.phoneHref"><SiteIcon name="phone" />{{ business.phone }}<span>24/7 emergency service</span></a>
        <a :href="business.emailHref">{{ business.email }}</a>
      </footer>
    </div>
  </Teleport>
</template>

<style scoped>
.mobile-sheet { position: fixed; inset: 0; z-index: 2147483647; height: 100dvh; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; overflow: hidden; background: #f3faff; color: #183e55; }
.sheet-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: max(20px, env(safe-area-inset-top)) 20px 20px; border-bottom: 1px solid #cfe4ef; }
.sheet-brand { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; font-size: clamp(18px, 5vw, 26px); font-weight: 600; }
.sheet-header button { width: 48px; height: 48px; display: grid; place-items: center; background: #e2f1fa; color: #1a739d; border: 1px solid #c2e1f0; border-radius: var(--radius-control); }
.sheet-header svg { width: 25px; height: 25px; }
.sheet-navlinks { overflow-y: auto; overscroll-behavior: contain; padding: 18px 20px 32px; }
.sheet-navlinks > a { display: flex; align-items: center; gap: 18px; min-height: 76px; padding: 20px 0; border-bottom: 1px solid #cfe4ef; font-size: clamp(25px, 6vw, 36px); font-weight: 500; letter-spacing: -.7px; }
.sheet-number { font-size: 14px; color: #4f7a90; letter-spacing: 0; }
.sheet-navlinks > a > svg { margin-left: auto; width: 24px; height: 24px; color: #168fc3; }
.sheet-quote { margin-top: 28px; width: 100%; min-height: 54px; justify-content: space-between; }
.sheet-footer { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; padding: 12px 24px max(16px, env(safe-area-inset-bottom)); border-top: 1px solid #cee3ee; }
.sheet-footer a { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-height: 44px; font-size: 14px; overflow-wrap: anywhere; }
.sheet-footer svg { width: 20px; height: 20px; }
.sheet-footer span { color: #526e7f; }
.mobile-sheet :is(a, button):focus-visible { outline: 3px solid #168fc3; outline-offset: 3px; }
</style>
