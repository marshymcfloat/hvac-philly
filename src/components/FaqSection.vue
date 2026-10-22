<script setup>
import { onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import SiteIcon from "./SiteIcon.vue";
import { faqs } from "../siteContent.js";
defineEmits(["quote"]);
const active = ref(null);
const animations = new Map();
function cancelAnswer(element) {
  animations.get(element)?.kill();
  animations.delete(element);
}
function animateAnswer(element, done, opening) {
  cancelAnswer(element);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const currentHeight = element.getBoundingClientRect().height;
  const targetHeight = opening ? element.firstElementChild.offsetHeight : 0;
  gsap.set(element, { height: currentHeight });
  const tween = gsap.to(element, {
    height: targetHeight,
    opacity: opening ? 1 : 0,
    duration: reduced ? 0 : 0.32,
    ease: "power2.inOut",
    overwrite: true,
    onComplete: () => {
      animations.delete(element);
      if (opening) element.style.height = "auto";
      done();
    },
  });
  if (tween.isActive()) animations.set(element, tween);
}
const expandAnswer = (element, done) => animateAnswer(element, done, true);
const collapseAnswer = (element, done) => animateAnswer(element, done, false);
onUnmounted(() => {
  animations.forEach((animation) => animation.kill());
  animations.clear();
});
const groups = [
  { title: "Services & availability", icon: "tool", items: faqs.slice(0, 6).map((faq, index) => ({ ...faq, index })) },
  { title: "Pricing, warranties & booking", icon: "shield", items: faqs.slice(6).map((faq, index) => ({ ...faq, index: index + 6 })) },
];
</script>

<template>
  <section id="faq" class="faq-section page-section" aria-labelledby="faq-title">
    <div class="faq-container">
      <header class="faq-heading">
        <span class="section-tag"><span aria-hidden="true"></span>Frequently Asked Questions</span>
        <h2 id="faq-title">Your HVAC questions.<br /><span>Local answers.</span></h2>
        <p><span class="faq-desktop-copy">Service areas, older boilers, equipment brands, pricing, and home warranty support from Philly HVAC Pros.</span><span class="faq-mobile-copy">Service, pricing, and booking with Philly HVAC Pros.</span></p>
      </header>

      <div class="faq-columns">
        <div v-for="group in groups" :key="group.title" class="faq-group">
          <div class="faq-group-heading"><SiteIcon :name="group.icon" /><p>{{ group.title }}</p></div>
          <article v-for="faq in group.items" :key="faq.index" class="faq-item" :class="{ 'is-open': active === faq.index }">
            <h3>
              <button :id="`faq-question-${faq.index}`" :aria-expanded="active === faq.index"
                :aria-controls="`faq-answer-${faq.index}`" @click="active = active === faq.index ? null : faq.index">
                <span class="faq-number" aria-hidden="true">{{ String(faq.index + 1).padStart(2, '0') }}</span>
                <span class="faq-question"><span class="faq-desktop-copy">{{ faq.question }}</span><span class="faq-mobile-copy">{{ faq.mobileQuestion }}</span></span>
                <span class="faq-toggle"><SiteIcon name="plus" /></span>
              </button>
            </h3>
            <Transition :css="false" @enter="expandAnswer" @leave="collapseAnswer"
              @enter-cancelled="cancelAnswer" @leave-cancelled="cancelAnswer">
              <div v-show="active === faq.index" :id="`faq-answer-${faq.index}`"
                class="faq-answer" role="region" :aria-hidden="active !== faq.index"
                :inert="active !== faq.index" :aria-labelledby="`faq-question-${faq.index}`">
                <div class="faq-answer-inner"><p>{{ faq.answer }}</p></div>
              </div>
            </Transition>
          </article>
        </div>
      </div>

      <div class="faq-help">
        <span class="faq-help-icon"><SiteIcon name="conversation" /></span>
        <div><h3>Need help with your system?</h3><p>Call 215-416-6557 for service or a free estimate.</p></div>
        <button class="button button-blue" @click="$emit('quote')">Prepare a Request<SiteIcon /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-mobile-copy { display: none; }
.faq-section.page-section {
  position: relative;
  padding-block: 96px;
  color: var(--brand-dark);
  background: #fff;
}
.faq-container { width: min(var(--content-max-width), calc(100% - 64px)); margin-inline: auto; }
.faq-heading { display: grid; grid-template-columns: 1.4fr 1fr; align-items: end; gap: 24px 64px; margin-bottom: 40px; }
.faq-heading > .section-tag { grid-column: 1 / -1; justify-self: start; }
.faq-heading h2 { color: var(--brand-dark); font-size: clamp(40px, 4.2vw, 56px); font-weight: 500; line-height: 1.08; letter-spacing: -2px; }
.faq-heading h2 > span { color: var(--brand-primary); }
.faq-heading > p { max-width: 360px; color: var(--brand-primary); font-size: 17px; line-height: 1.65; padding-bottom: 4px; }
.faq-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.faq-group { min-width: 0; padding: 12px 26px 10px; border: 1px solid var(--surface-muted); border-radius: var(--radius-panel); background: #fff; box-shadow: none; }
.faq-group-heading { display: flex; align-items: center; gap: 11px; padding-block: 13px 22px; color: var(--brand-primary); }
.faq-group-heading svg { width: 23px; height: 23px; }
.faq-group-heading p { font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.2px; }
.faq-item { border-top: 1px solid var(--surface-muted); }
.faq-item h3 { margin: 0; }
.faq-item button { display: flex; align-items: center; gap: 14px; width: 100%; min-height: 92px; padding: 21px 0; border-radius: var(--radius-control); background: transparent; color: var(--brand-dark); text-align: left; }
.faq-number { align-self: flex-start; margin-top: 4px; color: var(--brand-primary); font-size: 14px; font-weight: 500; letter-spacing: 1px; }
.faq-question { flex: 1; font-size: 18px; font-weight: 500; line-height: 1.4; letter-spacing: -.35px; }
.faq-toggle { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border-radius: var(--radius-control); color: var(--brand-primary); background: var(--surface-muted); }
.faq-toggle svg { width: 19px; height: 19px; transition: transform 220ms cubic-bezier(.22, 1, .36, 1); }
.faq-item button:hover .faq-question, .faq-item.is-open .faq-question { color: var(--brand-primary); }
.faq-item.is-open .faq-toggle { color: #fff; background: var(--brand-primary); }
.faq-item.is-open .faq-toggle svg { transform: rotate(45deg); }
.faq-answer { height: 0; opacity: 0; overflow: hidden; }
.faq-answer-inner { padding: 0 46px 25px 30px; }
.faq-answer p { color: var(--brand-primary); font-size: 15px; line-height: 1.75; }
.faq-help { display: flex; align-items: center; gap: 18px; padding: 25px 28px; margin-top: 28px; border-radius: var(--radius-panel); background: var(--surface-muted); border: 1px solid var(--surface-muted); }
.faq-help-icon { display: grid; place-items: center; width: 50px; height: 50px; flex-shrink: 0; color: var(--brand-primary); border: 1px solid var(--surface-muted); border-radius: var(--radius-control); background: #fff; }
.faq-help-icon svg { width: 26px; height: 26px; }
.faq-help h3 { color: var(--brand-dark); font-size: 21px; font-weight: 500; letter-spacing: -.4px; margin-bottom: 6px; }
.faq-help p { color: var(--brand-primary); font-size: 14px; line-height: 1.5; }
.faq-help > button { margin-left: auto; flex-shrink: 0; }
@media (max-width: 1000px) {
  .faq-heading { gap: 24px 36px; }
  .faq-group { padding-inline: 20px; }
  .faq-question { font-size: 17px; }
  .faq-item button { gap: 10px; }
  .faq-answer-inner { padding-left: 26px; padding-right: 10px; }
}
@media (max-width: 767px) {
  .faq-section.page-section { padding-block: 56px; }
  .faq-container { width: calc(100% - 40px); }
  .faq-desktop-copy { display: none; }
  .faq-mobile-copy { display: inline; }
  .faq-heading { grid-template-columns: 1fr; gap: 20px; margin-bottom: 34px; text-align: center; }
  .faq-heading > .section-tag { justify-self: center; white-space: normal; font-size: 14px; }
  .faq-heading > .section-tag > span { flex-shrink: 0; }
  .faq-heading h2 { font-size: clamp(34px, 8vw, 46px); letter-spacing: -1.3px; line-height: 1.1; }
  .faq-heading > p { max-width: 300px; margin-inline: auto; font-size: 16px; line-height: 1.5; padding: 0; }
  .faq-columns { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .faq-group { padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
  .faq-group-heading { gap: 10px; padding: 0 4px 14px; }
  .faq-group-heading svg { width: 24px; height: 24px; flex-shrink: 0; }
  .faq-group-heading p { font-size: 14px; letter-spacing: 0; text-transform: none; }
  .faq-item { border: 1px solid var(--surface-muted); border-radius: var(--radius-control); background: #fff; margin-bottom: 10px; }
  .faq-item:last-child { margin-bottom: 0; }
  .faq-item.is-open { border-color: var(--surface-muted); background: var(--surface-muted); }
  .faq-item button { min-height: 76px; padding: 17px 16px; gap: 12px; border-radius: var(--radius-control); }
  .faq-item button:focus-visible { outline: 3px solid var(--brand-primary); outline-offset: 3px; }
  .faq-number { display: none; }
  .faq-question { min-width: 0; font-size: 17px; line-height: 1.35; letter-spacing: -.2px; }
  .faq-toggle { width: 32px; height: 32px; border: 1px solid var(--surface-muted); background: var(--surface-muted); }
  .faq-answer-inner { padding: 0 18px 20px; }
  .faq-answer p { font-size: 15px; line-height: 1.65; }
  .faq-help { display: grid; grid-template-columns: 1fr; justify-items: center; text-align: center; padding: 26px 22px; gap: 16px; margin-top: 32px; background: var(--surface-muted); border: 1px solid var(--surface-muted); border-radius: var(--radius-panel); }
  .faq-help-icon { display: grid; width: 46px; height: 46px; border-radius: var(--radius-control); }
  .faq-help > div { min-width: 0; }
  .faq-help h3 { font-size: 23px; margin-bottom: 8px; }
  .faq-help p { font-size: 14px; max-width: 300px; }
  .faq-help > button { width: 100%; min-height: 50px; margin: 2px 0 0; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .faq-toggle svg { transition: none; }
}
</style>
