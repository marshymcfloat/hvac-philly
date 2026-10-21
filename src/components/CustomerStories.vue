<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import SiteIcon from "./SiteIcon.vue";
import { customerStories } from "../siteContent.js";

const dialog = ref(null);
const launcher = ref(null);
const isOpen = ref(false);
let previousFocus;
let context;
let motionQuery;
let transition;
let phase = "closed";
let disposed = false;

function contentElements() {
  return dialog.value.querySelectorAll(".reviews-header, .review-entry, .reviews-footer");
}
function settleOpen() {
  gsap.set(dialog.value, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" });
  gsap.set(contentElements(), { clearProps: "opacity,transform" });
  phase = "open";
}
function open() {
  if (isOpen.value) return;
  transition?.kill();
  previousFocus = document.activeElement;
  isOpen.value = true;
  phase = "opening";
  dialog.value.show();
  dialog.value.querySelector(".reviews-close").focus({ preventScroll: true });
  context.add(() => {
    gsap.killTweensOf(launcher.value);
    if (motionQuery.matches) {
      gsap.set(launcher.value, { autoAlpha: 0, scale: 1 });
      settleOpen();
      return;
    }
    gsap.set(dialog.value, { opacity: 0, scale: .94, y: 14, willChange: "transform,opacity" });
    gsap.set(contentElements(), { opacity: 0, y: 10 });
    transition = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => context.add(settleOpen) })
      .to(launcher.value, { autoAlpha: 0, scale: .96, duration: .14 }, 0)
      .to(dialog.value, { opacity: 1, scale: 1, y: 0, duration: .48 }, 0)
      .to(contentElements(), { opacity: 1, y: 0, stagger: .035, duration: .32 }, .09);
  });
}
function close() {
  if (!isOpen.value || phase === "closing") return;
  phase = "closing";
  transition?.kill();
  if (motionQuery.matches) {
    dialog.value.close();
    return;
  }
  context.add(() => {
    gsap.set(dialog.value, { willChange: "transform,opacity" });
    transition = gsap.timeline({ onComplete: () => dialog.value?.close() })
      .to(contentElements(), { opacity: 0, y: 4, duration: .14, ease: "power2.in" }, 0)
      .to(dialog.value, { opacity: 0, scale: .96, y: 10, duration: .24, ease: "power2.inOut" }, 0);
  });
}
async function onClose() {
  transition?.kill();
  isOpen.value = false;
  phase = "closed";
  await nextTick();
  if (disposed) return;
  context.add(() => {
    gsap.set(dialog.value, { clearProps: "opacity,transform,willChange" });
    gsap.set(contentElements(), { clearProps: "opacity,transform" });
    gsap.set(launcher.value, { visibility: "visible" });
    if (motionQuery.matches) gsap.set(launcher.value, { opacity: 1, scale: 1 });
    else gsap.fromTo(launcher.value, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .24, ease: "power3.out" });
  });
  previousFocus?.focus({ preventScroll: true });
}
function onKeydown(event) {
  if (event.key !== "Escape" || event.defaultPrevented || !isOpen.value || document.querySelector(":modal")) return;
  event.preventDefault();
  close();
}
function onMotionChange() {
  if (!motionQuery.matches) return;
  transition?.kill();
  context.add(() => {
    gsap.killTweensOf(launcher.value);
    if (phase === "closing") dialog.value.close();
    else if (isOpen.value) {
      gsap.set(launcher.value, { autoAlpha: 0 });
      settleOpen();
    } else gsap.set(launcher.value, { autoAlpha: 1, scale: 1 });
  });
}
onMounted(() => {
  context = gsap.context(() => {}, dialog.value);
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", onMotionChange);
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  disposed = true;
  document.removeEventListener("keydown", onKeydown);
  motionQuery?.removeEventListener("change", onMotionChange);
  context?.revert();
});
defineExpose({ open });
</script>

<template>
  <button ref="launcher" :disabled="isOpen" :aria-hidden="isOpen" class="reviews-launcher" type="button" aria-haspopup="dialog" aria-controls="customer-review-panel" :aria-expanded="isOpen" @click="open">
    <img src="/images/google-g.svg" width="25" height="25" alt="Google" />
    <span>Customer stories</span>
    <span class="reviews-count">{{ customerStories.length }}</span>
  </button>
  <Teleport to="body">
    <dialog id="customer-review-panel" ref="dialog" class="reviews-panel" data-lenis-prevent aria-modal="false" aria-labelledby="reviews-title" aria-describedby="reviews-source" @close="onClose" @cancel.prevent="close">
      <div class="reviews-panel-layout">
        <header class="reviews-header">
          <img src="/images/google-g.svg" width="30" height="30" alt="Google" />
          <div><h2 id="reviews-title">Customer stories</h2><p id="reviews-source">Website testimonial summaries</p></div>
          <button type="button" class="reviews-close" aria-label="Close customer stories" @click="close"><SiteIcon name="close" /></button>
        </header>
        <div class="reviews-list" tabindex="0" aria-label="Customer testimonials">
          <article v-for="story in customerStories" :key="story.name" class="review-entry">
            <span class="review-avatar" aria-hidden="true"><SiteIcon name="user" /></span>
            <div class="review-content">
              <div class="review-author"><h3>{{ story.name }}</h3><span>{{ story.location }}, PA</span></div>
              <div class="review-stars" aria-label="5 out of 5 stars"><SiteIcon v-for="star in 5" :key="star" name="star" /></div>
              <p>{{ story.summary }}</p>
            </div>
          </article>
        </div>
        <footer class="reviews-footer">
          <a href="https://phillyhvacpros.com/hvac-services-center-city-philadelphia-pa/" target="_blank" rel="noopener noreferrer">Read original testimonials<SiteIcon name="arrow" /></a>
        </footer>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.reviews-launcher { position: fixed; z-index: 50; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); display: inline-flex; align-items: center; gap: 10px; min-height: 54px; max-width: calc(100vw - 32px); padding: 10px 16px; border: 1px solid #dce5eb; border-radius: 100px; background: #fff; color: #183343; box-shadow: 0 4px 24px #102d3a26; cursor: pointer; font-size: 14px; font-weight: 600; transition: box-shadow 180ms; }
.reviews-launcher:hover { box-shadow: 0 6px 28px #102d3a38; }
.reviews-count { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #edf7fc; color: #126b96; font-size: 14px; font-weight: 500; }
.reviews-panel { transform-origin: bottom right; position: fixed; z-index: 2147483647; inset: auto max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) auto; width: min(400px, calc(100vw - 32px)); max-width: none; max-height: calc(100dvh - 144px - env(safe-area-inset-bottom)); margin: 0; padding: 0; border: 1px solid #e1e8ed; border-radius: 20px; background: #fff; color: #183343; box-shadow: 0 16px 60px #102d3a33; overflow: hidden; font-size: 14px; font-weight: 500; }
.reviews-panel-layout { display: flex; flex-direction: column; max-height: calc(100dvh - 146px - env(safe-area-inset-bottom)); }
.reviews-header { display: flex; align-items: center; gap: 12px; flex-shrink: 0; padding: 20px 20px 16px; }
.reviews-header > img { flex-shrink: 0; }
.reviews-header h2 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -.3px; line-height: 1.3; }
.reviews-header p { margin-top: 4px; color: #596f7d; font-size: 14px; font-weight: 500; line-height: 1.4; }
.reviews-close { display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; margin-left: auto; padding: 0; border: 0; border-radius: 50%; color: #405968; background: #f1f5f7; cursor: pointer; }
.reviews-close:hover { background: #e3eef4; }
.reviews-close svg { width: 19px; height: 19px; }
.reviews-list { min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 0 20px; scrollbar-width: thin; }
.review-entry { display: flex; gap: 12px; padding: 18px 0; border-top: 1px solid #e7eef2; }
.review-avatar { display: grid; place-items: center; flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; color: #fff; background: #187dae; font-size: 16px; font-weight: 600; }
.review-avatar svg { width: 22px; height: 22px; }
.review-content { min-width: 0; }
.review-author h3 { margin: 0; color: #183343; font-size: 15px; font-weight: 600; line-height: 1.4; }
.review-author > span { color: #596f7d; font-size: 14px; font-weight: 500; line-height: 1.5; }
.review-stars { display: flex; gap: 2px; margin: 7px 0; color: #c77b10; }
.review-stars svg { width: 15px; height: 15px; fill: currentColor; stroke-width: 1; }
.review-content > p { margin: 0; color: #526b7c; font-size: 14px; font-weight: 500; line-height: 1.65; }
.reviews-footer { display: block; flex-shrink: 0; padding: 16px 20px 20px; }
.reviews-footer a { width: 100%; display: flex; justify-content: center; align-items: center; gap: 14px; min-height: 48px; padding: 10px 14px; border-radius: 8px; background: #167ead; color: #fff; font-size: 14px; font-weight: 600; line-height: 1.5; text-decoration: none; }
.reviews-footer a:hover { background: #126b96; }
.reviews-footer svg { width: 18px; height: 18px; transform: rotate(-45deg); flex-shrink: 0; }
.reviews-launcher:focus-visible, .reviews-close:focus-visible, .reviews-footer a:focus-visible, .reviews-list:focus-visible { outline: 3px solid #178ac0; outline-offset: 3px; }
.reviews-list:focus-visible { outline-offset: -3px; }
@media (min-width: 768px) { .reviews-launcher { right: 24px; bottom: 24px; } .reviews-panel { right: 24px; bottom: 24px; } }
@media (prefers-reduced-motion: reduce) { .reviews-launcher { transition: none; } }
</style>
